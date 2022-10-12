var dateDisplayEl = $(`#date`);
var apiKey = "77bd80046e8a9087dc98db69d5679d68";
var searchFormEl = document.querySelector(`#search-form`);
var moment = moment();
var temperatureEl = document.querySelector("#temperature");
var cityEl = document.querySelector("#city");
var descriptionEl = document.querySelector("#description");
var humidityEl = document.querySelector("#humidity");
var windEl = document.querySelector("#wind");
var dateEl = document.querySelector("#date");
var iconEl = document.querySelector("#icon");

function renderStorage(reversedSearches) {
  var pastSearches;
  if (!reversedSearches) {
    pastSearches = JSON.parse(localStorage.getItem("past-searches")).reverse();
  } else {
    pastseaches = reversedSearches;
  }
  console.log("renderingStorage");
  var historyDiv = document.getElementById("history");
  console.log(historyDiv);
  pastSearches.forEach((previousSearch) => {
    console.log(previousSearch);
    var button = document.createElement("button");
    button.addEventListener("click", handleSubmit);
    historyDiv.append(button);
  });
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  minutes = minutes > 9 ? minutes : "0" + minutes;
  hours = hours % 12 || 12;
  let timeDate = document.querySelector("#date");
  timeDate.innerHTML = date + " " + hours + ":" + minutes;

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
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  console.log(response);
  let forecast = response.data.daily;
  let forecastEl = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="card" style="width: 18rem;">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
          class="forecast-icon"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML += `</div>`;
  forecastEl.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  var temperatureEl = document.querySelector("#temperature");
  var cityEl = document.querySelector("#city");
  var descriptionEl = document.querySelector("#description");
  var humidityEl = document.querySelector("#humidity");
  var windEl = document.querySelector("#wind");
  var dateEl = document.querySelector("#date");
  var iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureEl.innerHTML = Math.round(celsiusTemperature);
  cityEl.innerHTML = response.data.name;
  descriptionEl.innerHTML = response.data.weather[0].description;
  humidityEl.innerHTML = response.data.main.humidity;
  windEl.innerHTML = Math.round(response.data.wind.speed);
  dateEl.innerHTML = formatDate(response.data.dt * 1000);
  iconEl.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  console.log(event.target);
  if (event.target.id === "search-form") {
    var cityInputEl = document.querySelector("#city-input");
    search(cityInputEl.value);
    addToLocalStorage(cityInputEl.value);
    return;
  } else {
    search(event.target.innerHTML);
  }
}

function addToLocalStorage(newCity) {
  var pastSearches = JSON.parse(localStorage.getItem("past-searches")) || [];
  console.log(newCity);
  console.log(pastSearches);
  if (pastSearches.includes(newCity)) {
    return;
  }
  if (pastSearches.length >= 5) {
    pastSearches = pastSearches.shift();
  }
  pastSearches = pastSearches.push(newCity);
  console.log(pastSearches);
  localStorage.setItem("past-searches", JSON.stringify(pastSearches));
  console.log(pastSearches);
  var reversedSearches = pastSearches.reverse();
  renderStorage(reversedSearches);
}

var form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search(`New York`);
