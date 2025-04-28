const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');
const cityNameElem = document.getElementById('cityName');
const descriptionElem = document.getElementById('description');
const temperatureElem = document.getElementById('temperature');
const humidityElem = document.getElementById('humidity');
const windElem = document.getElementById('wind');
const overlay = document.querySelector('.overlay');

const weatherBackgrounds = {
    Clear: "assets/weather-backgrounds/clear.jpg",
    Clouds: "assets/weather-backgrounds/clouds.jpg",
    Rain: "assets/weather-backgrounds/rain.jpg",
    Snow: "assets/weather-backgrounds/snow.jpg",
    Thunderstorm: "assets/weather-backgrounds/thunderstorm.jpg",
    Default: "assets/weather-backgrounds/clear.jpg"
};

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city !== "") {
        getWeather(city);
    }
});

async function getWeather(city) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        alert(error.message);
    }
}

function updateWeatherUI(data) {
    const weatherMain = data.weather[0].main;
    overlay.style.backgroundImage = `url('${weatherBackgrounds[weatherMain] || weatherBackgrounds.Default}')`;

    cityNameElem.textContent = data.name;
    descriptionElem.textContent = `Condition: ${data.weather[0].description}`;
    temperatureElem.textContent = `Temperature: ${data.main.temp} °C`;
    humidityElem.textContent = `Humidity: ${data.main.humidity}%`;
    windElem.textContent = `Wind Speed: ${data.wind.speed} m/s`;

    weatherInfo.classList.remove('hidden');
}
