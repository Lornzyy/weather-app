let currentCityEl = document.querySelector("#current-city");
let currentTimeEl = document.querySelector("#current-time");
let locationInputEl = document.querySelector("#location-input");
let weatherForm = document.querySelector("#weather-form");
let currentTempEl = document.querySelector("#current-temperature");
let currentConditionEl = document.querySelector("#current-condition");

///Use API to call data to the weather application

function displayTemperature(res) {
  currentConditionEl.innerHTML = res.data.condition.description;
  currentCityEl.innerHTML = locationInputEl.value;
  let temp = Math.floor(res.data.temperature.current);
  currentTempEl.innerHTML = temp;

  let humidity = res.data.temperature.humidity;
  let humidityEl = document.querySelector("#current-humidity");
  humidityEl.innerHTML = `${humidity}`;

  let wind = res.data.wind.speed;
  let windEl = document.querySelector("#current-wind");
  windEl.innerHTML = `${wind}`;
}

//Include the city name in the weather application

function displayCity(event) {
  event.preventDefault();
  currentCityEl.innerHTML = locationInputEl.value;
  // console.log(locationInputEl.value);
  let apiKey = "o63c6afa36060dtb755bc2adb841329a";

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${locationInputEl.value}&key=${apiKey}`;

  // https://api.shecodes.io/weather/v1/current?query=${cityValue}&key=${apiKey}&units=metric`
  https: axios.get(apiUrl).then(displayTemperature);
}

weatherForm.addEventListener("submit", displayCity);

//Changing the date and time on the weather application

let date = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[date.getDay()];
let time = date.getHours();
let minutes = date.getMinutes();

if (minutes < 10) {
  minutes = `0${minutes}`;
} else {
  minutes;
}

currentTimeEl.innerHTML = `${day} ${time}:${minutes}`;
