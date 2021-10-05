var weatherInfo;

/**
 * Creates and appends the history buttons that will eventually display
 * weather search history. Will at first make them invisible, so they can
 * later be made visible when there's information to put in them.
 */
function setHistoryButtons() {

}

/**
 * Will call the database, grab the necessary data, and stick it in a big variable
 * called weatherInfo
 */
var getWeather = function(cityName) {
    console.log("getWeather activated; value: " + cityName);
}

function setCurrentWeather() {
    console.log("setCurrentWeather activated");
}

// console.log($("#city-search-input").value);

$("#city-search-button").click(function() {
    getWeather($("#city-search-input").val());
    setCurrentWeather();
});