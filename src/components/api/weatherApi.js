const API_KEY = '1028ab98069aec2a1dfccd1607595da3'; // Your OpenWeatherMap API key

/**
 * Fetch weather data based on latitude and longitude.
 * @param {number} latitude - The latitude of the location.
 * @param {number} longitude - The longitude of the location.
 * @returns {Promise<Object>} - A promise that resolves to an object containing weather data.
 */
export const fetchWeatherData = async (latitude, longitude) => {
  const controller = new AbortController(); // Create an AbortController to manage fetch requests

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`,
      { signal: controller.signal } // Pass the signal to the fetch request
    );

    if (!response.ok) {
      throw new Error('Failed to fetch weather data'); // Throw an error if the response is not ok
    }

    const data = await response.json(); // Parse the JSON response

    // Return an object containing the relevant weather data
    return {
      temperature: data.main.temp,
      city: data.name,
      weatherCondition: data.weather[0].main,
    };
  } catch (err) {
    throw new Error(err.message); // Throw an error if the fetch fails
  }
};
// Example structure

