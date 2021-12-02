import { state } from './settings.js';
import { translation } from './translation.js';
const city = document.querySelector('.city');

async function getWeather() {
  const weatherIcon = document.querySelector('.weather-icon');
  const temperature = document.querySelector('.temperature');
  const weatherDescription = document.querySelector('.weather-description');
  const windSpeed = document.querySelector('.wind');
  const humidity = document.querySelector('.humidity');
  const weatherError = document.querySelector('.weather-error');

  try {
    let url;

    state.language == 'en'
      ? (url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${translation.weather.lang.en}&appid=ed1c27d59ccdd244c626e18beb1e6672&units=metric`)
      : (url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${translation.weather.lang.ru}&appid=ed1c27d59ccdd244c626e18beb1e6672&units=metric`);
    const res = await fetch(url);
    const data = await res.json();
    weatherError.textContent = '';
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);

    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    if (state.language == 'en') {
      windSpeed.textContent = `${translation.weather.windSpeed.en}: ${data.wind.speed} ${translation.weather.windSpeedCal.en}`;
      humidity.textContent = `${translation.weather.humidity.en}: ${data.main.humidity}%`;
    } else if (state.language == 'ru') {
      windSpeed.textContent = `${translation.weather.windSpeed.ru}: ${data.wind.speed} ${translation.weather.windSpeedCal.ru}`;
      humidity.textContent = `${translation.weather.humidity.ru}: ${data.main.humidity}%`;
    }
  } catch (err) {
    temperature.textContent = '';
    weatherDescription.textContent = '';
    windSpeed.textContent = '';
    humidity.textContent = '';
    state.language == 'en'
      ? (weatherError.textContent = translation.weather.error.en)
      : (weatherError.textContent = translation.weather.error.ru);
  }
}

export { getWeather, city };
