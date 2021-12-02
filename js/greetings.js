import { selectBg, translateSettings } from './settings.js';
import { city } from './weather.js';
import { showDate } from './clock-calendar.js';
import { getWeather } from './weather.js';
import { getQuotes } from './quote.js';
import { translation } from './translation.js';
import { state, hiddenLocalBlocks } from './settings.js';

const greetingContainer = document.querySelector('.greeting-container');
const greeting = greetingContainer.children[0];
const userName = greetingContainer.children[1];

function showGreetings() {
  getTimeOfDay();
  state.language == 'en'
    ? (userName.placeholder = translation.inputPlaceholder.en)
    : (userName.placeholder = translation.inputPlaceholder.ru);
  state.language == 'en'
    ? (greeting.textContent = translation.greetingTranslation.en)
    : (greeting.textContent = translation.greetingTranslation.ru);
}

function getTimeOfDay() {
  const date = new Date();
  let hours = date.getHours();
  let timeOfDay;
  if (0 <= hours && hours < 6) {
    translation.greetingTranslation.ru = 'Доброй ночи';
    translation.greetingTranslation.en = 'Good night';
    timeOfDay = 'night';
  }
  if (6 <= hours && hours < 12) {
    translation.greetingTranslation.ru = 'Доброe утро';
    translation.greetingTranslation.en = 'Good morning';
    timeOfDay = 'morning';
  }
  if (12 <= hours && hours < 18) {
    translation.greetingTranslation.ru = 'Добрый день';
    translation.greetingTranslation.en = 'Good afternoon';
    timeOfDay = 'afternoon';
  }
  if (18 <= hours && hours < 24) {
    translation.greetingTranslation.ru = 'Добрый вечер';
    translation.greetingTranslation.en = 'Good evening';
    timeOfDay = 'evening';
  }

  return timeOfDay;
}

function setLocalStorage() {
  localStorage.setItem('name', userName.value);
  localStorage.setItem('city', city.value);
  localStorage.setItem('blocks', JSON.stringify(state.blocks));
  localStorage.setItem('lang', state.language);
  localStorage.setItem('photo', state.photoSource);
}

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    userName.value = localStorage.getItem('name');
  }
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  }
  if (localStorage.getItem('blocks')) {
    state.blocks = JSON.parse(localStorage.getItem('blocks'));
    hiddenLocalBlocks();
  }
  if (localStorage.getItem('lang')) {
    state.language = localStorage.getItem('lang');
    getWeather();
    getQuotes();
    showGreetings();
    showDate();
    translateSettings();
  }
  if (localStorage.getItem('photo')) {
    state.photoSource = localStorage.getItem('photo');
    const photoSourceItem = document.querySelectorAll('.photoSource-item');
    photoSourceItem.forEach(item => {
      let radio = item.firstElementChild;
      if (radio.value == state.photoSource) {
        radio.checked = true;
      } else {
        radio.checked = false;
      }
    });
  }
  selectBg();
}

export {
  userName,
  greeting,
  greetingContainer,
  showGreetings,
  setLocalStorage,
  getLocalStorage,
  getTimeOfDay,
};
