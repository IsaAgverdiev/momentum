import { state } from './settings.js';

const changeQuote = document.querySelector('.change-quote');
function getRandomQuote() {
  let min = Math.ceil(0);
  let max = Math.floor(8);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getQuotes() {
  const quote = document.querySelector('.quote');
  const author = document.querySelector('.author');
  let RandomQuote = getRandomQuote();
  const quotes = 'data.json';
  fetch(quotes)
    .then(res => res.json())
    .then(data => {
      if (state.language == 'en') {
        quote.textContent = `${data[0][RandomQuote].quote}`;
        author.textContent = `${data[0][RandomQuote].author}`;
      } else if (state.language == 'ru') {
        quote.textContent = `${data[1][RandomQuote].quote}`;
        author.textContent = `${data[1][RandomQuote].author}`;
      }
    });
}

export { getQuotes, changeQuote };
