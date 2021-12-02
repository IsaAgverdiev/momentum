import { playList } from './playList.js';

const playBtn = document.querySelector('.play');
const playPrevBtn = document.querySelector('.play-prev');
const playNextBtn = document.querySelector('.play-next');

const playListContainer = document.querySelector('.play-list');
let playNum = 0;
for (let i = 0; i < playList.length; i++) {
  const li = document.createElement('li');
  playListContainer.append(li);
  li.textContent = playList[i].title;
  li.classList.add('play-item');
  li.setAttribute('data-title', playList[i].title);
}

function getLi() {
  const playernName = document.querySelector('.player-name');
  const li = document.querySelectorAll('.play-item');
  for (let i = 0; i < li.length; i++) {
    if (li[i].dataset.title == playList[playNum].title) {
      li[i].classList.toggle('item-active');
      playernName.textContent = playList[playNum].title;
    } else {
      li[i].classList.remove('item-active');
    }
  }
}

let audio = new Audio();
let isPlay = false;

function playAudio() {
  getLi();

  if (!isPlay) {
    audio.src = playList[playNum].src;
    playBtnPlayer.classList.remove('playPlayer');
    playBtnPlayer.classList.add('pausePlayer');
    audio.currentTime = 0;
    audio.play();
    toggleBtn();
    isPlay = true;
  } else {
    isPlay = false;
    toggleBtn();
    playBtnPlayer.classList.remove('pausePlayer');
    playBtnPlayer.classList.add('playPlayer');
    audio.pause();
  }
}

function toggleBtn() {
  playBtn.classList.toggle('pause');
}

function playPrev() {
  if (playNum == 0) {
    playNum = 3;
  } else {
    playNum--;
  }
  getLi();
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  audio.play();
  playBtn.classList.add('pause');
  isPlay = true;
}
function playNext() {
  if (playNum > playList.length - 2) {
    playNum = 0;
  } else {
    playNum++;
  }
  getLi();
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  audio.play();
  playBtn.classList.add('pause');
  isPlay = true;
}

// -----------------------------------------------------------------------------

const audioPlayer = document.querySelector('.audio-player');
const timeline = audioPlayer.querySelector('.timeline');
const volumeSlider = audioPlayer.querySelector('.controls .volume-slider');
const playBtnPlayer = audioPlayer.querySelector('.controls .toggle-play');

function loadedPlayer() {
  audioPlayer.querySelector('.player-time .length').textContent = getTimeCodeFromNum(
    audio.duration
  );
  audio.volume = 0.75;
}

//click on timeline to skip around

function timeplineWidth(e) {
  const timelineWidth = window.getComputedStyle(timeline).width;
  const timeToSeek = (e.offsetX / parseInt(timelineWidth)) * audio.duration;
  audio.currentTime = timeToSeek;
}

//click volume slider to change volume
function volumeChange(e) {
  const sliderWidth = window.getComputedStyle(volumeSlider).width;
  const newVolume = e.offsetX / parseInt(sliderWidth);
  audio.volume = newVolume;
  audioPlayer.querySelector('.controls .volume-percentage').style.width = newVolume * 100 + '%';
}

//check audio percentage and update time accordingly
function setProgress(params) {
  const progressBar = audioPlayer.querySelector('.progress');
  progressBar.style.width = (audio.currentTime / audio.duration) * 100 + '%';
  audioPlayer.querySelector('.player-time .current').textContent = getTimeCodeFromNum(
    audio.currentTime
  );
}

//toggle between playing and pausing on button click

function playPlayerOnAdvanceAudio() {
  getLi();
  if (!isPlay) {
    audio.src = playList[playNum].src;
    playBtnPlayer.classList.remove('playPlayer');
    playBtnPlayer.classList.add('pausePlayer');
    audio.play();
    isPlay = true;
    toggleBtn();
  } else {
    isPlay = false;
    toggleBtn();
    playBtnPlayer.classList.remove('pausePlayer');
    playBtnPlayer.classList.add('playPlayer');
    audio.pause();
  }
}

function setIconVolume() {
  const volumeEl = audioPlayer.querySelector('.volume-container .volume');
  audio.muted = !audio.muted;
  if (audio.muted) {
    volumeEl.classList.remove('icono-volumeMedium');
    volumeEl.classList.add('icono-volumeMute');
  } else {
    volumeEl.classList.add('icono-volumeMedium');
    volumeEl.classList.remove('icono-volumeMute');
  }
}

//turn 128 seconds into 2:08
function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`;
}

// -----------------------------------------------------------------------------

export {
  playAudio,
  playPrev,
  playNext,
  playBtn,
  playPrevBtn,
  playNextBtn,
  audio,
  isPlay,
  toggleBtn,
  playNum,
  getLi,
  loadedPlayer,
  timeplineWidth,
  volumeChange,
  playPlayerOnAdvanceAudio,
  setIconVolume,
  setProgress,
  timeline,
  volumeSlider,
  playBtnPlayer,
  audioPlayer,
};
