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
      console.log(currentWeather);

      let weatherResult = currentWeather.main;
      let weatherName = currentWeather.name;
      let weatherCondition = currentWeather.weather;
      //displayWeather(weatherResult);
      displayWeather(weatherResult, weatherName, weatherCondition);
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
      console.log(currentWeather);
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
    getForecast(userInputValue);
  }
});

function displayWeather(x, y, z) {
  document.querySelector("#result").innerText = "";
  document.querySelector("#forecastOverview").innerText = "";
  document.querySelector("#summaryResult").innerText = "";
  let locationName = document.createElement("h1");
  locationName.textContent = y;
  document.querySelector("#summaryResult").appendChild(locationName);
  for (let i in z) {
    console.log(z[i].main);
    if (z[i].main) {
      let newDivState = document.createElement("div");
      newDivState.setAttribute("id", "currentState");
      newDivState.innerText = `${z[i].main}`;
      document.querySelector("#summaryResult").appendChild(newDivState);
    } else {
      continue;
    }
  }
  for (let i in x) {
    let newDiv = document.createElement("div");
    if (`${[i]}` == "temp") {
      newDiv.innerText = `${x[i]}` + "\u2109";
      document.querySelector("#summaryResult").appendChild(newDiv);
      continue;
    } else if (`${[i]}`.includes("temp") || `${[i]}`.includes("feel")) {
      let weatherStr = `${[i]}` + ": " + `${x[i]}` + "\u2109";
      let newWeatherStr = weatherStr.replace("_", " ");
      newDiv.innerText = newWeatherStr;
    } else {
      let weatherStr = `${[i]}` + ": " + `${x[i]}`;
      let newWeatherStr = weatherStr.replace("_", " ");
      newDiv.innerText = newWeatherStr;
    }
    document.querySelector("#result").appendChild(newDiv);
  }
}
function displayDailyForecast(x) {
  let currentDay = "";
  for (let i in x) {
    let createDivForDay = document.createElement("div");
    createDivForDay.setAttribute("id", "forecastDay");
    let weatherDetails = "";

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
