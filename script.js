const apiKey = 'a1abd5539bf2c1124a11bc9291faf0e7'; 
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const weatherIcon = document.getElementById('weather-icon');
const windSpeed = document.getElementById('wind-speed');
const humidity = document.getElementById('humidity');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        fetchWeather(city);
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value;
        if (city) {
            fetchWeather(city);
        }
    }
});

async function fetchWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`);
        
        if (!response.ok) {
            throw new Error('Ciudad no encontrada');
        }
        
        const data = await response.json();
        
        cityName.textContent = data.name;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        description.textContent = data.weather[0].description;
        windSpeed.textContent = `${data.wind.speed} km/h`;
        humidity.textContent = `${data.main.humidity}%`;
        
        const iconCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    } catch (error) {
        alert(error.message);
        resetWeatherInfo();
    }
}

function resetWeatherInfo() {
    cityName.textContent = 'Ciudad no encontrada';
    temperature.textContent = '-';
    description.textContent = 'Introduce el nombre de una ciudad';
    windSpeed.textContent = '- km/h';
    humidity.textContent = '-%';
    weatherIcon.src = '';
}