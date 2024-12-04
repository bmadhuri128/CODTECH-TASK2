// script.js
const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your OpenWeatherMap API key
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const cityName = document.getElementById('city-name');
const description = document.getElementById('description');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const weatherIcon = document.getElementById('weather-icon');

searchBtn.addEventListener('click', fetchWeather);

async function fetchWeather() {
  const city = cityInput.value.trim();
  if (!city) {
    alert('Please enter a city name');
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('City not found');
    }
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    alert(error.message);
  }
}

function displayWeather(data) {
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  description.textContent = capitalizeFirstLetter(data.weather[0].description);
  temperature.textContent = `${data.main.temp}°C`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
  weatherIcon.alt = data.weather[0].description;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
