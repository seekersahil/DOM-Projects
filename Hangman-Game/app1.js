const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const figureParts = document.querySelectorAll(".figure-part");

function start() {
  notify("[■■■■■■■□□□] Loading", 1000000);
  fetch("https://random-word-api.herokuapp.com/word")
    .then((res) => res.json())
    .then((data) => {
      wrongLettersEl.innerHTML = "";
      wordEl.innerHTML = "";
      popup.style.display = "none";
      figureParts.forEach((part) => {
        part.style.display = "none";
      });
      playGame(data[0]);
    })
    .catch((err) => {
      notify("Failed to load, Please Refresh", 1000000);
    });
}

function playGame(selectedWord) {
  const correctLetters = [];
  const wrongLetters = [];
  function displayWord() {
    wordEl.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) => `
            <span class="letter">
                ${correctLetters.includes(letter) ? letter : ""}
            </span>
        `
      )
      .join("")}
    `;

    const innerWord = wordEl.innerText.replace(/\n/g, "");
    console.log(innerWord);
    if (innerWord === selectedWord) {
      finalMessage.innerText = "Congratulations! You WON!!! 🎉🎉🎉";
      popup.style.display = "flex";
    }
  }
  notify("You may start Playing now");
  //Update wrong letters

  function updateWrongLettersEl() {
    // display wrong letters
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
        ${wrongLetters.map((letter) => `<span class="letter">${letter}</span>`)}
    `;
    //display parts
    figureParts.forEach((part, index) => {
      const errors = wrongLetters.length;

      if (index < errors) {
        part.style.display = "block";
      } else {
        part.style.display = "none";
      }
    });

    //check if lost
    if (wrongLetters.length === figureParts.length) {
      finalMessage.innerHTML = `Unfortunately, You Lost.😞 The word was ${selectedWord}`;
      popup.style.display = "flex";
    }
  }

  //show Notification

  function showNotification() {
    notification.classList.add("show");
    setTimeout(() => {
      notification.classList.remove("show");
    }, 2000);
  }

  //KeyDown Letter Press

  window.addEventListener("keydown", (e) => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      const letter = e.key.toLowerCase();
      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          correctLetters.push(letter);
          displayWord();
        } else {
          notify("You have already entered this letter", 2000);
        }
      } else {
        if (!wrongLetters.includes(letter)) {
          wrongLetters.push(letter);
          updateWrongLettersEl();
        } else {
          notify("You have already entered this letter", 2000);
        }
      }
    }
  });

  //Restart Game and play again
  playAgainBtn.addEventListener("click", (e) => start());

  displayWord();
}

//start message
function notify(message, timeout = 1000) {
  notification.innerHTML = `<p>${message}</p>`;
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, timeout);
}

start();
