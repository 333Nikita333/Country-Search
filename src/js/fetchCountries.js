const BASE_URL = 'https://restcountries.com/v3.1';

async function fetchCountry(countryName) {
  const response = await fetch(
    `${BASE_URL}/name/${countryName}?fields=name,capital,population,flags,languages`
  );
  if (!response.ok) {
    throw new Error(response.status);
  }
  const country = await response.json();
  return country;
}

export default { fetchCountry };
