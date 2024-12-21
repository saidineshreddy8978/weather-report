let h3 = document.getElementById("weatherReport");
let weatherIcon = document.getElementById("weatherIcon");
let value = document.getElementById("city");
let button = document.getElementById("btn");
let apiKey = '6a0123b8f59febcf8d9f44314b081bb6';

function getReport() {
  const city = value.value.trim();
  console.log(city);

  if (city === "") {
    h3.innerHTML = "Please enter a city name.";
    weatherIcon.style.display = 'none';
    return;
  }

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  console.log(url); // Debugging: Log the URL to ensure it's correct

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Network response was not ok: ${res.statusText}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      if (data.cod === 200) {
        h3.innerHTML = `The temperature in ${data.name} is ${data.main.temp}°C.`;
        if (data.weather[0].icon.includes('01')) {
          weatherIcon.src = 'sunny_icon_url';  // Replace with actual sunny icon URL
        } else {
          weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        }
        weatherIcon.style.display = 'block';
      } else {
        h3.innerHTML = `Error: ${data.message}`;
        weatherIcon.style.display = 'none';
      }
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      h3.innerHTML = "Failed to fetch weather data. Please try again.";
      weatherIcon.style.display = 'none';
    });
}

button.addEventListener("click", getReport);
