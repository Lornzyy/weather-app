let currentCityEl = document.querySelector("#current-city");
let currentCountryEl = document.querySelector("#current-country");
let currentTimeEl = document.querySelector("#current-time");
let currentDateEl = document.querySelector("#current-date");
let locationInputEl = document.querySelector("#location-input");
let weatherForm = document.querySelector("#weather-form");
let currentTempEl = document.querySelector("#current-temperature");
let currentConditionEl = document.querySelector("#current-condition");

///Use API to call data to the weather application

function displayTemperature(res) {
  
  // console.log(res.data.country);
  currentCountryEl.innerHTML = res.data.country;
  currentCityEl.innerHTML = `📍${res.data.city}`;
  let temp = Math.floor(res.data.temperature.current);
  currentTempEl.innerHTML = `🌧️ ${temp}°C`;

  currentConditionEl.innerHTML = res.data.condition.description;

  let humidity = res.data.temperature.humidity;
  let humidityEl = document.querySelector("#current-humidity");
  humidityEl.innerHTML = `${humidity} %`;

  let wind = res.data.wind.speed;
  let windEl = document.querySelector("#current-wind");
  windEl.innerHTML = `${wind} km/h`;
}

//Include the city name in the weather application

function searchCity(city) {
  let apiKey = "o63c6afa36060dtb755bc2adb841329a";

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  // https://api.shecodes.io/weather/v1/current?query=Nairobi&key=o63c6afa36060dtb755bc2adb841329a&units=metric`
  https: axios.get(apiUrl).then(displayTemperature);
}

function displayCity(event) {
  event.preventDefault();
  // console.log(locationInputEl.value);
  searchCity(locationInputEl.value);
}

weatherForm.addEventListener("submit", displayCity);

searchCity("Nairobi");

//Changing the date and time on the weather application

let date = new Date();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let hour = date.getHours();
let minutes = date.getMinutes();
let year = date.getFullYear();
let month = months[date.getMonth()];
let currentDate = date.getDate();

console.log(`${hour} ${minutes}`)

if (minutes < 10) {
  minutes = `0${minutes}`;
} else {
  minutes;
}

// var ampm = hour >= 12 ? "pm" : "am";

if (hour >= 12) {
  minutes += ` PM`;
} else {
  minutes += ` AM`;
}

currentTimeEl.innerHTML = `${hour}:${minutes}`;
currentDateEl.innerHTML = `${currentDate} ${month}, ${year}`;
