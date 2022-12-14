//let exampleCity = "Minneapolis";
let weatherResult = "";

function getWeather() {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Minneapolis&appid=17312825d27592a56aa8d8b5b3280657&units=imperial",
    { mode: "cors" }
  )
    .then(function (response) {
      let currentWeather = response.json();
      return currentWeather;
    })
    .then(function (currentWeather) {
      console.log(currentWeather);
      weatherResult = currentWeather.main;
      //displayWeather(weatherResult);
      displayWeather(weatherResult);
    });
}
getWeather();

function displayWeather(x) {
  for (let i in x) {
    let newDiv = document.createElement("div");
    newDiv.innerText = `${[i] + ": " + x[i]}`;
    document.body.appendChild(newDiv);
  }
}
