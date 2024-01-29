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
var cities = [];

//on page load, default the weather data

$(window).on("load" , function(){
   
    createCityList();
    fetch(queryURL)
    .then(function(response){
        return response.json();
    })
    .then (function(data){
        createCardData(data);
    //   var cardTitleEle = $(`<h5 class="card-title" id="city">${data.name + "(" + currentDate + ")"}</h5>`);
    //   var cardEle = $(".card-body");
    //   var cardTextTemp = $(`<p class="card-text"  id="temperature">${"Temp : " + data.main.temp}</p>`);
    //   var cardTextWind = $(` <p class="card-text"  id="wind">${"Wind : " + data.wind.speed + " KPH"}</p>`)
    //   var cardTextHumidity = $(`<p class="card-text"  id="humidity">${"Humidity : " + data.main.humidity + "%"}</p>`)
    //   cardEle.append(cardTitleEle);
    //   cardEle.append(cardTextTemp);
    //   cardEle.append(cardTextWind);
    //   cardEle.append(cardTextHumidity);
       
     // $("#city").text(data.name + "(" + currentDate + ")");
    // $("#temperature").text("Temp : " + data.main.temp);
    // $("#wind").text("Wind : " + data.wind.speed + " KPH")
    //$("#humidity").text("Humidity : " + data.main.humidity + "%")

    }) 
})

//this function handles events where search button is clicked
$(".search-button").on("click", onClickSearch);

function onClickSearch(event){

    //clear the list and rebuild
    $("#history").empty();
    event.preventDefault();
    var cityInput = $("#search-input").val().trim() ||  $("#search-input").attr("placeholder");
    
    alert(cityInput);
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
                cities.push(cityObj)
                localStorage.setItem("cityname", JSON.stringify(cities));    
                createCityList();
                createCardData(data);
            }
        })
       
    }
}

function createCityList()
{
   
    cities = JSON.parse(localStorage.getItem("cityname")) || [];
    queryURL = api.url + defaultCity + "&appid=" + api.key;

    for(let i=0 ; i <= cities.length; i++)
    {
      $("#history").append($(` <button type="submit" class="rounded-3 form-control btn bg-primary text-white  d-block p-2">${cities[i].name}</button>`));
    }
}

function createCardData(data)
{
    console.log("data" + data);
    var cardEle = $(".card-body");
    $(".card-body").empty();
    var longitude = data.coord.lon;
    var latitude = data.coord.lat;
    var queryForecastURL = api.forecasturl + latitude+ "&lon="+ longitude + "&appid=" + api.key;
    var cardTitleEle = $(`<h5 class="card-title" id="city">${data.name + " (" + currentDate + ")"}</h5>`);
    var cardTextTemp = $(`<p class="card-text"  id="temperature">${"Temp : " + data.main.temp}</p>`);
    var cardTextWind = $(` <p class="card-text"  id="wind">${"Wind : " + data.wind.speed + " KPH"}</p>`)
    var cardTextHumidity = $(`<p class="card-text"  id="humidity">${"Humidity : " + data.main.humidity + "%"}</p>`)
    cardEle.append(cardTitleEle);
    cardEle.append(cardTextTemp);
    cardEle.append(cardTextWind);
    cardEle.append(cardTextHumidity);

    fetch(queryForecastURL)
    .then(function(response){
        return response.json();
    })
    .then (function(forecastdata){
        console.log( forecastdata);

    })
}

function createSearchList()
{
    
}


