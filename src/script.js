function updateWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = response.data.temperature.current;
  let searchCity = document.querySelector("#city-name");
  let tempFeelingElement = document.querySelector("#feels-like-temp");
  let temperatureFeeling = response.data.temperature.feels_like;
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src ="${response.data.condition.icon_url}" class="today-temperature-icon" />`;
  searchCity.innerHTML = response.data.city;
  tempFeelingElement.innerHTML = Math.round(temperatureFeeling);
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `&nbsp${response.data.temperature.humidity}%`;
  windElement.innerHTML = `&nbsp${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
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

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${hours}:${minutes}`;
}

function searchTemperature(city) {
  let apiKey = "ca80fb7d3o48t3c14460b13a3d83ca48";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchTemperature(searchInput.value);
}

function getForecast(city) {
  let apiKey = "ca80fb7d3o48t3c14460b13a3d83ca48";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let days = ["Friday", "Saturday", "Sunday", "Monday", "Tuesday"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml += `
  <div class="weather-forecast-day">
    <div class="weather-forecast-date">${day}</div>
    <img
      src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png"
      alt="weather-forecast-icon"
      class="weather-forecast-icon"
    />
    <div class="weather-forecast-temperature">
      18ºC <span class="weather-forecast-min">/ 12ºC</span>
    </div>
  </div>
`;
  });

  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchCity);

searchTemperature("California");
