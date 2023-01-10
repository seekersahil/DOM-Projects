const draggableList = document.getElementById("draggable-list");
const check = document.getElementById("check");

const itemsList = [
  "Russia",
  "Canada",
  "United States of America",
  "China",
  "Brazil",
  "Australia",
  "India",
  "Argentina",
  "Kazakhstan",
  "Algeria",
];

//store list Items
const listItems = [];

let dragStartIndex;

//insert list items into DOM
function createList() {
  [...itemsList]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => b.sort - a.sort)
    .map((a) => a.value)
    .forEach((item, index) => {
      const listItem = document.createElement("li");
      listItem.setAttribute("data-index", index);

      listItem.innerHTML = `
		<span class="number">${index + 1}</span>
		<div class="draggable" draggable="true">
			<p class="name">${item}</p> 
			<i class="fa fa-grip-lines"></i>
		</div>
	`;
      listItems.push(listItem);

      draggableList.appendChild(listItem);
    });

  addEventListeners();
}

// swapping items on drop
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");
  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

// //checking list order
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const name = listItem.querySelector(".draggable").innerText.trim();
    if (name !== itemsList[index]) {
      listItem.classList.add("wrong");
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });
}

//draggable api functions
function dragStart() {
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}
function dragEnter() {
  this.classList.add("over");
}
function dragOver(e) {
  e.preventDefault();
}
function dragDrop() {
  const dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragEndIndex, dragStartIndex);
  this.classList.remove("over");
}
function dragLeave() {
  this.classList.remove("over");
}

// draggable event listeners
function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

//calling main function
createList();

//Event listeners
check.addEventListener("click", checkOrder);
