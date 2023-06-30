const BASE_URL = 'https://restcountries.com/v3.1';

export const getAllCountries = async () => {
  try {
    const response = await fetch(`${BASE_URL}/all`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetch  countries:', error);
    throw error;
  }
};
