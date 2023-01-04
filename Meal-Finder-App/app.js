const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  random = document.getElementById("random"),
  mealsEl = document.getElementById("meals"),
  resultHeading = document.getElementById("result-heading"),
  singleMealEl = document.getElementById("single-meal");

//Functions

// Search Meal and fetch from API
function searchMeal(e) {
  e.preventDefault();

  //clear single meal
  singleMealEl.innerHTML = "";

  //get search value
  const term = search.value;

  // check for empty
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`).then(
      (response) =>
        response.json().then((data) => {
          //console.log(data);
          resultHeading.innerHTML = `<h2>Search results for <b>'${term}'</b> :</h2>`;

          if (data.meals === null) {
            resultHeading.innerHTML = `<p>There are 0 results for <b>'${term}'</b>. Please try again.</p>`;
          } else {
            mealsEl.innerHTML = data.meals
              .map(
                (meal) => `
                <div class="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                    <div class="meal-info" data-mealID="${meal.idMeal}">
                        <h3>${meal.strMeal}</h3>
                    </div>
                </div>
            `
              )
              .join("");
          }
        })
    );
    //clear search text
    search.value = "";
  } else {
    alert("Please Enter a search term");
  }
}

//fetch meal by ID
function getMealByID(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`).then(
    (response) =>
      response.json().then((data) => {
        const meal = data.meals[0];
        addMealToDOM(meal);
      })
  );
}

//fetch random meal
function getRandomMeal() {
  //clear meals and heading
  mealsEl.innerHTML = "";
  resultHeading.innerHTML = "";

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`).then((response) =>
    response.json().then((data) => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    })
  );
}

//Add Meal to DOM
function addMealToDOM(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  singleMealEl.innerHTML = `
    <div class="single-meal">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <div class="single-meal-info">
            ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
            ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
        </div>
        <div class="main">
            <p>${meal.strInstructions}</p>
            <h2>Ingredients</h2>
            <ul>
                ${ingredients.map((item) => `<li>${item}</li>`).join("")}
            </ul>
        </div>
    </div>
  `;
}

//Event Listeners
submit.addEventListener("submit", searchMeal);
mealsEl.addEventListener("click", (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else return false;
  });

  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealID");
    getMealByID(mealID);
  }
});
random.addEventListener("click", getRandomMeal);
