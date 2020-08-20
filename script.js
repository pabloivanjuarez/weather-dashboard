// place api key below
var key = "";

$(document).ready(function () {

    $("#search-button").on("click", fucntion() {

        var searchValue = $("#search").val().trim();
        sear
    })

    // $("#history li").on("click", function(){

    // searchWather()

    // })

    function searchWeather(searchValue) {
        // api adress
        $.ajax({
            "" + searchValue + `&appid=${key}`,
            success: function (data) {

                console.log(data)
                $("#today").empty()
                var title = $("<h3>").addClass("card-title");
                var card = $("<div>").addClass("card");
                var wind = $("<p>").addClass("card-text").text(`windspeed:${data.wind.speed}`);
                var wind = $("<p>").addClass("card-text").text(`humidity:${data.wind.humidity}`);
                var wind = $("<p>").addClass("card-text").text(`temp:${data.wind.temp}`);
                var img = $("<img>").attr("src", ``)
                var cardBody = $("<div>").addClass("card-body");

                title.append(img)
                cardBody.append(title, temp, humid, wind)
                card.append(cardBody)
                $("#today").append(card)
                getForeCast(searchValue)

            }
        })

    }

    fetch("" + searchValue + `&appid=${key}`)
        .then(response => response.json())
        .then(res + > console.log(response))



    function getForeCast(searchValue) {

    }

})