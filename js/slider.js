import { getTimeOfDay } from './greetings.js';
import { state } from './settings.js';

function getRandomNum() {
  let min = Math.ceil(1);
  let max = Math.floor(20);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
let randomNum = getRandomNum();

function setURLBg() {
  if (state.photoSource == 'github') {
    setBg();
  } else if (state.photoSource == 'unsplash') {
    getLinkToImageUnsplash();
  } else if (state.photoSource == 'flicker') {
    getLinkToImageFlicker();
  }
}

function setBg() {
  inputTheme.classList.remove('active');
  inputTheme.value = '';
  let timeOfDay = getTimeOfDay();
  let bgNum = randomNum.toString().padStart(2, 0);

  const img = new Image();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  img.onload = () => {
    document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`;
  };
}

const inputTheme = document.querySelector('.photoSource-theme');
inputTheme.addEventListener('change', () => {
  getLinkToImageUnsplash();
});
async function getLinkToImageUnsplash() {
  inputTheme.classList.add('active');
  const img = new Image();
  let url;
  if (inputTheme.value) {
    url = `https://api.unsplash.com/photos/random?query=${inputTheme.value}&client_id=ZYU0n5wRCOo82mfkt-OVIYNkKgBsrZa8rJFeGwRbIo0`;
  } else {
    url =
      'https://api.unsplash.com/photos/random?query=morning&client_id=ZYU0n5wRCOo82mfkt-OVIYNkKgBsrZa8rJFeGwRbIo0';
  }
  const res = await fetch(url);
  const data = await res.json();

  img.src = data.urls.regular;
  img.onload = () => {
    document.body.style.backgroundColor = 'none';
    document.body.style.backgroundImage = `url(${data.urls.regular})`;
  };
}

async function getLinkToImageFlicker() {
  inputTheme.classList.add('active');

  const img = new Image();
  let url;
  if (inputTheme.value) {
    url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=59d3e6fb8b1f208db576b7d5ff0f120c&tags=${inputTheme.value}&extras=url_l&format=json&nojsoncallback=1`;
  } else {
    url =
      'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=59d3e6fb8b1f208db576b7d5ff0f120c&tags=nature&extras=url_l&format=json&nojsoncallback=1';
  }
  const res = await fetch(url);
  const data = await res.json();

  img.src = data.photos.photo[0].url_l;
  img.onload = () => {
    document.body.style.backgroundImage = `url(${data.photos.photo[0].url_l})`;
  };
}

const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');

function getSlideNext() {
  if (randomNum == 20) {
    randomNum = 1;
  } else {
    randomNum++;
  }
  setBg();
}
function getSlidePrev() {
  if (randomNum == 1) {
    randomNum = 20;
  } else {
    randomNum--;
  }
  setBg();
}

export {
  randomNum,
  slideNext,
  slidePrev,
  getSlideNext,
  getSlidePrev,
  setBg,
  setURLBg,
  getLinkToImageUnsplash,
  getLinkToImageFlicker,
};
