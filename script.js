// script.js

// Function to fetch weather data asynchronously
async function fetchWeatherData(city) {
    const apiKey = 'f3d317a7ae9430220250d6b950620133';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

// Function to make decisions based on weather data
function makeDecision(weatherData, activity) {
    const temp = weatherData.main.temp;
    const weatherDescription = weatherData.weather[0].description;

    switch(activity) {
        case 'games':
            return (temp > 20 && temp < 30 && !weatherDescription.includes('rain')) 
                   ? 'Great weather for outdoor games!'
                   : 'The weather is Not ideal for outdoor games!';
        case 'events':
            return (temp > 15 && temp < 35) 
                   ? 'Perfect weather for attending events!'
                   : 'Weather might not be favorable for events.';
        case 'tourist-spots':
            return (temp > 20 && temp < 30 && !weatherDescription.includes('rain')) 
                   ? 'Ideal for visiting tourist spots!'
                   : 'The weather is Not ideal for tourism!.';
        case 'picnic':
            return (temp > 20 && temp < 30 && !weatherDescription.includes('rain')) 
                   ? 'Perfect day for a picnic!'
                   : 'The weather is not ideal for picnic!';
        case 'photography':
            return (!weatherDescription.includes('rain')) 
                   ? 'Great weather for outdoor photography!'
                   : 'The weather is not good for photography!';
        case 'cycling':
            return (temp > 15 && temp < 25 && !weatherDescription.includes('rain')) 
                   ? 'Ideal weather for a cycling trip!'
                   : 'Conditions might not be perfect for cycling today.';
        case 'jogging':
            return (temp > 10 && temp < 25 && !weatherDescription.includes('rain')) 
                   ? 'Perfect weather for a jog!'
                   : 'The weather is not good for your jogging time!';
        default:
            return 'Please select a valid activity.';
    }
}

// Event listener for fetching weather data
document.getElementById('fetchWeatherBtn').addEventListener('click', async () => {
    const city = document.getElementById('city').value;
    const weatherInfoDiv = document.getElementById('weatherInfo');
    const activitySelectionDiv = document.getElementById('activitySelection');
    const recommendationDiv = document.getElementById('recommendation');

    // Clear previous data
    weatherInfoDiv.innerHTML = '';
    activitySelectionDiv.style.display = 'none';
    recommendationDiv.innerHTML = '';

    try {
        const weatherData = await fetchWeatherData(city);
        const weatherDescription = weatherData.weather[0].description;
        const temp = weatherData.main.temp;

        weatherInfoDiv.innerHTML = `<p>Weather in ${city}: ${weatherDescription}, ${temp}°C</p>`;
        activitySelectionDiv.style.display = 'block';
    } catch (error) {
        weatherInfoDiv.innerHTML = `<p class="alert alert-danger">Error: ${error.message}</p>`;
    }
});

// Event listener for getting recommendations
document.getElementById('getRecommendationBtn').addEventListener('click', () => {
    const weatherInfoDiv = document.getElementById('weatherInfo');
    const weatherDescription = weatherInfoDiv.textContent.split(': ')[1];
    const temp = parseFloat(weatherDescription.split(', ')[1]);

    const selectedActivity = document.querySelector('input[name="activity"]:checked').value;
    const weatherData = { main: { temp }, weather: [{ description: weatherDescription }] };

    const recommendation = makeDecision(weatherData, selectedActivity);
    document.getElementById('recommendation').innerHTML = `<p>${recommendation}</p>`;
});
