//To fetch the city input by user

var inputCity = document.getElementById("cityInput");
var searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", getCityWeather);


//Get the information about the current weather from Open Weather API
function getCityWeather(event) {
    if (event) {
        event.preventDefault();
    }
    var cityName = inputCity.value;
    console.log('Search city: ', cityName );
    var apiKey = "01554937b65242f27b9efd3966f96164";
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey;
    
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    showCityWeather(data);
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function (error) {
            alert("We were unable to connect to the OpenWeather API");
    });
}

//Display the data of the curent city Weather
var cityNameHeader = document.getElementById("cityName");
var cityCurrentDate = document.getElementById("todaysDate");
var cityWeatherIcon = document.getElementById("weatherIcon");
var cityTemperature = document.getElementById("temperature");
var cityWind = document.getElementById("wind");
var cityHumidity = document.getElementById("humidity");
var cityUV = document.getElementById("uvIndex");

function showCityWeather(data) {
    cityNameHeader.textContent = data.name;
    cityCurrentDate.textContent = moment().format('(M/D/YYYY)');
    cityTemperature.textContent = data.main.temp;
    cityWind.textContent = data.wind.speed;
    cityHumidity.textContent = data.main.humidity;

    //add weather icon
    var iconData = data.weather[0].icon;
    var iconUrl = "https://openweathermap.org/img/w/" + iconData + ".png";
    cityWeatherIcon.setAttribute('src',iconUrl);

    var longitude = data.coord.lon;
    var latitude = data.coord.lat;

    console.log('Longitude: ',longitude);
    console.log('Latitude: ',latitude);

    getCityUV(longitude, latitude);
    getCityForecast(longitude, latitude);
    searchedCities(data.name);
}

//Get UV using the coordinates obtained

function getCityUV(longitude, latitude) {
    var apiKey = "01554937b65242f27b9efd3966f96164";
    var apiURL ="https://api.openweathermap.org/data/2.5/onecall?lat=" + longitude + "&lon=" + latitude + "&exclude=minutely,hourly,daily,alerts&appid=" + apiKey;
    
    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    showCityUV(data);
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function (error) {
            alert("We were unable to connect to the OpenWeather API");
    });
}

// Change the color for the UV symbol
function showCityUV(data) {
    cityUV.textContent = data.current.uvi;
    var uvValue = cityUV.textContent;
    console.log('UV: ',uvValue);
    switch (true) {
        case (uvValue <=2):
            cityUV.setAttribute('class','uvLow');
            break;
        case (uvValue> 2 && uvValue <=5):
           cityUV.setAttribute('class','uvModerate');
            break;
        case (uvValue> 5 && uvValue <=7):
           cityUV.setAttribute('class','uvHigh');
            break;    
        case (uvValue> 7 && uvValue <=10):
           cityUV.setAttribute('class','uvVeryHigh');
            break; 
        case (uvValue > 10):
           cityUV.setAttribute('class','uvExtreme');
            break;     
      }
}


// Get the 5 day forecast 

function getCityForecast(longitude, latitude) {
    var apiKey = "01554937b65242f27b9efd3966f96164";
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial&exclude=current,minutely,hourly,alerts&appid=" + apiKey;

    fetch(apiUrl)
    .then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data);
                showCityForecast(data);
            });
        } else {
            alert("Error " + response.statusText);
        }
    })
    .catch(function (error) {
        alert("We were unable to connect to the OpenWeather API");
    });
}

//Show the forecast

var forecastDate = document.querySelectorAll(".dateForecast");
var forecastIcon = document.querySelectorAll(".weatherIcon");
var forecastTemperature = document.querySelectorAll(".tempForecast");
var forecastWind = document.querySelectorAll(".windForecast");
var forecastHumidity = document.querySelectorAll(".humidityForecast")

function showCityForecast(data) {

    for (var i = 0; i < 5; i++) {
    forecastDate[i].textContent = moment().add(i+1, "days").format("M/D/YYYY");
    forecastTemperature[i].textContent = data.daily[i].temp.max;
    forecastWind[i].textContent = data.daily[i].wind_speed;
    forecastHumidity[i].textContent = data.daily[i].humidity;
    var forecastIconData = data.daily[i].weather[0].icon;
    var forecastIconUrl = "https://openweathermap.org/img/w/" + forecastIconData + ".png";
    forecastIcon.setAttribute('src',forecastIconUrl);
    }
}

//Store searched cities in local storage

function searchedCities(cityNameHeader) {

}

//Search for the stored cities again

function clickSearchedCities(event) {
    
}

//
