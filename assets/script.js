$(document).ready(function () {
  // api key
  var key = "2b7e94c082981cf991432987e4fd3482";
  // saved search array
  let searchHistory = [];

  // event listener for serach button
  $("#search-button").on("click", function () {
    event.preventDefault()
    $(".forecast").empty()
    var searchValue = $("#search").val().trim();
    searchWeather(searchValue)
    // forecast(searchValue)
    previousCityBtn(searchValue)
    // $("#history li").on("click", function () {
    //     searchWather()
    // }) 
  })

  function previousCityBtn(sv) {
    let button = $("<button>");

    button.addClass("list-group history");

    button.attr("type", "button");

    button.text(sv).val(sv);

    $(".list-group").prepend(button);
  }

  function searchWeather(sv) {
    // api address
    $.ajax({
      url: `https://api.openweathermap.org/data/2.5/weather?q=${sv}&units=imperial&APPID=${key}`,
      success: function (data) {
        console.log(data);

        $("#today").empty()
        // creating elements/scoping data
        var title = $("<h3>").addClass("card-title").text(`${data.name}`);
        var card = $("<div>").addClass("card");
        var wind = $("<p>").addClass("card-text").text(`windspeed:${data.wind.speed}` + "MPH ");
        var humid = $("<p>").addClass("card-text").text(`humidity:${data.main.humidity.toFixed()}` + "%");
        var temp = $("<p>").addClass("card-text").text(`temp:${data.main.temp.toFixed()}` + "°F");
        let imgAdd = "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
        var img = $("<img>").attr("src", imgAdd);
        var cardBody = $("<div>").addClass("card-body");
        var latt = data.coord.lat;
        var lonn = data.coord.lon;

        // filled handlers added to dom
        title.append(img)
        cardBody.append(title, temp, humid, wind)
        card.append(cardBody)
        $("#today").append(card)

        // coordinates for next API call
        foreCast(latt, lonn)
      }
    })
  }

  function foreCast(latt, lonn) {
    $.ajax({
      url: `https://api.openweathermap.org/data/2.5/onecall?lat=${latt}&lon=${lonn}&cnt=5&appid=${key}&units=imperial`,
      success: function (data) {
        console.log(data);
        var lat = data.lat
        var lon = data.lon
        uvIndex(lat, lon)
        // here we'll put in the code to fill in the DIVS in the HTML   
        for (let i = 1; i < data.daily.length - 2; i++) {
          let day = moment.unix(data.daily[i].dt).format('MMMM Do');
          console.log(day);

          // $(".forecast").empty()
          // var title = $("<h3>").addClass("card-title").text(`${data.name}`);
          var card = $("<div>").addClass("card");
          var humid = $("<p>").addClass("card-text").text("humidity: " + (data.daily[i].humidity) + "%");
          var tempH = $("<p>").addClass("card-text").text("HIGH: " + data.daily[i].temp.max.toFixed() + "°F");
          var tempL = $("<p>").addClass("card-text").text("LOW: " + data.daily[i].temp.min.toFixed() + "°F");
          let imgAdd = "https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + ".png";
          var imgDiv = $("<img>").attr("src", imgAdd);
          var cardBody = $("<div>").addClass("card-body");
          // $("#forecast").append(card)
          cardBody.append(day, imgDiv, tempH, tempL, humid)
          card.append(cardBody)

          $(".forecast").append(card)

        }

      }
    })
  }

  function uvIndex(lat, lon) {
    $.ajax({
      url: `https://api.openweathermap.org/data/2.5/uvi/forecast?lat=${lat}&lon=${lon}&appid=${key}`,
      success: function (data) {
        console.log(data);
        var uvI = $("<p>").addClass("card-text").text(`UV Index:${data[0].value}`);
        console.log(uvI);
        $("#today").append(uvI)

        // here's the code to fill in the uv index part of the main weather card

      }
    })
  }
})