var apiKey = '9379b40dea2a6d930a04b31663b3083f'; //Weather API Key
var cityName = 'london';
var coordRequestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=5&appid=9379b40dea2a6d930a04b31663b3083f';
var dateEls = document.querySelectorAll('.dateEl');
var tempEls = document.querySelectorAll('.tempEl');
var humidityEls = document.querySelectorAll('.humidEl');
var windEls = document.querySelectorAll('.windEl');
var searchBtn = document.querySelector('#searchBtn');
var cityEl = document.querySelector('#cityEl');
// var requestUrl = 'api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=9379b40dea2a6d930a04b31663b3083f'

// 4 12 20 28 36
searchBtn.addEventListener('click', function () {
  var city = document.querySelector('input').value
  var coRequestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=5&appid=9379b40dea2a6d930a04b31663b3083f';



  fetch(coRequestUrl)
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
          cityEl.textContent = 'Upcoming Weather in ' + data.city.name;
          for (i = 4; i < 37; i += 8) {
            document.getElementById(`temp${i}`).textContent = 'Temp: ' + data.list[i].main.temp;;
            document.getElementById(`date${i}`).textContent = data.list[i].dt_txt;
            document.getElementById(`humid${i}`).textContent = 'Humidity: ' + data.list[i].main.humidity;
            document.getElementById(`wind${i}`).textContent = 'Wind Speed: ' + data.list[i].wind.speed;
          };
          // tempEls[0].textContent = 'Temp: ' + Math.floor(data.list[4].main.temp);
          // dateEls[0].textContent = data.list[4].dt_txt;
          // windEls[0].textContent = 'Wind Speed: ' + data.list[4].wind.speed;
          // humidityEls[0].textContent = 'Humidity: ' + data.list[4].main.humidity;
          // tempEls[1].textContent = 'Temp: ' + Math.floor(data.list[12].main.temp);
          // dateEls[1].textContent = data.list[12].dt_txt;
          // windEls[1].textContent = 'Wind Speed: ' + data.list[12].wind.speed;
          // humidityEls[1].textContent = 'Humidity: ' + data.list[12].main.humidity;
          // tempEls[2].textContent = 'Temp: ' + Math.floor(data.list[20].main.temp);
          // dateEls[2].textContent = data.list[20].dt_txt;
          // windEls[2].textContent = 'Wind Speed: ' + data.list[20].wind.speed;
          // humidityEls[2].textContent = 'Humidity: ' + data.list[20].main.humidity;
          // tempEls[3].textContent = 'Temp: ' + Math.floor(data.list[28].main.temp);
          // dateEls[3].textContent = data.list[28].dt_txt;
          // windEls[3].textContent = 'Wind Speed: ' + data.list[28].wind.speed;
          // humidityEls[3].textContent = 'Humidity: ' + data.list[28].main.humidity;
          // tempEls[4].textContent = 'Temp: ' + Math.floor(data.list[36].main.temp);
          // dateEls[4].textContent = data.list[36].dt_txt;
          // windEls[4].textContent = 'Wind Speed: ' + data.list[36].wind.speed;
          // humidityEls[4].textContent = 'Humidity: ' + data.list[36].main.humidity;
        })
        .catch(function (error) {
          console.log(error);
        });
    })
    .catch(function (error) {
      console.log(error);
    });

});