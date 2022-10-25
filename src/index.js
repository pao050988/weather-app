let apiKey = "45c635f6554467de219d60506c6e3432";

function showtemperature(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let cityName = response.data.name;
  let temperatureElement = document.querySelector("#datetemperature");
  temperatureElement.innerHTML = `${temperature}°C`;
  let fulltemperature = document.querySelector("#datetemperature");
  fulltemperature.innerHTML = `The time for today in ${cityName} is ${temperature}°C`;
}

function getCityTemperature(cityName) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showtemperature);
}

function getCityNameByGeolocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(`latitude: ${latitude}`);
  console.log(`longitude: ${longitude}`);
  let apiUrl1 = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl1).then((result) => {
    console.log("success", result);
    let cityName = result.data.name;
    let fulltemperature = document.querySelector("#datetemperature");
    fulltemperature.innerHTML = `The time for today in ${cityName}`;
    let currentCity = document.querySelector("#city");
    currentCity.innerHTML = "";
    currentCity.innerHTML = cityName;
    getCityTemperature(cityName);
  });
}

function citySearch(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-input");
  getCityTemperature(cityName.value);
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = cityName.value;
}

let searchButton = document.querySelector("#search-bar");
searchButton.addEventListener("submit", citySearch);

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCityNameByGeolocation);
}

let buttonPosition = document.querySelector(".button");
buttonPosition.addEventListener("click", getCurrentPosition);

console.log(new Date());

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

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
  "December"
];

let currentDay = days[new Date().getDay()];
let currentMonth = months[new Date().getMonth()];
let currentDate = new Date().getDate();
let currentYear = new Date().getFullYear();
let currentHour = new Date().getHours();
let currentMin = new Date().getMinutes();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}

if (currentMin < 10) {
  currentMin = `0${currentMin}`;
}
let fullDateTime = `Today is ${currentDay}, ${currentMonth} ${currentDate}, ${currentYear} ${currentHour}:${currentMin}`;
console.log(fullDateTime);

let dayTime = document.querySelector("#date");
dayTime.innerHTML = fullDateTime;
