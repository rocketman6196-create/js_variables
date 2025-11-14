function showWeatherDetails(event) {
    event.preventDefault();

    const city = document.getElementById('city').value.trim();
    if (!city) {
        alert('Please enter a city name.');
        return;
    }

    // Show loading state
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = '<p>Loading weather data...</p>';

    const apiKey = '84cf12c71032191d97921bddfe6d1f01';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Check if API returned an error
            if (data.cod && data.cod !== 200) {
                throw new Error(data.message || 'City not found');
            }
            
            weatherInfo.innerHTML = `
                <h2>Weather in ${data.name}, ${data.sys.country}</h2>
                <p><strong>Temperature:</strong> ${Math.round(data.main.temp)} °C</p>
                <p><strong>Feels like:</strong> ${Math.round(data.main.feels_like)} °C</p>
                <p><strong>Weather:</strong> ${data.weather[0].description}</p>
                <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
                <p><strong>Pressure:</strong> ${data.main.pressure} hPa</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            let errorMessage = 'Failed to fetch weather data. ';
            
            if (error.message.includes('404') || error.message.includes('city not found')) {
                errorMessage += 'City not found. Please check the spelling.';
            } else if (error.message.includes('401')) {
                errorMessage += 'Invalid API key.';
            } else if (error.message.includes('Network Error') || error.message.includes('Failed to fetch')) {
                errorMessage += 'Network error. Please check your internet connection.';
            } else {
                errorMessage += error.message;
            }
            
            weatherInfo.innerHTML = `<p class="error">${errorMessage}</p>`;
        });
}

// Add event listener only if the form exists
document.addEventListener('DOMContentLoaded', function() {
    const weatherForm = document.getElementById('weatherForm');
    if (weatherForm) {
        weatherForm.addEventListener('submit', showWeatherDetails);
    }
});