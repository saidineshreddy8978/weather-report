let h3 = document.getElementById("weatherReport");
let weatherIcon = document.getElementById("weatherIcon");
let value = document.getElementById("city");
let button = document.getElementById("btn");
let apiKey = '6a0123b8f59febcf8d9f44314b081bb6';

function getReport() {
    const city = value.value.trim();

    if (city === "") {
        showError("Please enter a city name.");
        return;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Network response was not ok: ${res.statusText}`);
            }
            return res.json();
        })
        .then((data) => {
            if (data.cod === 200) {
                let weatherCondition = data.weather[0].main;
                h3.innerHTML = `The temperature in ${data.name} is ${data.main.temp}°C.`;

                // Show weather icon based on the condition
                setWeatherIcon(weatherCondition);

                document.getElementById("weatherDetails").style.display = 'block';
                document.getElementById("errorMessage").style.display = 'none';

                // Additional information (like wind speed, humidity)
                let additionalInfo = `Wind Speed: ${data.wind.speed} m/s | Humidity: ${data.main.humidity}%`;
                document.getElementById("additionalInfo").innerHTML = additionalInfo;
            } else {
                showError(data.message);
            }
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
            showError("Failed to fetch weather data. Please try again.");
        });
}

function setWeatherIcon(condition) {
    // Mapping weather conditions to Font Awesome icons
    const iconMap = {
        "Clear": "fa-sun",
        "Clouds": "fa-cloud",
        "Rain": "fa-cloud-showers-heavy",
        "Drizzle": "fa-cloud-rain",
        "Thunderstorm": "fa-bolt",
        "Snow": "fa-snowflake",
        "Mist": "fa-smog",
    };

    if (iconMap[condition]) {
        weatherIcon.className = `fas ${iconMap[condition]}`;
    } else {
        weatherIcon.className = "fas fa-sun"; // Default icon
    }
}

function showError(message) {
    document.getElementById("weatherDetails").style.display = 'none';
    document.getElementById("errorMessage").innerHTML = message;
    document.getElementById("errorMessage").style.display = 'block';
}

button.addEventListener("click", getReport);
