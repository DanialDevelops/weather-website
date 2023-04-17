var inputEl = document.querySelector("#input-el");
var apiKey = "bf1354a0437babaabd0ce08aa94a71bc";
function getWeather(event) {
  event.preventDefault()
  var cityName = inputEl.value
  var cityWeather = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;
 
  fetch(cityWeather)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      var lat = data.city.coord.lat
      var lon = data.city.coord.lon
      var fiveDay = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
      getFiveDay(fiveDay)
      setCurrentCon(data.weather)
    });
}

function getFiveDay(fiveDay){
  fetch(fiveDay)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    setFiveDay(data.weather)
})
}

function updateLocalStorage(){

}

function setCurrentCon(weather){

}

function setFiveDay(weather){

}

function getHistory(){
  
}

document.addEventListener("submit", getWeather);
