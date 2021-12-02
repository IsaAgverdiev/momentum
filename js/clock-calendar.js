import { state } from './settings.js';
import { showGreetings } from './greetings.js';
import { translation } from './translation.js';

function showTime() {
  const date = new Date();
  const setTime = document.querySelector('.time');
  let hours = date.getHours().toString().padStart(2, 0);
  let minutes = date.getMinutes().toString().padStart(2, 0);
  let seconds = date.getSeconds().toString().padStart(2, 0);

  setTime.textContent = `${hours}:${minutes}:${seconds}`;
  showDate();
  showGreetings();
  setTimeout(showTime, 1000);
}

function showDate() {
  const date = new Date();
  const setDate = document.querySelector('.date');
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  };
  let currentDate;
  state.language == 'en'
    ? (currentDate = date.toLocaleDateString(translation.calendar.en, options))
    : (currentDate = date.toLocaleDateString(translation.calendar.ru, options));
  setDate.textContent = currentDate;
}

export { showTime, showDate };
