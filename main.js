//let exampleCity = "Minneapolis";
const weatherLabels = [
  "Current Temperature",
  "Feels Like",
  "Low",
  "High",
  "Air Pressure",
  "Humidity",
];

function getWeather(userInput) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      userInput +
      "&appid=17312825d27592a56aa8d8b5b3280657&units=imperial",
    { mode: "cors" }
  )
    .then(function (response) {
      let currentWeather = response.json();
      return currentWeather;
    })
    .then(function (currentWeather) {
      console.log(currentWeather);
      let weatherResult = currentWeather.main;
      let weatherName = currentWeather.name;
      //displayWeather(weatherResult);
      displayWeather(weatherResult, weatherName);
    });
}
function getWeatherByZip(userInput) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?zip=" +
      userInput +
      "&appid=17312825d27592a56aa8d8b5b3280657&units=imperial",
    { mode: "cors" }
  )
    .then(function (response) {
      let currentWeather = response.json();
      return currentWeather;
    })
    .then(function (currentWeather) {
      console.log(currentWeather);
      let weatherResult = currentWeather.main;
      let weatherName = currentWeather.name;
      //displayWeather(weatherResult);
      displayWeather(weatherResult, weatherName);
    });
}

let userSubmit = document.querySelector("#button");
let userInput = document.querySelector("#userInput");

userSubmit.addEventListener("click", () => {
  let userInputValue = userInput.value;
  if (/\d/.test(userInputValue) == true) {
    getWeatherByZip(userInputValue);
  } else {
    getWeather(userInputValue);
  }
});

function displayWeather(x, y) {
  let index = 0;
  document.querySelector("#result").innerText = "";
  let locationName = document.createElement("h1");
  locationName.textContent = y;
  document.querySelector("#result").appendChild(locationName);
  for (let i in x) {
    let newDiv = document.createElement("div");
    console.log(`${[i]}`);
    if (`${[i]}`.includes("temp") || `${[i]}`.includes("feel")) {
      newDiv.innerText = weatherLabels[index] + ": " + `${x[i]}` + "\u2109";
    } else {
      newDiv.innerText = weatherLabels[index] + ": " + `${x[i]}`;
    }
    document.querySelector("#result").appendChild(newDiv);
    index += 1;
  }
}
