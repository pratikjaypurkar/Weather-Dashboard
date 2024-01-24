const apiKey = '01afd81386b09c809608b1ae13f9531e'; // Replace with your actual API key
const weatherInfoElement = document.getElementById('weatherInfo');
const bodyElement = document.body;

async function getWeather() {
    const locationInput = document.getElementById('locationInput').value;

    if (!locationInput) {
        alert('Please enter a location');
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        console.log('API Response:', data);

        if (response.ok) {
            displayWeather(data);
            updateBackground(data);
        } else {
            console.error('Error from API:', data);
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('An error occurred while fetching weather data.');
    }
}

function displayWeather(data) {
    const { name, main, weather } = data;

    const weatherInfoHTML = `
        <h2>${name}</h2>
        <p>Temperature: ${main.temp}°C</p>
        <p>Weather: ${weather[0].description}</p>
    `;

    weatherInfoElement.innerHTML = weatherInfoHTML;
}

function updateBackground(data) {
    // You can customize this based on the actual API response
    const isSunset = data.sys && data.sys.sunset && data.sys.sunset < Math.floor(Date.now() / 1000);

    if (isSunset) {
        bodyElement.style.backgroundImage = 'url("assets/img/sunset.jpg")';  
    } else {
        bodyElement.style.backgroundImage = 'url("assets/img/default-weather.jpg")';  
    }
}
