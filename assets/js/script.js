var weatherInfo;
var apiKey = "f8e665afb7df296fa3ac06027ab4d95d";

/**
 * Creates and appends the history buttons that will eventually display
 * weather search history. Will at first make them invisible, so they can
 * later be made visible when there's information to put in them.
 */
function setHistoryButtons() {
    console.log("setHistoryButtons called");
}

/**
 * Will call the database, grab the necessary data, and stick it in a big variable
 * called weatherInfo
 */
var getWeather = function(cityName) {
    console.log("getWeather activated; value: " + cityName);
    var apiUrl = "api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

    fetch(apiUrl);
    // .then(function(response) {
    //     if (response.ok) {
    //         response.json().then(function(data) {
    //             console.log(data);
    //         });
    //     }
    //     else {
    //         console.log("fetch failed");
    //     }
    // });
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
    getWeatherImage("weather goes here");
}

/**
 * Sets the forecast in the last row.
 */
function setForecast() {
    console.log("setForecast activated");
}

/**
 * 
 */
function updateSearchHistory() {
    console.log("updateSearchHistory activated");
}

$("#city-search-button").click(function() {
    $("#city-search-input").val("Richmond");

    getWeather($("#city-search-input").val());
    setCurrentWeather();
    setForecast();
});