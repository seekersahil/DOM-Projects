const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const countdown = document.getElementById("countdown");
const year = document.getElementById("year");

const currentYear = new Date().getFullYear();
const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);
year.innerText = currentYear + 1;

// update countdown time
function updateCountdown() {
  let currentTime = new Date();
  const diff = newYearTime - currentTime;
  //   seconds.innerText = diff / 1000;
  let daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));
  days.innerText = daysLeft < 10 ? "0" + daysLeft : daysLeft;
  let hoursLeft = Math.floor(diff / (1000 * 60 * 60)) % 24;
  hours.innerText = hoursLeft < 10 ? "0" + hoursLeft : hoursLeft;
  let minutesLeft = Math.floor(diff / (1000 * 60)) % 60;
  minutes.innerText = minutesLeft < 10 ? "0" + minutesLeft : minutesLeft;
  let secondsLeft = Math.floor(diff / 1000) % 60;
  seconds.innerText = secondsLeft < 10 ? "0" + secondsLeft : secondsLeft;
}

// show spinner
setTimeout(() => {
  document.getElementById("loading").remove();
  countdown.style.display = "flex";
}, 1000);

// run every second
setInterval(updateCountdown, 1000);
