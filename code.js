function SetTime() {
    var d = new Date()
    minutes = d.getMinutes().toString().length == 1 ? '0' + d.getMinutes() : d.getMinutes()
    hours = d.getHours().toString().length == 1 ? '0' + d.getHours() : d.getHours()
    return days = hours + ':' + minutes;
}
function findCurrentDayOfWeek() {
    var d = new Date()
    day = d.getDay()
    let daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
    return daysOfWeek[day]

}

function showLocation(position) {
    return position
}

function setCurrentLocationData(position) {
    APIKEY = '8c15cb19dbc355d25ae5c4e0e088ede4'
    //api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
    ApiLatLonRequestURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${APIKEY}&units=imperial`
    console.log(ApiLatLonRequestURL)
    $.getJSON(ApiLatLonRequestURL, function (data) {
        LocationData = data
        let fourdays = ['9', '19', '29', '39']
        for (i in fourdays) {
            DAY = fourdays[i]
            document.getElementById(`Day${DAY}Weather`).innerHTML = String(LocationData.list[DAY].weather[0].main);
            if (LocationData.list[DAY].weather[0].main == 'Clear') {
                document.getElementById(`Day${DAY}WeatherIMG`).src = "IMG/Clear.png";
            } else if (LocationData.list[DAY].weather[0].main == 'Rain') {
                document.getElementById(`Day${DAY}WeatherIMG`).src = "IMG/Rain.png";
            } else if (LocationData.list[DAY].weather[0].main == 'Clouds') {
                document.getElementById(`Day${DAY}WeatherIMG`).src = "IMG/Clouds.png";
            } else {
                console.log('we couldnt find anything captain')
            }
        }

        //GOES THROUGH MAIN STATS
        console.log(LocationData.list[DAY].weather[0].main)
        document.getElementById("MainICON").setAttribute("src", `IMG/${LocationData.list[0].weather[0].main}.png`)
        document.getElementById("LOC").innerHTML = `${position.coords.latitude}, ${position.coords.longitude} (you)`
        document.getElementById("TEMPATURED").innerHTML = ' ' + String(parseInt(LocationData.list[0].main.temp)) + '°F'
        document.getElementById("CURRENTWEATHER").innerHTML = String(LocationData.list[0].weather[0].description).replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
        document.getElementById("HUMIDITY").innerHTML = String(parseInt(LocationData.list[0].main.humidity))
        document.getElementById("WINDINESS").innerHTML = String(parseInt(LocationData.list[0].wind.speed))
        document.getElementById("ChanceOfRain").innerHTML = (String(LocationData.list[0].pop * 100)).substr(0, 3)

        TimeAPIKey = 'RS44HE9ZFROS'
        TimeApiURL = `http://api.timezonedb.com/v2.1/get-time-zone?by=position&lat=${LocationData.city.coord.lat}&lng=${LocationData.city.coord.lon}&key=${TimeAPIKey}&format=json`
        fetch(TimeApiURL).then((response) => response.json()).then((data) =>
            document.getElementById("currentTimes").innerHTML = findCurrentDayOfWeek() + data.formatted.substr(10, 6) + ' ' + data.abbreviation
        )
    });

}



function FirstLoadCurrentData() {
    //set current day of week and time
    document.getElementById("currentTimes").innerHTML = findCurrentDayOfWeek() + ' ' + SetTime()

    //future days of week
    let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let fourdays = ['9', '19', '29', '39']
    var dayofweek = new Date()
    theday = dayofweek.getDay()
    theday = theday + 1
    for (i in fourdays) {
        theday = theday + 1
        nextdayofweek = daysOfWeek[theday]
        document.getElementById(`DayOfWeek${fourdays[i]}`).innerHTML = nextdayofweek;

        navigator.geolocation.getCurrentPosition(setCurrentLocationData);


    }
}


FirstLoadCurrentData()

function change_temp() {
    var thetemp = document.getElementById("TEMPATURED").innerHTML;
    tempCURRENT = thetemp.replace(/\D/g, '');
    console.log('START :' + thetemp + ' AFTER: ' + tempCURRENT)
    var button = document.getElementById("TEMPBUTTON");

    if (thetemp.substr(thetemp.length - 1) == 'F') {
        var Ctemp = math.round((Number(tempCURRENT) - 32) * .5556);
        console.log('CONVERSION IS' + Ctemp)
        button.innerHTML = 'C';
        document.getElementById("TEMPATURED").innerHTML = ' ' + Ctemp + '°C';
    } else {
        var Ftemp = math.round((Number(tempCURRENT) * 1.8) + 32)
        button.innerHTML = 'F';
        document.getElementById("TEMPATURED").innerHTML = ' ' + Ftemp + '°F';
    }
}





function newloc() {
    ClientInputLoc = document.getElementById("input_loc").value.toLowerCase()
    APIKEY = '8c15cb19dbc355d25ae5c4e0e088ede4'
    ApiLatLonRequestURL = `https://api.openweathermap.org/data/2.5/forecast?q=${ClientInputLoc}&appid=${APIKEY}&units=imperial`
    //ApiLatLonRequestURL = `https://api.openweathermap.org/data/2.5/weather?q=${ClientInputLoc}&appid=${APIKEY}&units=imperial`
    $.getJSON(ApiLatLonRequestURL, function (data) {
        LocationData = data
        console.log(LocationData)
        let fourdays = ['9', '19', '29', '39']
        for (i in fourdays) {
            DAY = fourdays[i]
            document.getElementById(`Day${DAY}Weather`).innerHTML = String(LocationData.list[DAY].weather[0].main);
            if (LocationData.list[DAY].weather[0].main == 'Clear') {
                document.getElementById(`Day${DAY}WeatherIMG`).src = "IMG/Clear.png";
            } else if (LocationData.list[DAY].weather[0].main == 'Rain') {
                document.getElementById(`Day${DAY}WeatherIMG`).src = "IMG/Rain.png";
            } else if (LocationData.list[DAY].weather[0].main == 'Clouds') {
                document.getElementById(`Day${DAY}WeatherIMG`).src = "IMG/Clouds.png";
            } else {
                console.log('we couldnt find anything captain')
            }
        }

        //UPDATES STATS
        console.log(LocationData.list[0].weather[0].main)
        document.getElementById("MainICON").setAttribute("src", `IMG/${LocationData.list[0].weather[0].main}.png`)
        document.getElementById("LOC").innerHTML = ClientInputLoc.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
        if (document.getElementById("TEMPBUTTON").innerHTML == 'F') { document.getElementById("TEMPATURED").innerHTML = ' ' + String(parseInt(LocationData.list[0].main.temp)) + '°F' }
             else { document.getElementById("TEMPATURED").innerHTML = ' ' + math.round((Number(parseInt(LocationData.list[0].main.temp)) - 32) * .5556) + '°C' }
        document.getElementById("CURRENTWEATHER").innerHTML = String(LocationData.list[0].weather[0].description).replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
        document.getElementById("HUMIDITY").innerHTML = String(parseInt(LocationData.list[0].main.humidity))
        document.getElementById("WINDINESS").innerHTML = String(parseInt(LocationData.list[0].wind.speed))
        document.getElementById("ChanceOfRain").innerHTML = (String(LocationData.list[0].pop * 100)).substr(0, 3)

        TimeAPIKey = 'RS44HE9ZFROS'
        TimeApiURL = `http://api.timezonedb.com/v2.1/get-time-zone?by=position&lat=${LocationData.city.coord.lat}&lng=${LocationData.city.coord.lon}&key=${TimeAPIKey}&format=json`
        fetch(TimeApiURL).then((response) => response.json()).then((data) =>
            document.getElementById("currentTimes").innerHTML = findCurrentDayOfWeek() + data.formatted.substr(10, 6) + ' ' + data.abbreviation
        )
    });
}

function openPopUpForecast(e) {
    g = 0
    while (g < 5) {
        g++
        console.log(document.getElementById(`Popup${g}`) + ' is ' + g)
        RemoveClasses = document.getElementById(`Popup${g}`)
        RemoveClasses.classList.remove("openWeatherPopup")
        console.log(g + 'is')
        document.getElementById(`ForeCastCard${g}`).style.backgroundColor = ``;
        document.getElementById(`forecastBtn${g}`).setAttribute("onClick", "openPopUpForecast(this)")
    }
    console.log('I WAS RAN 2')
    popup = document.getElementById(`Popup${e.value}`)
    popup.classList.add("openWeatherPopup")
    document.getElementById(`forecastBtn${e.value}`).setAttribute("onClick", "closePopUpForecast(this)")
    document.getElementById(`ForeCastCard${e.value}`).style.backgroundColor = `#0dcaf042`;
}

function closePopUpForecast(e) {
    g = 0
    while (g < 5) {
        g++
        console.log(document.getElementById(`forecastBtn${g}`) + ' is ' + g)
        RemoveClasses = document.getElementById(`forecastBtn${g}`)
        document.getElementById(`forecastBtn${g}`).setAttribute("onClick", "openPopUpForecast(this)")
        console.log(g + 'is')
    }
    document.getElementById(`ForeCastCard${e.value}`).style.backgroundColor = ``
    console.log(e.value + ' - 2')
    popup.classList.remove("openWeatherPopup")
    document.getElementById(`forecastBtn${e.value}`).setAttribute("onClick", "openPopUpForecast(this)")

}
