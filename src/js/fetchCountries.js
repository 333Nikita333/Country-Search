const BASE_URL = 'https://restcountries.com/v3.1/';

function fetchCountry(countryName) {
  return fetch(`${BASE_URL}/name/${countryName}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export default { fetchCountry };
