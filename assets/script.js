var inputEl = document.querySelector("#input-el");
var apiKey = "bf1354a0437babaabd0ce08aa94a71bc";
function getWeather(event) {
  event.preventDefault();
  var cityName = inputEl.value;
  var cityWeather = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;

  fetch(cityWeather)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      var lat = data.city.coord.lat;
      var lon = data.city.coord.lon;
      var fiveDay = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      getFiveDay(fiveDay);
      setCurrentCon(data);
    });
}

function getFiveDay(fiveDay) {
  fetch(fiveDay)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      setFiveDay(data);
    });
}

function updateLocalStorage(cityName) {
var history = JSON.parse(localStorage.getItem("history")) || [];
if (history.indexOf(cityName) === -1) {
  history.push(cityName);
}
localStorage.setItem("history", JSON.stringify(history));
}

function setCurrentCon(data) {
  var cityName = data.city.name;
  var temperature = data.list[0].main.temp;
  var humidity = data.list[0].main.humidity;
  var windSpeed = data.list[0].wind.speed;
  var dateObj = new Date(data.list[0].dt_txt);
  var month = dateObj.getMonth() + 1;
  var day = dateObj.getDate();
  var year = dateObj.getFullYear();
  var date = month + "/" + day + "/" + year;
  console.log(data.city.name);
  document.querySelector("#date").textContent = date;
  document.querySelector("#city").textContent = cityName;
  document.querySelector("#temp").textContent = "Temp: " + temperature;
  document.querySelector("#humidity").textContent = "Humidity: " + humidity;
  ("%");
  document.querySelector("#Wind").textContent = "Wind: " + windSpeed;
}

function setFiveDay(data) {
  console.log(data);
  var forecastList = data.list;

  document.querySelector("#weather-card").innerHTML = "";

  for (var i = 0; i < forecastList.length; i += 8) {
    forecastItem = forecastList[i];
    var dateObj = new Date(data.list[i].dt_txt);
    var month = dateObj.getMonth() + 1;
    var day = dateObj.getDate();
    var year = dateObj.getFullYear();
    var date = month + "/" + day + "/" + year;
    var temperature = data.list[i].main.temp;
    var humidity = data.list[i].main.humidity;
    var windSpeed = data.list[i].wind.speed;

    var forecastString =
      date +
      " - Temperature: " +
      temperature +
      ", Humidity: " +
      humidity +
      ", Wind Speed: " +
      windSpeed +
      " ";

    document.querySelector("#weather-card").textContent += forecastString;
  }
}

function getHistory() {}

document.addEventListener("submit", getWeather);
