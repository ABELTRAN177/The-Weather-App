const cityName = document.getElementById("cityName");
const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");
const date= document.getElementById("date");
const icon = document.getElementById("icon");
const temp = document.getElementById("temp");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

let citySearch = JSON.parse(localStorage.getItem("citySearch")) || [];

const APIKey = "534fdec983ce04e848c40db694a46f07";

function getWeather(cityName) {
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
    fetch(queryURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        let iconCode = data.weather[0].icon;
        let iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
        icon.setAttribute("src", iconURL);
        temp.textContent = "Temperature: " + data.main.temp + "°F";
        humidity.textContent = "Humidity: " + data.main.humidity + "%";
        wind.textContent = "Wind Speed: " + data.wind.speed + "MPH";
    });
}



// to keep the cities under the line 

// document.getElementById('cityForm').addEventListener('submit', function(event) {
//     event.preventDefault();
//     var city = document.getElementById('city').value;
//     var cityList = document.getElementById('cityList');
//     var cityDiv = document.createElement('div');
//     cityDiv.textContent = city;
//     cityList.appendChild(cityDiv);
//     document.getElementById('city').value = '';
// });