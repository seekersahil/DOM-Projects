const container = document.getElementById("container");
const text = document.getElementById("text");

const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

function breathAnimation() {
  // Breathe In!!
  text.innerText = "Breathe In!";
  container.className = "container grow";

  setTimeout(() => {
    // Hold
    text.innerText = "Hold";

    setTimeout(() => {
      // Breathe Out
      text.innerText = "Breathe Out!";
      container.className = "container shrink";
    }, holdTime);
  }, breatheTime);
}

breathAnimation();

setInterval(breathAnimation, totalTime);
