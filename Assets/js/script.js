// creating constants for the elements in the html
// creating a variable for the citySearch array
// if there is no citySearch array in local storage, it will be an empty array
// getForecast function is called when the submit button is clicked
const cityName = document.getElementById("cityName");
const searchBtn = document.getElementById("submit");
const clearBtn = document.getElementById("clearBtn");
const date= document.getElementById("date");
const icon = document.getElementById("icon");
const temp = document.getElementById("temp");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

let citySearch = JSON.parse(localStorage.getItem("citySearch")) || [];

//  pull the current weather and forecast for the city
//  the current weather is displayed in the container
function getForecast(cityName) {
    var apiKey = "534fdec983ce04e848c40db694a46f07";
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    
        fetch(url)
        .then(response => response.json())
        .then(data => {
            // pulls the date, temp, humidity, wind, and icon for the current weather
            // allows it to be displayed in the container for todays weather
            var todaysWeather = document.getElementById('todaysWeather');
            var date = new Date(data.dt * 1000).toLocaleDateString();
            var temp = ((data.main.temp - 273.15) * 9/5 + 32).toFixed(2);
            var humidity = data.main.humidity;
            var wind = data.wind.speed;  
            var iconUrl = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;

            // card for the current weather within the container
        todaysWeather.innerHTML = `
            <div class="card-body">
                <h2 class="card-header"> Today's Forecast</h2>
                <h5 class="card-title">${date}</h5>
                <img src="${iconUrl}" alt="weather icon">
                <p class="card-text">Temp: ${temp} F</p>
                <p class="card-text">Humidity: ${humidity}%</p>
                <p class="card-text">Wind: ${wind} MPH</p>
            </div>
        `;  
        }
    );

    // using the api to get the forecast for the city
    // filters the forecast to only show the forecast for 12:00:00
    // creates a card for each day in the forecast
    url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;
    
        fetch(url)
            .then(response => response.json())
            .then(data => {
                var forecastList = data.list.filter(day => day.dt_txt.includes("12:00:00"));
                var forecastContainer = document.getElementById('forecastContainer');
                forecastContainer.innerHTML = '';
    
                forecastList.forEach(day => {
                    var card= document.createElement('div');
                    card.className = 'card';
                    // temp, humidity, wind, and icon for each day in the forecast
                    //temp is converted to fahrenheit from kelvin
                    //icon is generated from the api
                    var date = new Date(day.dt * 1000).toLocaleDateString();
                    var temp = ((day.main.temp - 273.15) * 9/5 + 32).toFixed(2);
                    var humidity = day.main.humidity;
                    var wind = day.wind.speed;  
                    var iconUrl = `http://openweathermap.org/img/w/${day.weather[0].icon}.png`;
                    // card is created for each day in the forecast
                    card.innerHTML = `
                        <div class="card-body">
                            <h5 class="card-title">${date}</h5>
                            <img src="${iconUrl}" alt="weather icon">
                            <p class="card-text">Temp: ${temp} F</p>
                            <p class="card-text">Humidity: ${humidity}%</p>
                            <p class="card-text">Wind: ${wind} MPH</p>
                        </div>
                    `;  
                    forecastContainer.appendChild(card);
                });
            }
        );
    }

// when the submit button is clicked, the city is added to the citySearch array
// the city is then saved to local storage
// the forecast is displayed for the city
document.getElementById('submit').addEventListener('click', function(event) {
    event.preventDefault();
    var city = document.getElementById('city').value;
    citySearch.push(city);
    localStorage.setItem('citySearch', JSON.stringify(citySearch));
    getForecast(city);  

    // city gets added to the list of cities below the search container
    var cityList = document.getElementById('cityList');
    var cityDiv = document.createElement('div');
    cityDiv.textContent = city;
    cityDiv.classList.add('city');
    cityList.appendChild(cityDiv);
    document.getElementById('city').value = '';
});   

// to keep the cities under the line 
// saves city searches to local storage
// displays the city searches below the search container
document.addEventListener('DOMContentLoaded', function() {
    var citySearch = JSON.parse(localStorage.getItem('citySearch'));
    var cityList = document.getElementById('cityList');

    citySearch.forEach(city => {
        var cityDiv = document.createElement('div');
        cityDiv.textContent = city;
        cityDiv.classList.add('city');
        cityDiv.addEventListener('click', function() {
            getForecast(city);
        });
        cityList.appendChild(cityDiv);
        document.getElementById('city').value = '';
    });
});

// clear button function
// helps clear all the cities listed below the search container 
// citySearch = [] clears the city search so that when user refreshes the page, the cities are not displayed
document.getElementById('clearBtn').addEventListener('click', function() {
    citySearch = [];
    localStorage.removeItem('citySearch');
    document.getElementById('cityList').innerHTML = '';
});