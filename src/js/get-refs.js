export default function getRefs() {
  return {
    body: document.querySelector('body'),
    searchForm: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
  };
}