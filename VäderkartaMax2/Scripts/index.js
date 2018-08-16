$(function () {
    $('#world-map').vectorMap({
        map: 'world_mill',
        onRegionClick: function (event, code) {
            var map = $('#world-map').vectorMap('get', 'mapObject');
            var name = map.getRegionName(code);
            var apiKey = 'fe34f1dcaebdaf3204c2e53a4c865fb6'
            $('select[name="drop_down"]').val('none');
            $('submit[name="submitCountry"]').val(name);
            //console.log(code);
            //console.log(name);
            $('#exampleModal').modal('toggle');
            //$('.modal-body').empty();
            //$('.modal-body').append('<p> Country: ' + name + '</p>')
            $('#exampleModalLabel').text(name);
            $.getJSON('https://restcountries.eu/rest/v2/alpha/' + code, function (data) {
                console.log(data);
                $('#countrySubmit').val(data.alpha3Code);
                $('#js-capital').text("Capital: " + data.capital);
            }).then(function (data) {

                $.getJSON('https://api.openweathermap.org/data/2.5/find?q=' + data.capital + '&units=metric&APPID=' + apiKey, function (response) {
                    //console.log(response);
                    var iconcode = response.list["0"].weather["0"].icon;
                    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                    $('#wicon').attr('src', iconurl);
                    $('#js-weather').text("Weather: " + response.list["0"].weather["0"].main);
                    $('#js-temperature').text("Temperature: " + parseInt(response.list["0"].main.temp) + "°C");
                });

            }).then(function (data) {

                $.getJSON('https://restcountries.eu/rest/v2/all', function (response) {
                    $("#dropDownCountries").empty();
                    //console.log("allcountries", response);
                    //console.log(response);
                    $.each(response, function (key, value) {

                        $("#dropDownCountries").append("<option>" + value.name + "</option>");
                    });

                    $('select[name="drop_down"]').change(function () {
                        var selectedName = $(this).val();
                        //console.log(selectedName);

                        $('#exampleModalLabel').text(selectedName);
                        //$(this).val('none')
                        $.getJSON('https://restcountries.eu/rest/v2/name/' + selectedName + '?fullText=true', function (data) {

                            $('#countrySubmit').val(data["0"].alpha3Code);
                            console.log(data);

                            $('#js-capital').text("Capital: " + data["0"].capital);
                        }).then(function (data) {

                            $.getJSON('https://api.openweathermap.org/data/2.5/find?q=' + data["0"].capital + '&units=metric&APPID=' + apiKey, function (response) {
                                console.log(response);
                                var iconcode = response.list["0"].weather["0"].icon;
                                var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                                $('#wicon').attr('src', iconurl);
                                $('#js-weather').text("Weather: " + response.list["0"].weather["0"].main);
                                $('#js-temperature').text("Temperature " + parseInt(response.list["0"].main.temp) + "°C");
                            });

                        });
                    });
                });
            });
        },
    });
});