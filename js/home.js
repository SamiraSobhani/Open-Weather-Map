$(document).ready(function () {
    todayWeather();
    fiveDaysFoecast()
});

function todayWeather() {

    $('#getWeather').click(function (event) {
        $.ajax({
            type: 'Get',
            url: 'http://api.openweathermap.org/data/2.5/weather?APPID=f96b8ac8d36f6a9b8cd528ffd4509559&zip=' + $('#addZipCode').val(),
            success: function (data, status) {
                $('#cityName').append(data.name);
                var icon=data.weather[0]["icon"];
                var myUrl='<img src='+'"http://openweathermap.org/img/wn/'+(icon)+'@2x.png">'
                $('#img').append(myUrl);
                $('#description').append(data.weather[0]["description"]);
                $('#temperature').append(data.main.temp);
                $('#humidity').append(data.main.humidity);
                $('#wind').append(data.wind.speed);
            },
            error: function () {
                $('#errorMessages')
                    .append($('<li>')
                        .attr({class: 'list-group-item list-group-item-danger'})
                        .text('Error calling web service. Please try again later.'));
            }
        })

    });
}


function fiveDaysFoecast() {


    $('#getWeather').click(function (event) {
        $.ajax({
            type: 'Get',
            url: 'http://api.openweathermap.org/data/2.5/forecast?APPID=f96b8ac8d36f6a9b8cd528ffd4509559&zip=' + $('#addZipCode').val(),
            success: function (forecastArray) {

                setFiveDays();
                forecastList = forecastArray.list.slice(1, 6);

                $.each(forecastList, function (index, data) {
                    var icon=data.weather[0]["icon"];
                    var myUrl='<td>'+'<img src='+'"http://openweathermap.org/img/wn/'+(icon)+'@2x.png">'+'</td>'
                    var description = data.weather[0]["description"];
                    var tempMin = data.main.temp_min;
                    var tempMax = data.main.temp_max;
                    var column = '<td>'+'<br>'+description + '<br>'+'<br>'+ 'H' + '' + tempMax + '' + 'F' + '' + 'L' + '' + tempMin + '' + 'F' + '</td>';
                    $('#fiveDaysForecast').append(column);
                    $('#daysImg').append(myUrl);



                })

            },
            error: function () {
                $('#errorMessages')
                    .append($('<li>')
                        .attr({class: 'list-group-item list-group-item-danger'})
                        .text('Error calling web service. Please try again later.'));
            }
        })

    });

}


function setFiveDays() {
    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    var i;

    for (i= 1; i < 6; i++) {
        var myDay = new Date();
        myDay.setDate(myDay.getDate() + i);
        var month = monthNames[myDay.getMonth()];
        var dd = String(myDay.getDate()).padStart(2, '0');

        var myDate ='<th>'+ dd + ' ' + month+'</th>';
        console.log(myDate);
        $('#myDay').append(myDate);
    }
}





