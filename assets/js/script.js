var apiKey = '9379b40dea2a6d930a04b31663b3083f'; //Weather API Key
var cityName = 'london';
var coordRequestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=5&appid=9379b40dea2a6d930a04b31663b3083f';
var dateEls = document.querySelectorAll('.dateEl');
var tempEls = document.querySelectorAll('.tempEl');
var humidityEls = document.querySelectorAll('.humidEl');
var windEls = document.querySelectorAll('.windEl');
// var requestUrl = 'api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=9379b40dea2a6d930a04b31663b3083f'

// 4 12 20 28 36

fetch(coordRequestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var lat = data[0].lat;
    var lon = data[0].lon;
    var requestUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=9379b40dea2a6d930a04b31663b3083f';
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        console.log(data.list[4].dt_txt);
        console.log(data.list[4].main.temp);
        console.log(data.list[12].dt_txt);
        console.log(data.list[12].main.temp);
        console.log(data.list[20].dt_txt);
        console.log(data.list[20].main.temp);
        console.log(data.list[28].dt_txt);
        console.log(data.list[28].main.temp);
        console.log(data.list[36].dt_txt);
        console.log(data.list[36].main.temp);
        tempEls[0].textContent = Math.floor(data.list[4].main.temp);
        dateEls[0].textContent = data.list[4].dt_txt;
        tempEls[1].textContent = Math.floor(data.list[12].main.temp);
        dateEls[1].textContent = data.list[12].dt_txt;
        tempEls[2].textContent = Math.floor(data.list[20].main.temp);
        dateEls[2].textContent = data.list[20].dt_txt;
        tempEls[3].textContent = Math.floor(data.list[28].main.temp);
        dateEls[3].textContent = data.list[28].dt_txt;
        tempEls[4].textContent = Math.floor(data.list[36].main.temp);
        dateEls[4].textContent = data.list[36].dt_txt;
      })
      .catch(function (error) {
        console.log(error);
      });
  })
  .catch(function (error) {
    console.log(error);
  });

