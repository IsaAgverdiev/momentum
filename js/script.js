import {
  tranaslateTo,
  translateBtn,
  hiddenBlocks,
  getBlocksData,
  timeBlock,
  dateBlock,
  weatherBlock,
  playerBlock,
  quoteBlock,
  greetingBlock,
  showList,
  hiddenLocalBlocks,
  setLinkForBg,
  selectBg,
  showSettings,
  translateSettings,
} from './settings.js';

import {
  playAudio,
  playPrev,
  playNext,
  playBtn,
  playPrevBtn,
  playNextBtn,
  audio,
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
} from './audio.js';
import { getQuotes, changeQuote } from './quote.js';
import { getWeather, city } from './weather.js';
import { slideNext, slidePrev, getSlideNext, getSlidePrev, setBg, setURLBg } from './slider.js';
import { setLocalStorage, getLocalStorage, showGreetings } from './greetings.js';
import { showTime } from './clock-calendar.js';

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);
city.addEventListener('change', getWeather);
changeQuote.addEventListener('click', getQuotes);

playBtn.addEventListener('click', playAudio);
playPrevBtn.addEventListener('click', playPrev);
playNextBtn.addEventListener('click', playNext);
audio.addEventListener('ended', playNext);

audio.addEventListener('loadeddata', loadedPlayer);
timeline.addEventListener('click', timeplineWidth);
volumeSlider.addEventListener('click', volumeChange);
playBtnPlayer.addEventListener('click', playPlayerOnAdvanceAudio);
audioPlayer.querySelector('.volume-button').addEventListener('click', setIconVolume);
setInterval(setProgress, 500);
translateBtn.addEventListener('click', tranaslateTo);

showList.addEventListener('click', e => {
  let target = e.target;
  if (
    target.classList.contains('show-checkbox') &&
    target.parentElement.parentElement.dataset.block == 'time'
  ) {
    hiddenBlocks(timeBlock);
  } else if (
    target.classList.contains('show-checkbox') &&
    target.parentElement.parentElement.dataset.block == 'date'
  ) {
    hiddenBlocks(dateBlock);
  } else if (
    target.classList.contains('show-checkbox') &&
    target.parentElement.parentElement.dataset.block == 'greeting-container'
  ) {
    hiddenBlocks(greetingBlock);
  } else if (
    target.classList.contains('show-checkbox') &&
    target.parentElement.parentElement.dataset.block == 'weather'
  ) {
    hiddenBlocks(weatherBlock);
  } else if (
    target.classList.contains('show-checkbox') &&
    target.parentElement.parentElement.dataset.block == 'player'
  ) {
    hiddenBlocks(playerBlock);
  } else if (
    target.classList.contains('show-checkbox') &&
    target.parentElement.parentElement.dataset.block == 'qoute-container'
  ) {
    hiddenBlocks(quoteBlock);
  }
});

getWeather();
showTime();
setLinkForBg();
setURLBg();
getQuotes();
showGreetings();
getBlocksData();
showSettings();
translateSettings();
hiddenLocalBlocks();
