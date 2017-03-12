var OpenWeatherAppKey = "e130fa4fe27f6664a463c43bbdb98ca3";

function getWeatherWithZipCode() {

    var city = $('#city-code-input').val()
        ,btn = this
        ,queryString =
        'http://api.openweathermap.org/data/2.5/weather?appid='
        + OpenWeatherAppKey + '&lang=ru&units=metric&mode=json&q=' + city;

    $(btn).text('Loading...');

    $.getJSON(queryString, function (results) {

        showWeatherData(results);
        $(btn).text('Find Weather');

    }).fail(function (jqXHR) {
        $('#error-msg').show();
        $('#error-msg').text("Error retrieving data. " + jqXHR.statusText);
        $(btn).text('Find Weather');
    });

    return false;
}

function showWeatherData(results) {

    if (results.weather.length) {

        $('#error-msg').hide();
        $('#weather-data').show();

        $('#title').text(results.name);
        $('#temperature').text(results.main.temp);
        $('#wind').text(results.wind.speed);
        $('#humidity').text(results.main.humidity);
        $('#visibility').text(results.weather[0].main);

        var sunriseDate = new Date(results.sys.sunrise * 1000);
        $('#sunrise').text(sunriseDate.toLocaleTimeString());

        var sunsetDate = new Date(results.sys.sunset * 1000);
        $('#sunset').text(sunsetDate.toLocaleTimeString());

    } else {
        $('#weather-data').hide();
        $('#error-msg').show();
        $('#error-msg').text("Error retrieving data. ");
    }
}