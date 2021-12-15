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
    var apiURL ="https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=minutely,hourly,daily,alerts&appid=" + apiKey;
    
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
                showCityForecast1(data);
                showCityForecast2(data);
                showCityForecast3(data);
                showCityForecast4(data);
                showCityForecast5(data);
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

var forecastDate1 = document.getElementById("dateForecast1");
var forecastIcon1 = document.getElementById("weatherIcon1");
var forecastTemperature1 = document.getElementById("tempForecast1");
var forecastWind1 = document.getElementById("windForecast1");
var forecastHumidity1 = document.getElementById("humidityForecast1")

function showCityForecast1(data) {

    forecastDate1.textContent = moment().add(1, "days").format("M/D/YYYY");
    forecastTemperature1.textContent = data.daily[0].temp.max;
    forecastWind1.textContent = data.daily[0].wind_speed;
    forecastHumidity1.textContent = data.daily[0].humidity;
    var forecastIconData1 = data.daily[0].weather[0].icon;
    var forecastIconUrl1 = "https://openweathermap.org/img/w/" + forecastIconData1 + ".png";
    forecastIcon1.setAttribute('src',forecastIconUrl1);
}

var forecastDate2 = document.getElementById("dateForecast2");
var forecastIcon2 = document.getElementById("weatherIcon2");
var forecastTemperature2 = document.getElementById("tempForecast2");
var forecastWind2 = document.getElementById("windForecast2");
var forecastHumidity2 = document.getElementById("humidityForecast2")

function showCityForecast2(data) {

    forecastDate2.textContent = moment().add(2, "days").format("M/D/YYYY");
    forecastTemperature2.textContent = data.daily[1].temp.max;
    forecastWind2.textContent = data.daily[1].wind_speed;
    forecastHumidity2.textContent = data.daily[1].humidity;
    var forecastIconData2 = data.daily[1].weather[0].icon;
    var forecastIconUrl2 = "https://openweathermap.org/img/w/" + forecastIconData2 + ".png";
    forecastIcon2.setAttribute('src',forecastIconUrl2);
}

var forecastDate3 = document.getElementById("dateForecast3");
var forecastIcon3 = document.getElementById("weatherIcon3");
var forecastTemperature3 = document.getElementById("tempForecast3");
var forecastWind3 = document.getElementById("windForecast3");
var forecastHumidity3 = document.getElementById("humidityForecast3")

function showCityForecast3(data) {

    forecastDate3.textContent = moment().add(3, "days").format("M/D/YYYY");
    forecastTemperature3.textContent = data.daily[2].temp.max;
    forecastWind3.textContent = data.daily[2].wind_speed;
    forecastHumidity3.textContent = data.daily[2].humidity;
    var forecastIconData3 = data.daily[2].weather[0].icon;
    var forecastIconUrl3 = "https://openweathermap.org/img/w/" + forecastIconData3 + ".png";
    forecastIcon3.setAttribute('src',forecastIconUrl3);
}

var forecastDate4 = document.getElementById("dateForecast4");
var forecastIcon4 = document.getElementById("weatherIcon4");
var forecastTemperature4 = document.getElementById("tempForecast4");
var forecastWind4 = document.getElementById("windForecast4");
var forecastHumidity4 = document.getElementById("humidityForecast4")

function showCityForecast4(data) {

    forecastDate4.textContent = moment().add(4, "days").format("M/D/YYYY");
    forecastTemperature4.textContent = data.daily[3].temp.max;
    forecastWind4.textContent = data.daily[3].wind_speed;
    forecastHumidity4.textContent = data.daily[3].humidity;
    var forecastIconData4 = data.daily[3].weather[0].icon;
    var forecastIconUrl4 = "https://openweathermap.org/img/w/" + forecastIconData4 + ".png";
    forecastIcon4.setAttribute('src',forecastIconUrl4);
}

var forecastDate5 = document.getElementById("dateForecast5");
var forecastIcon5 = document.getElementById("weatherIcon5");
var forecastTemperature5 = document.getElementById("tempForecast5");
var forecastWind5 = document.getElementById("windForecast5");
var forecastHumidity5 = document.getElementById("humidityForecast5")

function showCityForecast5(data) {

    forecastDate5.textContent = moment().add(5, "days").format("M/D/YYYY");
    forecastTemperature5.textContent = data.daily[4].temp.max;
    forecastWind5.textContent = data.daily[4].wind_speed;
    forecastHumidity5.textContent = data.daily[4].humidity;
    var forecastIconData5 = data.daily[4].weather[0].icon;
    var forecastIconUrl5 = "https://openweathermap.org/img/w/" + forecastIconData5 + ".png";
    forecastIcon5.setAttribute('src',forecastIconUrl5);
}

//Store searched cities in local storage and create an element for them

var searchHistory = document.getElementById("searchHist");

function searchedCities(cityNameHeader) {
    if (JSON.parse(localStorage.getItem("history")) == null) {

        var citiesArray = [];
        citiesArray.push(cityNameHeader);
        var cityBtn = document.createElement("button");
        cityBtn.setAttribute("class", "cityBtn");
        cityBtn.textContent = cityNameHeader;
        searchHistory.prepend(cityBtn);
        localStorage.setItem("history", JSON.stringify(citiesArray));

    } else {
        var citiesArray = JSON.parse(localStorage.getItem("history"));
        citiesArray.push(cityNameHeader);
        var cityBtn = document.createElement("button");
        cityBtn.setAttribute("class", "cityBtn");
        cityBtn.textContent = cityNameHeader;
        searchHistory.prepend(cityBtn);
        localStorage.setItem("hisory", JSON.stringify(citiesArray));
        
    }
}

//Search for the stored cities again

searchHistory.addEventListener('click', searchedCitiesWeather);

function searchedCitiesWeather(event) {
    if (event.target.matches(".cityBtn")) {
        console.log("Search city again:", event.target.textContent);
        inputCity.value = event.target.textContent;
        getCityWeather(); 
    }
}
