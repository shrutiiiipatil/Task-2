const body = document.body;
const apiKey = '4e8f86bac7dccb91a47eddae667c2de7';

navigator.geolocation.getCurrentPosition(success, error);

function success(position) {
    const { latitude, longitude } = position.coords;
    getWeatherAndApplyTheme(latitude, longitude);
}

function error() {
    console.error('Unable to retrieve location.');
}

function getWeatherAndApplyTheme(latitude, longitude) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Check if it's day or night based on current time, sunrise, and sunset
            const currentTime = new Date().getTime() / 1000; // Convert to seconds
            const sunrise = data.sys.sunrise;
            const sunset = data.sys.sunset;

            const isDaytime = currentTime >= sunrise && currentTime <= sunset;

            // Apply theme
            body.classList.toggle('dark', !isDaytime);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}
