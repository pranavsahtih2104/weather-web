document.querySelector('.submit').addEventListener('click', function() {
    const location = document.querySelector('#location').value.trim(); // Get user input
    if (!location) {
        alert('Please enter a city name!');
        return;
    }

    const apiKey = 'a470dfce3fa56b72c1a1dd94d7c20529'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found!');
            }
            return response.json();
        })
        .then(data => {
            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            const weatherCondition = data.weather[0].description;
            const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

            let weatherInfoDiv = document.querySelector('.weather-info');
            if (!weatherInfoDiv) {
                weatherInfoDiv = document.createElement('div');
                weatherInfoDiv.className = 'weather-info';
                document.body.appendChild(weatherInfoDiv);
            }
            
            weatherInfoDiv.innerHTML = `
                <h3>Weather in ${data.name}, ${data.sys.country}</h3>
                <p>Temperature: ${temperature}°C</p>
                <p>Humidity: ${humidity}%</p>
                <p>Condition: ${weatherCondition}</p>
                <img src="${weatherIcon}" alt="Weather Icon">
            `;
        })
        .catch(error => {
            alert(error.message);
        });
});
