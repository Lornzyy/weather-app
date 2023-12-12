let currentCityEl = document.querySelector("#current-city");
let currentCountryEl = document.querySelector("#current-country");
let currentTimeEl = document.querySelector("#current-time");
let currentDateEl = document.querySelector("#current-date");
let locationInputEl = document.querySelector("#location-input");
let weatherForm = document.querySelector("#weather-form");
let currentIcon = document.querySelector("#current-temperature-icon");
let currentTempEl = document.querySelector("#current-temperature");
let currentConditionEl = document.querySelector("#current-condition");

///Use API to call data to the weather application

function displayTemperature(res) {
  // console.log(res.data.country);
  let humidityEl = document.querySelector("#current-humidity");
  let windEl = document.querySelector("#current-wind");

  if (!res.data.city) {
    currentCountryEl.innerHTML = "";
    currentCityEl.innerHTML = "📍Not found";

    currentTempEl.innerHTML = ``;

    currentConditionEl.innerHTML = "";

    humidityEl.innerHTML = "";
    windEl.innerHTML = "";
  } else {
    currentCountryEl.innerHTML = res.data.country;
    currentCityEl.innerHTML = `📍${res.data.city}`;

    let icon = res.data.condition.icon_url;
    currentIcon.src = icon;

    let temp = Math.floor(res.data.temperature.current);
    currentTempEl.innerHTML = `${temp}°C`;

    currentConditionEl.innerHTML = res.data.condition.description;

    let humidity = res.data.temperature.humidity;
    humidityEl.innerHTML = `${humidity} %`;

    let wind = res.data.wind.speed;
    windEl.innerHTML = `${wind} km/h`;


  }
  let date = res.data.time * 1000
  currentTimeEl.innerHTML = formatDate(date);

  getForecast(res.data.city);
}

//Include the city name in the weather application

function searchCity(city) {
  let apiKey = "o63c6afa36060dtb755bc2adb841329a";

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  // https://api.shecodes.io/weather/v1/current?query=Nairobi&key=o63c6afa36060dtb755bc2adb841329a&units=metric`
  // https://shecodes-assets.s3.amazonaws.com/api/weather
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

function formatDate(){
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

  console.log(`${hour} ${minutes}`);

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
  let longFormatDate = `${currentDate} ${month}, ${year}`;
  let shortFormatDate = `${hour}:${minutes}`;

  currentDateEl.innerHTML = longFormatDate

  return shortFormatDate;
}


setInterval(function () {
  formatDate();
}, 60000);




function getForecast(city) {
  let forecastApiKey = "o63c6afa36060dtb755bc2adb841329a";
  let forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${forecastApiKey}&units=metric`;

  axios.get(forecastApiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];

  return day;

}

function displayForecast(res) {
  let response = res.data.daily;
  console.log(response);

  console.log(response.time * 1000);
  let forecastHtml = document.querySelector("#weather-forecast");

  let forecast = "";

  let forecastLocationEl = document.querySelector("#forecast-location");
  forecastLocationEl.innerHTML = `${res.data.city} Weekly Forecast`;

  response.forEach(function (day, index) {
    if (index < 5) {
      forecast += `
      <div class="daily-weather-forecast">
        <p class="forecast--day">${formatDay(day.time)}</p>
        <img class="forecast--icon" src="${day.condition.icon_url}"/>
        <p>
          <span class="max-temperature-forecast">${Math.floor(
            day.temperature.maximum
          )} /</span>
          <span class="min-temperature-forecast">${Math.floor(
            day.temperature.minimum
          )}</span>
        </p>
      </div>`;
    }
  });

  forecastHtml.innerHTML = forecast;
}
