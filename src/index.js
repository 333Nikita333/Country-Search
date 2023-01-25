import './css/styles.css';
const debounce = require('lodash.debounce');
import Notiflix from 'notiflix';
import API from './js/fetchCountries';
import getRefs from './js/get-refs';

const DEBOUNCE_DELAY = 300;
const refs = getRefs();
refs.searchForm.value = '';
setStylesSearchForm();
refs.searchForm.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  e.preventDefault();
  const searchQuerry = e.target.value.trim();

  if (searchQuerry === '') {
    markupCleanup();
    return;
  }
  
  API.fetchCountry(searchQuerry).then(renderCountryCards).catch(errorHandling);
}

function renderCountryCards(countryList) {
  if (countryList.length > 10) {
    infoHandlingIfManyMatches();
  }

  if (countryList.length > 1 && countryList.length <= 10) {
    markupCleanup(refs.countryInfo);
    createListOfCountries(countryList);
  }

  if (countryList.length === 1) {
    markupCleanup(refs.countryList);
    createCountryLabel(...countryList);
  }
}

function markupCleanup(ref) {
  if (ref === refs.countryList) {
    refs.countryList.innerHTML = '';
    return;
  }
  if (ref === refs.countryInfo) {
    refs.countryInfo.innerHTML = '';
    return;
  }

  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

function infoHandlingIfManyMatches() {
  markupCleanup();
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}

function errorHandling() {
  markupCleanup();
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function createListOfCountries(countryList) {
  const markupCountryItem = countryList
    .map(
      ({
        name,
        flags,
      }) => `<li style="display: inline-flex; align-items: center">
    <img src="${flags.svg}" alt="flag country" width="50" height="30"/>
    <h1 style="font-size: 18px; margin-left: 5px;">${name.official}</h1>
  </li>`
    )
    .join('');

  refs.countryList.innerHTML = markupCountryItem;
}

function createCountryLabel({ name, capital, population, flags, languages }) {
  const listOfCapitals = capital.join(', ');
  const listOfLanguages = Object.values(languages).join(', ');
  const markupCountryLabel = `<img src="${flags.svg}" alt="country flag" width="200" height="100">
  <h1 style="margin: 0 25px; display: ruby-text; font-size: 50px">${name.official}</h1>
  <p style="margin: 5px; font-size: 20px">Capital: ${listOfCapitals}</p>
  <p style="margin: 5px; font-size: 20px">Population: ${population}</p>
  <p style="margin: 5px; font-size: 20px">Languages: ${listOfLanguages}</p>`;

  refs.countryInfo.innerHTML = markupCountryLabel;
}

function setStylesSearchForm() {
  refs.body.style.backgroundColor = 'skyblue';
  refs.body.style.display = 'flex';
  refs.body.style.justifyContent = 'center';
  refs.body.style.alignItems = 'center';
  refs.body.style.flexDirection = 'column';

  refs.searchForm.style.fontSize = '25px';
  refs.searchForm.style.display = 'flex';
  refs.searchForm.style.alignItems = 'auto';
  refs.searchForm.style.marginTop = '100px';
  refs.searchForm.style.padding = '0 20px';
  refs.searchForm.style.width = '300px';
  refs.searchForm.style.height = '40px';
  refs.searchForm.style.borderRadius = '45px';
  refs.searchForm.style.boxShadow = '10px 10px 5px 0px rgba(0,0,0,0.75)';

  refs.countryList.style.listStyle = 'none';
  refs.countryList.style.display = 'flex';
  refs.countryList.style.flexDirection = 'column';
  refs.countryList.style.padding = '0';

  refs.countryInfo.style.padding = '10px';
}
