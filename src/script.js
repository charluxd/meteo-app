function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let searchCity = document.querySelector("#city-name");
  searchCity.innerHTML = searchInput.value;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchCity);
