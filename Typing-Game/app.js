const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// List of words for game
const words = [
  "sight",
  "tension",
  "plane",
  "balls",
  "pies",
  "juices",
  "warlike",
  "bad",
  "west",
  "dependency",
  "steering",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eighty",
  "feeble",
  "admitted",
  "drag",
  "loving",
  "amazement",
  "good",
  "imagine",
  "like",
  "plot",
  "fantastic",
  "unbelievable",
  "unnecessary",
  "unexpected",
  "ballistics",
  "concurrent",
  "absolute",
  "whatever",
  "wrong",
  "blue",
  "red",
  "double",
  "purse",
  "quest",
];

//initialisation
let randomWord;
let score = 0;
let time = 10;
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";
difficultySelect.value = difficulty;

//focus on text on start
text.focus();

//start counting down
const countDown = setInterval(updateTime, 1000);

//generate random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

//to add word to DOM
function addWordtoDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

//update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

//update time
function updateTime() {
  time--;
  timeEl.innerHTML = `${time}s`;

  if (time === 0) {
    clearInterval(countDown);
    gameOver();
  }
}

//game over and show end screen
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time Ran Out</h1>
    <p> Your Final Score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `;
  endgameEl.style.display = "flex";
}

addWordtoDOM();

//Event Listeners
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;
  if (insertedText == randomWord) {
    addWordtoDOM();
    updateScore();
    //clear value
    e.target.value = "";

    if (difficulty == "hard") {
      time += 2;
    } else if (difficulty == "medium") {
      time += 3;
    } else if (difficulty == "easy") {
      time += 5;
    }
    updateTime();
  }
});

settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
