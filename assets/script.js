var dateDisplayEl = $(`#date`);
var apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
var searchFormEl = document.querySelector(`#search-form`);
var moment = moment();
var temperatureEl = document.querySelector("#temperature");
var cityEl = document.querySelector("#city");
var descriptionEl = document.querySelector("#description");
var humidityEl = document.querySelector("#humidity");
var windEl = document.querySelector("#wind");
var dateEl = document.querySelector("#date");
var iconEl = document.querySelector("#icon");
var apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  cityEl +
  "&units=imperial&appid=" +
  apiKey;

function displayDate() {
  var today = moment().format(`MMM DD, YYYY`);
  dateDisplayEl.text(today);
}

displayDate();
