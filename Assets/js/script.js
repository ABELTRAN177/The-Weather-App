const cityName = document.getElementById("cityName");
const searchBtn = document.getElementById("submit");
const clearBtn = document.getElementById("clearBtn");
const date= document.getElementById("date");
const icon = document.getElementById("icon");
const temp = document.getElementById("temp");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

let citySearch = JSON.parse(localStorage.getItem("citySearch")) || [];


function getForecast(cityName) {
    var apiKey = "534fdec983ce04e848c40db694a46f07";
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    
        fetch(url)
        .then(response => response.json())
        .then(data => {
            var todaysWeather = document.getElementById('todaysWeather');
            var date = new Date(data.dt * 1000).toLocaleDateString();
            var temp = ((data.main.temp - 273.15) * 9/5 + 32).toFixed(2);
            var humidity = data.main.humidity;
            var wind = data.wind.speed;  
            var iconUrl = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    
        todaysWeather.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${date}</h5>
                <img src="${iconUrl}" alt="weather icon">
                <p class="card-text">Temp: ${temp} F</p>
                <p class="card-text">Humidity: ${humidity}%</p>
                <p class="card-text">Wind: ${wind} MPH</p>
            </div>
        `;  
        }
    );
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
    
                    var date = new Date(day.dt * 1000).toLocaleDateString();
                    var temp = ((day.main.temp - 273.15) * 9/5 + 32).toFixed(2);
                    var humidity = day.main.humidity;
                    var wind = day.wind.speed;  
                    var iconUrl = `http://openweathermap.org/img/w/${day.weather[0].icon}.png`;
    
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


document.getElementById('submit').addEventListener('click', function(event) {
    event.preventDefault();
    var city = document.getElementById('city').value;
    citySearch.push(city);
    localStorage.setItem('citySearch', JSON.stringify(citySearch));
    getForecast(city);  
});   
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