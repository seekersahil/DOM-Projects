const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const timestamp = document.getElementById('timestamp');
const progress = document.getElementById('progress');

//play and pause
function toggleVideoStatus(){
    if(video.paused){
        video.play();
    } else{
        video.pause();
    }
}

//change play icon
function updatePlayIcon() {
    if(video.paused){
        play.innerHTML = `<i class="fa fa-play fa-2x"></i>`;
    }
    else{
        play.innerHTML = `<i class="fa fa-pause fa-2x"></i>`;
    }
}

//stops the video
function stopVideo(){
    video.currentTime = 0;
    video.pause();
}

//setting video time to progress
function setVideoProgress(){
    video.currentTime = (+progress.value*video.duration)/100;
}

//update video progress and timestamp
function updateVideoProgress(){
    progress.value = (video.currentTime/video.duration)*100;

    let time = `${String(parseInt(video.currentTime/60)).padStart(2, '0')}:${String(parseInt(video.currentTime)%60).padStart(2, '0')}`;
    timestamp.innerText=time;
}

//event listeners
stop.addEventListener('click',stopVideo);
play.addEventListener('click',toggleVideoStatus);
video.addEventListener('click',toggleVideoStatus);

video.addEventListener('play',updatePlayIcon);
video.addEventListener('pause',updatePlayIcon);
video.addEventListener('timeupdate',updateVideoProgress);

progress.addEventListener('change',setVideoProgress);