$(document).ready(function () {
  // api key

  var key = "2b7e94c082981cf991432987e4fd3482";
  // event listener for serach button
  $("#search-button").on("click", function () {
    event.preventDefault()
    var searchValue = $("#search").val().trim();
    searchWeather(searchValue)
    // forecast(searchValue)

    // $("#history li").on("click", function () {
    //     searchWather()
    // }) 
  })

  function searchWeather(sv) {
    // api address
    $.ajax({
      url: `https://api.openweathermap.org/data/2.5/weather?q=${sv}&units=imperial&APPID=${key}`,
      success: function (data) {
        console.log(data);

        $("#today").empty()
        var title = $("<h3>").addClass("card-title");
        var card = $("<div>").addClass("card");
        var wind = $("<p>").addClass("card-text").text(`windspeed:${data.wind.speed}`);
        var humid = $("<p>").addClass("card-text").text(`humidity:${data.main.humidity}`);
        var temp = $("<p>").addClass("card-text").text(`temp:${data.main.temp}`);
        var img = $("<img>").attr("src", ``)
        var cardBody = $("<div>").addClass("card-body");

        title.append(img)
        cardBody.append(title, temp, humid, wind)
        card.append(cardBody)
        $("#today").append(card)
        // uvIndex(lat, long)
        // weatherImg.atter(img)

        foreCast(sv)
      }
    })
  }

  function foreCast(sv) {
    $.ajax({
      url: `https://api.openweathermap.org/data/2.5/forecast/?q=${sv}&cnt=5&appid=${key}`,
      success: function (data) {
        console.log(data);

        var lat = data.city.coord.lat
        var lon = data.city.coord.lon
        uvIndex(lat, lon)
        console.log(lat);
        console.log(lon);
        // here we'll put in the code to fill in the DIVS in the HTML   


      }
    })
  }

  function uvIndex(lat, lon) {
    $.ajax({
      url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&cnt=5&appid=${key}&units=imperial`,
      success: function (data) {
        console.log(data);

        for (let i = 1; i < data.daily.length - 2; i++) {
          let day = moment.unix(data.daily[i].dt).format('Do');
          console.log(day);

        }

        // here's the code to fill in the uv index part of themain weather card

      }
    })
  }
})

//         }
//     })
// }
// fetch("http://api.openweathermap.org/data/2.5/forecast/daily?q=" + sv + `cnt=5&appid=${key}`, {
//         // mode: "no-cors"
//     })
//     .then(response => response.json())
//     .then(res => console.log(res))