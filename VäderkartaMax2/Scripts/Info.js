$(function () {

    //var capital = "";
    //var country = '@(ViewBag.Country)';
    var apiKey = 'fe34f1dcaebdaf3204c2e53a4c865fb6';
    var weatherbitApiKey = '2035d3aefc17412891b68c1330c6bbb5';
    var apixuApiKey = '01b71d91de8046a597d123250180808';

    if (country === "") {
        $.getJSON('https://restcountries.eu/rest/v2/capital/' + capital, function (data) {
            //console.log(data);
            capital = data["0"].capital;
            currency = data["0"].currencies["0"].name;
            nativeName = data["0"].nativeName;
            $('#js-country').text(data["0"].name);
            $('#js-nativeName').text("Native name: " + nativeName);
            $('#js-capital').text("Capital: " + capital);
            $('#js-currency').text("Currency: " + currency);
            $('#js-subRegion').text("Subregion: " + data.subregion);
            var flagUrl = data["0"].flag;

            $('#flag').attr('src', flagUrl);

            country = data["0"].name;
        }).then(function (data) {

            $.each(data["0"].borders, function (index, value) {
                $.getJSON('https://restcountries.eu/rest/v2/alpha/' + value, function (response) {

                    $('#js-borderingCountries').append('<button type="submit" id="countrySubmit" name="submitCountry" value="' + value + '" class="btn btn-primary">' + response.name + '</button>');

                });

            });
            $.getJSON('https://en.wikipedia.org/api/rest_v1/page/summary/' + capital, function (response) {

                //console.log(response);
                $('#js-info').text(response.extract);

            });

            $.getJSON('https://api.openweathermap.org/data/2.5/find?q=' + capital + '&units=metric&APPID=' + apiKey, function (test) {
                var iconcode = test.list["0"].weather["0"].icon;
                var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                var windDeg = parseInt(test.list["0"].wind.deg);
                var windDir = calculateWindDir(windDeg);
                var unix_timestamp = test.list["0"].dt;

                var date = new Date(unix_timestamp * 1000);
                var options = { day: 'numeric', month: 'short' };


                $('#todaysDate').text(date.toLocaleDateString('en-GB', options));

                $('#wIcon').attr('src', iconurl);
                $('#cWeather').text("Current weather: " + test.list["0"].weather["0"].main + " and temperature: " + test.list["0"].main.temp + "°C");
                $('#todaysWeather').text(test.list["0"].weather["0"].main);
                $('.num').text(parseInt(test.list["0"].main.temp) + "°C");
                $('#todaysForecast').append('<span><img src="/Content/images/icon-umberella@2x.png" alt="" width="21" height="21">' + test.list["0"].main.humidity
                    + '%</span> <span><img src="/Content/images/icon-wind@2x.png" alt="" width="23" height="21">' + test.list["0"].wind.speed
                    + 'm/s</span> <span><img src="/Content/images/icon-compass@2x.png" alt="" width="22" height="22">' + windDir + '</span>');


            });

            $.getJSON('https://api.openweathermap.org/data/2.5/forecast?q=' + capital + '&units=metric&APPID=' + apiKey, function (svar) {
                //console.log(svar);

            }).then(function (svar) {
                populateDropdown();

                $.each(svar.list, function (index, value) {
                    var dt = new Date(value.dt_txt);
                    var iconcode = value.weather["0"].icon;
                    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

                    if (dt.getHours() === 12) {
                        var windDeg = parseInt(value.wind.deg);
                        var windDir = calculateWindDir(windDeg);

                        var unix_timestamp = value.dt;
                        var date = new Date(unix_timestamp * 1000);
                        var options = { day: 'numeric', month: 'short' };

                        $('#js-5dayForecast').append('<tr><td><span class="temp">'
                            + parseInt(value.main.temp) + '°C</span> <img src="' + iconurl + '" alt="weather icon" /><span class="fDate">' + date.toLocaleDateString('en-GB', options) + '</span></br> <img style="margin-left:10px;" src="/Content/images/icon-umberella@2x.png" alt="" width="21" height="21"> '
                            + value.main.humidity + '%  <img src="/Content/images/icon-compass@2x.png" alt="" width="22" height="22"> '
                            + windDir + ' <img src="/Content/images/icon-wind@2x.png" alt="" width="23" height="21"> ' + value.wind.speed + ' m/s</td> </tr>');

                    }
                });

            });
        });

    } else if (country !== "") {

        $.getJSON('https://restcountries.eu/rest/v2/alpha/' + country, function (data) {

            capital = data.capital;
            currency = data.currencies["0"].name;
            nativeName = data.nativeName;
            $('#js-country').text(data.name);
            $('#js-nativeName').text("Native name: " + nativeName);
            $('#js-capital').text("Capital: " + capital);
            $('#js-currency').text("Currency: " + currency);
            $('#js-subRegion').text("Subregion: " + data.subregion);
            var flagUrl = data.flag;

            $('#flag').attr('src', flagUrl);

            console.log(data, capital);
        }).then(function (data) {

            $.each(data.borders, function (index, value) {
                $.getJSON('https://restcountries.eu/rest/v2/alpha/' + value, function (response) {

                    $('#js-borderingCountries').append('<button type="submit" id="countrySubmit" name="submitCountry" value="' + value + '" class="btn btn-primary">' + response.name + '</button>');

                });

            });
            $.getJSON('https://en.wikipedia.org/api/rest_v1/page/summary/' + capital, function (response) {

                //console.log(response);
                $('#js-info').text(response.extract);

            });

            $.getJSON('https://api.openweathermap.org/data/2.5/find?q=' + capital + '&units=metric&APPID=' + apiKey, function (test) {
                //console.log(response);
                var iconcode = test.list["0"].weather["0"].icon;
                var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                var windDeg = parseInt(test.list["0"].wind.deg);
                var windDir = calculateWindDir(windDeg);
                var unix_timestamp = test.list["0"].dt;

                var date = new Date(unix_timestamp * 1000);
                var options = { day: 'numeric', month: 'short' };

                $('#todaysDate').text(date.toLocaleDateString('en-GB', options));

                $('#wIcon').attr('src', iconurl);
                $('#cWeather').text("Current weather: " + test.list["0"].weather["0"].main + " and temperature: " + test.list["0"].main.temp + "°C");
                $('#todaysWeather').text(test.list["0"].weather["0"].main);
                $('.num').text(parseInt(test.list["0"].main.temp) + "°C");
                $('#todaysForecast').append('<span><img src="/Content/images/icon-umberella@2x.png" alt="" width="21" height="21">' + test.list["0"].main.humidity
                    + '%</span> <span><img src="/Content/images/icon-wind@2x.png" alt="" width="23" height="21">' + test.list["0"].wind.speed
                    + 'm/s</span> <span><img src="/Content/images/icon-compass@2x.png" alt="" width="22" height="22">' + windDir + '</span>');

            });

            $.getJSON('https://api.openweathermap.org/data/2.5/forecast?q=' + capital + '&units=metric&APPID=' + apiKey, function (svar) {
                //console.log(svar);

            }).then(function (svar) {
                populateDropdown();

                $.each(svar.list, function (index, value) {
                    var dt = new Date(value.dt_txt);
                    var iconcode = value.weather["0"].icon;
                    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

                    if (dt.getHours() === 12) {
                        //console.log(value);
                        var windDeg = parseInt(value.wind.deg);
                        var windDir = calculateWindDir(windDeg);

                        var unix_timestamp = value.dt;
                        var date = new Date(unix_timestamp * 1000);
                        var options = { day: 'numeric', month: 'short' };
                        //console.log(windi)
                        $('#js-5dayForecast').append('<tr><td><span class="temp">'
                            + parseInt(value.main.temp) + '°C</span> <img src="' + iconurl + '" alt="weather icon" /><span class="fDate">' + date.toLocaleDateString('en-GB', options) + '</span></br> <img style="margin-left:10px;" src="/Content/images/icon-umberella@2x.png" alt="" width="21" height="21"> '
                            + value.main.humidity + '%  <img src="/Content/images/icon-compass@2x.png" alt="" width="22" height="22"> '
                            + windDir + ' <img src="/Content/images/icon-wind@2x.png" alt="" width="23" height="21"> ' + value.wind.speed + ' m/s</td> </tr>');

                    }

                });

            });

        });
    }
});

function populateDropdown() {
    $.getJSON('https://restcountries.eu/rest/v2/all', function (response) {

        var capitalArray = [];
        $.each(response, function (key, value) {
            if (value.capital !== "") {

                capitalArray.push(value.capital);

            }
        });

        capitalArray.sort();
        //console.log(capitalArray);

        capitalArray.forEach(function (entry) {
            $("#dropDownCities").append("<option>" + entry + "</option>");
        });

    });

}

function calculateWindDir(windDir) {
    if (windDir > 337) {
        return "North";
    } else if (windDir > 23 && windDir <= 68) {
        return "NE";
    } else if (windDir > 68 && windDir <= 113) {
        return "East";
    } else if (windDir > 113 && windDir <= 158) {
        return "SE";
    } else if (windDir > 158 && windDir <= 203) {
        return "South";
    } else if (windDir > 203 && windDir <= 248) {
        return "SW";
    } else if (windDir > 248 && windDir <= 293) {
        return "West";
    } else if (windDir > 293 && windDir <= 337) {
        return "NW";
    } else if (windDir <= 23) {
        return "North";
    }
}
