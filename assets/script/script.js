const api = {
    key : "388ac79e9a4d29966a74b4b19f53f87c",
    url : "https://api.openweathermap.org/data/2.5/weather?q=",
    forecasturl : "https://api.openweathermap.org/data/2.5/forecast?lat="
}

const cityInput = $("#search-input");
const searchButton = $(".search-button");
const todaySection = $("#today");
const forecastSection = $("#forecast");
var queryURL;
const currentDate = dayjs().format("DD/MM/YYYY");
var defaultCity = cityInput.attr("placeholder");
var citiesArr = [];

//on page load, default the weather data

$(window).on("load" , function(){
   
    buildLocationSearchList();
    fetch(queryURL)
    .then(function(response){
        return response.json();
    })
    .then (function(data){
        getWeatherForCurrentDay(data);
    }) 
})

//this function handles events where search button is clicked
//$(".search-button").on("click", onClickSearch($(".search-button").text()));
$(".search-button").on("click", onClickSearch);

function onClickSearch(event){
    event.preventDefault();

    //clear the list and rebuild
    $("#history").empty();

   var cityInput = $("#search-input").val().trim() ||  $("#search-input").attr("placeholder");
    
    if(cityInput != '')
    {
        queryURL = api.url + cityInput + "&appid=" + api.key;

        fetch(queryURL)
        .then(function(response){
            return response.json();
        })
        .then (function(data){
            
            if(data.cod ===200)
            {   
                let cityObj ={
                    name : cityInput
                }
                //add the city just searched to the local storage
               
                citiesArr.push(cityObj)
               // citiesArr = jQuery.unique(citiesArr);
                saveCity();

                //reload the search history
                buildLocationSearchList();
               
                getWeatherForCurrentDay(data);
            }
        })
       
    }
}

function saveCity(){
    localStorage.setItem("cityname", JSON.stringify(citiesArr)); 
}

function buildLocationSearchList()
{
   
    citiesArr = JSON.parse(localStorage.getItem("cityname")) || [];
    queryURL = api.url + defaultCity + "&appid=" + api.key;

    $.each(citiesArr, function(index, item)
    {
        $("#history").append($(`<button type="submit" id="city" class="rounded-3 search-button form-control btn bg-primary text-white d-block p-2">${item.name}</button>`));
        $("#"+ response.name).on("click", function(event){
            event.preventDefault();
            var cityName = index;

           // getWeatherForCurrentDay(cityname, "existng");
        })

        
    })

    //bind the click event to button
}

function getWeatherForCurrentDay(responsedata)
{
    
    var cardEle = $(".card-body");
    $(".card-body").empty();
    var longitude = responsedata.coord.lon;
    var latitude = responsedata.coord.lat;
    var queryForecastURL = api.forecasturl + latitude+ "&lon="+ longitude + "&appid=" + api.key;
    var temp = (responsedata.main.temp - 273.15) * 1.80 + 32;
    //display today weather
    var cardTitleEle = $(`<h5 class="card-title" id="city">${responsedata.name + " (" + currentDate + ")"}</h5>`);
    var cardTextTemp = $(`<p class="card-text"  id="temperature">${"Temp : " + temp.toFixed() + " C"}</p>`);
    var cardTextWind = $(` <p class="card-text"  id="wind">${"Wind : " + responsedata.wind.speed + " KPH"}</p>`)
    var cardTextHumidity = $(`<p class="card-text"  id="humidity">${"Humidity : " + responsedata.main.humidity + "%"}</p>`)
    cardEle.append(cardTitleEle);
    cardEle.append(cardTextTemp);
    cardEle.append(cardTextWind);
    cardEle.append(cardTextHumidity);

    fetch(queryForecastURL)
    .then(function(response){
        return response.json();
    })
    .then (function(forecastdata){
        console.log( "inside 2nd api" + forecastdata);
  
        console.log(queryForecastURL);
    })
}




