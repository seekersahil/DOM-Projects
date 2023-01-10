const msgEl = document.getElementById("msg");
const randomNum = getRandomNumber();

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

//start recognition and game
recognition.start();

//Generate random number
function getRandomNumber() {
  return Math.floor(Math.random() * 100 + 1);
}
//write message on DOM
function writeMsg(msg) {
  msgEl.innerHTML = `
	<div>You said:</div>
	<span class="box">${msg}</span>
	`;
}

// Check if message against number
function checkNumber(msg) {
  let num = +msg;
  // check if valid Number
  if (Number.isNaN(num)) {
    msgEl.innerHTML += `<div>That is not a valid number</div>`;
    return;
  } else {
    //check in range
    if (num < 1 || num > 100) {
      msgEl.innerHTML += `<div>Number must be between 1 and 100.</div>`;
      return;
    }

    if (num === randomNum) {
      document.body.innerHTML = `
		<h2>Congrats! You have guessed the number.<br><br>
		It was ${num}.</h2>
		<button class="play-again" id="play-again">Play again</button>
		`;
    } else if (num > randomNum) {
      msgEl.innerHTML += `<div>GO LOWER</div>`;
    } else {
      msgEl.innerHTML += `<div>GO HIGHER</div>`;
    }
  }
}

//capture user speak
function onSpeak(e) {
  const msg = e.results[0][0].transcript;
  writeMsg(msg);
  checkNumber(msg);
}

//speak result
recognition.addEventListener("result", onSpeak);

//on end recognition
recognition.addEventListener("end", () => recognition.start());

// play again button
document.body.addEventListener("click", (e) => {
  if (e.target.id === "play-again") {
    window.location.reload();
  }
});
