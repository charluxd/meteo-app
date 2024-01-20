function updateWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = response.data.temperature.current;
  let searchCity = document.querySelector("#city-name");

  searchCity.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchCity);

searchTemperature("California");
