import { translation } from './translation.js';
import { setURLBg, getLinkToImageUnsplash, getLinkToImageFlicker } from './slider.js';
import { getQuotes } from './quote.js';
import { showGreetings } from './greetings.js';
import { showDate, showTime } from './clock-calendar.js';
import { getWeather } from './weather.js';

const state = {
  language: 'en',
  photoSource: 'github',
  blocks: [],
};

const translateBtn = document.querySelector('.switch-lang');
function tranaslateTo() {
  if (state.language == 'en') {
    state.language = 'ru';
    getQuotes();
    showGreetings();
    showDate();
    getWeather();
    translateSettings();
  } else if (state.language == 'ru') {
    state.language = 'en';
    getQuotes();
    showGreetings();
    showDate();
    getWeather();
    translateSettings();
  }
}
const showList = document.querySelector('.show-list');

const timeBlock = document.querySelector('.time');
const dateBlock = document.querySelector('.date');
const greetingBlock = document.querySelector('.greeting-container');
const quoteBlock = document.querySelector('.qoute-container');
const weatherBlock = document.querySelector('.weather');
const playerBlock = document.querySelector('.player');

function hiddenBlocks(blockName) {
  getBlocksData();
  let blocks = state.blocks;

  blocks.includes(blockName?.className)
    ? blockName.classList.add('hidden')
    : blockName.classList.remove('hidden');
}

function getBlocksData() {
  const showItem = document.querySelectorAll('.show-item');
  showItem.forEach(item => {
    let input = item.lastElementChild.firstElementChild;
    let blocks = state.blocks;
    if (!input.checked) {
      let index = blocks.indexOf(item.dataset.block);
      if (index > -1) blocks.splice(index, 1);
      blocks.push(item.dataset.block);
    } else {
      let index = blocks.indexOf(item.dataset.block);
      if (index > -1) blocks.splice(index, 1);
    }
  });
}

function hiddenLocalBlocks() {
  let blocks = JSON.parse(localStorage.getItem('blocks'));
  const showItem = document.querySelectorAll('.show-item');
  showItem.forEach(item => {
    let dataLi = item.dataset.block;
    let input = item.lastElementChild.firstElementChild;
    if (blocks.includes(dataLi)) {
      input.checked = false;
      hiddenBlocks(document.querySelector(`.${dataLi}`));
    }
  });
}

function setLinkForBg() {
  const photoSourceItem = document.querySelectorAll('.photoSource-item');
  photoSourceItem.forEach(item => {
    let radio = item.firstElementChild;
    radio.addEventListener('change', selectBg);
  });
}

const inputTheme = document.querySelector('.photoSource-theme');

function selectBg() {
  const photoSourceItem = document.querySelectorAll('.photoSource-item');
  photoSourceItem.forEach(item => {
    let radio = item.firstElementChild;

    if (radio.checked && radio.value == 'github') {
      state.photoSource = 'github';
      inputTheme.classList.remove('active');
    } else if (radio.checked && radio.value == 'unsplash') {
      state.photoSource = 'unsplash';
      inputTheme.classList.add('active');
      inputTheme.addEventListener('change', () => {
        getLinkToImageUnsplash();
      });
    } else if (radio.checked && radio.value == 'flicker') {
      state.photoSource = 'flicker';
      inputTheme.classList.add('active');
      inputTheme.addEventListener('change', () => {
        getLinkToImageFlicker();
      });
    }
    setURLBg();
  });
}

function showSettings() {
  const settingsBtn = document.querySelector('.settings-btn');
  const settings = document.querySelector('.settings');
  settingsBtn.addEventListener('click', () => {
    settings.classList.toggle('active');
  });
}

function translateSettings() {
  const settingBtn = document.querySelector('.settings-btn');
  const showTitle = document.querySelector('.show-list__title');
  const time = document.querySelector('#time');
  const date = document.querySelector('#date');
  const greeting = document.querySelector('#greeting');
  const weater = document.querySelector('#weater');
  const audio = document.querySelector('#audio');
  const quote = document.querySelector('#quote');
  const photoSource = document.querySelector('.photoSource-title');
  console.log(state.language);

  if (state.language == 'en') {
    settingBtn.textContent = translation.settings.settingsBtn.en;
    translateBtn.textContent = translation.settings.translateBtn.en;
    showTitle.textContent = translation.settings.showTitle.en;
    time.textContent = translation.settings.timeLi.en;
    date.textContent = translation.settings.dateLi.en;
    greeting.textContent = translation.settings.greetingLi.en;
    weater.textContent = translation.settings.weater.en;
    audio.textContent = translation.settings.audio.en;
    quote.textContent = translation.settings.quote.en;
    photoSource.textContent = translation.settings.photoSourceTitle.en;
  } else if (state.language == 'ru') {
    settingBtn.textContent = translation.settings.settingsBtn.ru;
    translateBtn.textContent = translation.settings.translateBtn.ru;
    showTitle.textContent = translation.settings.showTitle.ru;
    time.textContent = translation.settings.timeLi.ru;
    date.textContent = translation.settings.dateLi.ru;
    greeting.textContent = translation.settings.greetingLi.ru;
    weater.textContent = translation.settings.weater.ru;
    audio.textContent = translation.settings.audio.ru;
    quote.textContent = translation.settings.quote.ru;
    photoSource.textContent = translation.settings.photoSourceTitle.ru;
  }
}

export {
  state,
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
};
