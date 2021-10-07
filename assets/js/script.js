var weatherInfo;
var apiKey = "f8e665afb7df296fa3ac06027ab4d95d";
var historyButtons = [];

/**
 * Creates and appends the history buttons that will eventually display
 * weather search history. Will at first make them invisible, so they can
 * later be made visible when there's information to put in them.
 */
function setHistoryButtons() {
    var historyValues = JSON.parse(localStorage.getItem("history"));
    console.log(historyValues);
    
    for (var i = 0; i < 7; i++) {
        buttonEl = document.createElement("button");
        buttonEl.className = "city-history-button hide";
        if (historyValues && historyValues[i] != "") {
            buttonEl.textContent = historyValues[i];
            buttonEl.className = "city-history-button";
        }
        historyButtons.push(buttonEl);
        $("#city-search-history-container").append(buttonEl);
    }
}

/**
 * Will call the database, grab the necessary data, and stick it in a big variable
 * called weatherInfo
 */
var getCurrentWeather = function(cityName) {
    console.log("getWeather activated; city name: " + cityName);
    var apiUrl = "";
    var coordinates = [-999, -999];
    var geoApiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&appid=" + apiKey;

    fetch(geoApiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                coordinates[0] = (data[0].lat);
                coordinates[1] = (data[0].lon);
                console.log(coordinates);

                apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" +
                coordinates[0] +  "&lon=" + coordinates[1] + "&exclude=current,minutely,hourly&appid=" + 
                apiKey + "&units=imperial";

                fetch(apiUrl)
                .then(function(response) {
                    if (response.ok) {
                        response.json().then(function(data) {
                            weatherInfo = data;
                            setCurrentWeather(); //begin next function in chain
                            setForecast();
                            updateSearchHistory(); //update the search history buttons
                        });
                    }
                    else {
                        console.log("weather data fetch failed");
                    }
                });
            });
        }
        else {
            console.log("coordinate fetch failed");
        }
    });

    
}

/**
 * Will... somehow... return the correct weather image. 
 */
function getWeatherImage(weather) {
    console.log("getWeatherImage activated");
}

/**
 * Sets the weather in the current day display row.
 */
function setCurrentWeather() {
    console.log("setCurrentWeather activated");
    $("#current-weather-title").text($("#city-search-input").val());
    $("#current-weather-temp").text("Temp: " + weatherInfo.daily[0].temp.day);
    $("#current-weather-wind").text("Wind: " + weatherInfo.daily[0].wind_speed + " mph");
    $("#current-weather-humidity").text("Humidity: " + weatherInfo.daily[0].humidity + " %");
    $("#current-weather-uv").text(weatherInfo.daily[0].uvi);
    // getWeatherImage("weather goes here");
}

/**
 * Sets the forecast in the last row.
 */
function setForecast() {
    console.log("setForecast activated");
    for (var i = 1; i <= 5; i++) {
        $("#day-"+i+"-temp").text("Temp: " + weatherInfo.daily[i-1].temp.day);
        $("#day-"+i+"-wind").text("Temp: " + weatherInfo.daily[i-1].wind_speed + " mph");
        $("#day-"+i+"-humidity").text("Temp: " + weatherInfo.daily[i-1].humidity + " %");
    }
}

/**
 * Updates the column of search history buttons using the
 * historyButtons array
 */
function updateSearchHistory() {
    console.log("updateSearchHistory activated");
    for (var i = 0; i < historyButtons.length; i++) {
        if (historyButtons[i].textContent === $("#city-search-input").val()) {
            console.log("repeat; loop ended");
            return;
        }
    }
    for (var i = historyButtons.length - 1; i > 0; i--) {
        historyButtons[i].textContent = historyButtons[i-1].textContent;
        if (historyButtons[i].textContent) {
            historyButtons[i].setAttribute("class", "city-history-button");
        }
    }
    historyButtons[0].setAttribute("class", "city-history-button");
    historyButtons[0].textContent = $("#city-search-input").val();

    updateLocalStorage();
}

function updateLocalStorage() {
    var historyValues = [];
    for (var i = 0; i < historyButtons.length; i++) {
        historyValues.push(historyButtons[i].textContent);
    }
    console.log(historyValues);
    localStorage.setItem("history", JSON.stringify(historyValues));  
}

setHistoryButtons();

$("#city-search-button").click(function() {
    // $("#city-search-input").val("Richmond");
    getCurrentWeather($("#city-search-input").val())
});

$("#city-search-history-container").on("click", ".city-history-button", function() {
    $("#city-search-input").val($(this).text());
    getCurrentWeather($("#city-search-input").val());
});