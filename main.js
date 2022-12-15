//let exampleCity = "Minneapolis";
const weatherLabels = [
  "Current Temperature",
  "Feels Like",
  "Low",
  "High",
  "Air Pressure",
  "Humidity",
];
//returns current weather
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
      let weatherResult = currentWeather.main;
      let weatherName = currentWeather.name;
      //displayWeather(weatherResult);
      displayWeather(weatherResult, weatherName);
    });
}
//returns current weather if user inputs a zipcode
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
      let weatherResult = currentWeather.main;
      let weatherName = currentWeather.name;
      //displayWeather(weatherResult);
      displayWeather(weatherResult, weatherName);
    });
}

function getForecast(userInput) {
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      userInput +
      "&appid=17312825d27592a56aa8d8b5b3280657&units=imperial",
    { mode: "cors" }
  )
    .then(function (response) {
      let forecast = response.json();
      return forecast;
    })
    .then(function (forecast) {
      let weatherResult = forecast.list;
      displayDailyForecast(weatherResult);

      return weatherResult;
    })
    .then(function (weatherResult) {});
}

let userSubmit = document.querySelector("#button");
let userInput = document.querySelector("#userInput");

userSubmit.addEventListener("click", () => {
  let userInputValue = userInput.value;
  if (/\d/.test(userInputValue) == true) {
    getWeatherByZip(userInputValue);
  } else {
    getWeather(userInputValue);
    getForecast(userInputValue);
  }
});

function displayWeather(x, y) {
  let index = 0;
  document.querySelector("#result").innerText = "";
  document.querySelector("#forecastOverview").innerText = "";
  let locationName = document.createElement("h1");
  locationName.textContent = y;
  document.querySelector("#result").appendChild(locationName);
  for (let i in x) {
    let newDiv = document.createElement("div");
    if (`${[i]}`.includes("temp") || `${[i]}`.includes("feel")) {
      newDiv.innerText = weatherLabels[index] + ": " + `${x[i]}` + "\u2109";
    } else {
      newDiv.innerText = weatherLabels[index] + ": " + `${x[i]}`;
    }
    document.querySelector("#result").appendChild(newDiv);
    index += 1;
  }
}
function displayDailyForecast(x) {
  let currentDay = "";
  for (let i in x) {
    let createDivForDay = document.createElement("div");
    createDivForDay.setAttribute("id", "forecastDay");
    let weatherDetails = "";

    console.log(`${x[i]}`);
    for (let j in x[i]) {
      if (`${j}` == "main") {
        for (let z in x[i][j]) {
          //console.log(`${z}: ` + `${x[i][j][z]}`);
          if (`${z}` == "temp") {
            weatherDetails = "Average Temp: " + `${x[i][j][z]}` + "\u2109";
          }
        }
      }
      if (`${j}` == "dt_txt") {
        let splitDate = `${x[i][j]}`.split(" ");
        if (currentDay == splitDate[0]) {
          continue;
        } else {
          currentDay = `${splitDate[0]}`;
          let date = document.createElement("h1");
          date.innerText = currentDay;
          console.log(x[i]);
          document
            .querySelector("#forecastOverview")
            .appendChild(createDivForDay);
          createDivForDay.appendChild(date);
          let children = document.createElement("p");
          children.innerText = weatherDetails;
          createDivForDay.appendChild(children);
        }
      }
    }
  }
}
