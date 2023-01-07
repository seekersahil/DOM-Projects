const main = document.querySelector("main");
const voiceSelect = document.getElementById("voices");
const textArea = document.getElementById("text");
const readBtn = document.getElementById("read");
const toggleBtn = document.getElementById("toggle");
const closeBtn = document.getElementById("close");

const data = [
  {
    image: "./img/drink.jpg",
    text: "I'm Thirsty",
  },
  {
    image: "./img/food.jpg",
    text: "I'm Hungry",
  },
  {
    image: "./img/tired.jpg",
    text: "I'm Tired",
  },
  {
    image: "./img/hurt.jpg",
    text: "I'm Hurt",
  },
  {
    image: "./img/happy.jpg",
    text: "I'm Happy",
  },
  {
    image: "./img/angry.jpg",
    text: "I'm Angry",
  },
  {
    image: "./img/sad.jpg",
    text: "I'm Sad",
  },
  {
    image: "./img/scared.jpg",
    text: "I'm Scared",
  },
  {
    image: "./img/outside.jpg",
    text: "I Want To Go Outside",
  },
  {
    image: "./img/home.jpg",
    text: "I Want To Go Home",
  },
  {
    image: "./img/school.jpg",
    text: "I Want To Go To School",
  },
  {
    image: "./img/grandma.jpg",
    text: "I Want To Go To Grandmas",
  },
];

data.forEach(createBox);

//create speech boxes
function createBox(item) {
  const box = document.createElement("div");

  const { image, text } = item;

  box.classList.add("box");
  box.innerHTML = `
    <img src='${image}' alt='${text}'>
    <p class='info'>${text}</p>
  `;
  box.addEventListener("click", () => {
    setTextMessage(text);
    speakText();
    box.classList.add("active");
    setTimeout(() => box.classList.remove("active"), 1000);
  });
  main.appendChild(box);
}

//init speech synthesis
const message = new SpeechSynthesisUtterance();

//set text
function setTextMessage(text) {
  message.text = text;
}

//speaking the text
function speakText() {
  speechSynthesis.speak(message);
}

//store voices
let voices = [];
function populateVoices() {
  console.log(speechSynthesis);
  voices = speechSynthesis.getVoices();
  console.log(voices);
  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;
    voiceSelect.appendChild(option);
  });
}

//Voices changed
speechSynthesis.addEventListener("voiceschanged", populateVoices);

//text box show and hide
toggleBtn.addEventListener("click", () => {
  document.getElementById("text-box").classList.toggle("show");
});

closeBtn.addEventListener("click", () => {
  document.getElementById("text-box").classList.remove("show");
});

//change voice
voiceSelect.addEventListener("change", (e) => {
  message.voice = voices.find((v) => v.name === e.target.value);
});

//Read text button
readBtn.addEventListener("click", () => {
  setTextMessage(textArea.value);
  speakText();
});

populateVoices();
