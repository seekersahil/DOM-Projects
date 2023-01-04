const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

// Song titles
const songs = ["hey", "summer", "ukulele"];

// Keep track of songs

let songIndex = 2;

//initially load song details into DOM
loadSong(songs[songIndex]);

//update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fa").classList.remove("fa-play");
  playBtn.querySelector("i.fa").classList.add("fa-pause");

  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fa").classList.remove("fa-pause");
  playBtn.querySelector("i.fa").classList.add("fa-play");

  audio.pause();
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex >= songs.length) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  progress.style.width = `${(currentTime / duration) * 100}%`;
}

//set the progress bar
function setProgress(e) {
  const totalWidth = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / totalWidth) * duration;
}

//Eventlistener
playBtn.addEventListener("click", (e) => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});
//change song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

//time song update
audio.addEventListener("timeupdate", updateProgress);

//click on progress bar
progressContainer.addEventListener("click", setProgress);

//song ends
audio.addEventListener("ended", nextSong);
