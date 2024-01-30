const api = {
    key: "388ac79e9a4d29966a74b4b19f53f87c",
    //url: "https://api.openweathermap.org/data/2.5/weather?q=",
    latlongurl : "http://api.openweathermap.org/geo/1.0/direct?q=",
    forecasturl : "http://api.openweathermap.org/data/2.5/forecast?units=metric&lat=",
    //forecasturl: "https://api.openweathermap.org/data/2.5/forecast?lat=",
  };
  
  const currentDate = dayjs().format("DD/MM/YYYY");
  
  //declare global vars
  var citiesArr = [];
  var longitude; 
  var latitude;
  
 //get user input or default to the placeholder text  
  var cityInput = $("#search-input").val().trim() || $("#search-input").attr("placeholder");

   $(".search-button").on("click", onClickSearch);
  
  //Initialise local storage to hold search history
  citiesArr = JSON.parse(localStorage.getItem("cityname")) || [];
  
  //get the latitude and longitude co-ordinates
  var latlangqueryURL = api.latlongurl + cityInput + "&limit=5&appid=" + api.key;
  
  fetch(latlangqueryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      if (data.length==0) {
          
        $(".city-name").text( "City not found. Please enter a valid city."
        );
        return;
        }
    //assign the search string with the value returned from API
    cityInput = data[0].name;
       
     buildWeatherAPI (data);
    
    });
  
  //   function renderSearchHistory(city)
  //   {
  //     citiesArr = JSON.parse(localStorage.getItem("cityname")) || [];
  //     $.each(citiesArr, function (index, item) {
  //         $("#history").append(
  //           $(
  //             `<button type="submit" id="city" class="rounded-3 search-button form-control btn bg-primary text-white d-block p-2">${item.name}</button>`
  //           )
  //         );
  //       });
  //   }
  
  function buildWeatherAPI(responsedata)
  {
    longitude = responsedata[0].lon;
    latitude = responsedata[0].lat;
    var current = api.forecasturl + latitude + "&lon=" + longitude + "&appid=" + api.key;
    var forecast = api.dailyforecasturl + latitude + "&lon=" + longitude + "&cnt=5" + "&appid=" + api.key;
    console.log( "forecast " + current);
    fetch(current)
    .then (function(response){
        return response.json();
    })
    .then(function(data){
        getCurrentDayWeather(data);
        getWeatherForecast (data);
    })
  }
    
function getCurrentDayWeather(responsedata) {
    $(".card-body").empty();
    var temperature = responsedata.list[0].main.temp;
    var wind = responsedata.list[0].wind.speed;
    var humidity = responsedata.list[0].main.humidity;
    var iconcode = responsedata.list[0].weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    $(".card-body").append( `<div class="d-flex flex-row"><h5 class="card-title" id="city">${ cityInput + " (" + currentDate + ")"}</h5><img id="wicon" src="${iconurl}" alt="Weather icon"></div>` );
    $(".card-body").append(`<p class="card-text"  id="temperature">${ "Temperature : " + temperature + "°C"}</p>` );
    $(".card-body").append(` <p class="card-text"  id="wind">${"Wind : " + wind + " KPH"}</p>`);
    $(".card-body").append( `<p class="card-text"  id="humidity">${"Humidity : " + humidity + "%" }</p>`  );
}

function getWeatherForecast(responsedata)
{
    console.log("inside forecast" + responsedata.list);
}
  
  
  //buildLocationSearchList();
  
  
  //handle events where search button is clicked
    function onClickSearch(event) {
    event.preventDefault();

    //clear the list and rebuild
    $("#history").empty();
    if (cityInput != "") {
    //  latlangqueryURL = api.latlongurl + cityInput + "&limit=5&appid=" + api.key;
      
      fetch(latlangqueryURL)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.length==0) {
            $(".city-name").text( "City not found. Please enter a valid city."
            );
            return;
          }
 
          let cityObj = {
            name: cityInput,
          };
          //add the city just searched to the local storage
          citiesArr.push(cityObj);
  
          saveCity();
  
          //reload the search history
         // buildLocationSearchList();
         buildWeatherAPI (data);
          //getCurrentDayWeather(data);
        });
    }
  }
  /*
  function saveCity() {
    localStorage.setItem("cityname", JSON.stringify(citiesArr));
  }
  
  function buildLocationSearchList() {
    citiesArr = JSON.parse(localStorage.getItem("cityname")) || [];
    queryURL = api.url + defaultCity + "&appid=" + api.key;
  
    $.each(citiesArr, function (index, item) {
      $("#history").append(
        $(
          `<button type="submit" id="city" class="rounded-3 search-button form-control btn bg-primary text-white d-block p-2">${item.name}</button>`
        )
      );
    });
  
    //bind the click event to button
  }
  
  */
  