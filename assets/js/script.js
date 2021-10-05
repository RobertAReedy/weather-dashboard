var weatherInfo;
var apiKey = "f8e665afb7df296fa3ac06027ab4d95d";
var historyButtons = [];

/**
 * Creates and appends the history buttons that will eventually display
 * weather search history. Will at first make them invisible, so they can
 * later be made visible when there's information to put in them.
 */
function setHistoryButtons() {
    console.log("setHistoryButtons called");
    for (var i = 0; i < 7; i++) {
        buttonEl = document.createElement("button");
        buttonEl.className = "city-history-button hide";
        historyButtons.push(buttonEl);
        $("#city-search-history-container").append(buttonEl);
    }
}

/**
 * Will call the database, grab the necessary data, and stick it in a big variable
 * called weatherInfo
 */
var getCurrentWeather = function(cityName) {
    console.log("getWeather activated; value: " + cityName);
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&units=imperial";

    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log("Temp in fahrenheit: " + data.main.temp);
                weatherInfo = data;

                setCurrentWeather(); //begin next function in chain
                updateSearchHistory();
            });
        }
        else {
            console.log("fetch failed");
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
    $("#current-weather-temp").text("Temp: " + weatherInfo.main.temp);
    $("#current-weather-wind").text("Wind: " + weatherInfo.wind.speed + " mph");
    $("#current-weather-humidity").text("Humidity: " + weatherInfo.main.humidity + " %");
    $("#current-weather-uv").text("dunno man");
    // getWeatherImage("weather goes here");
}

/**
 * Sets the forecast in the last row.
 */
function setForecast() {
    console.log("setForecast activated");
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