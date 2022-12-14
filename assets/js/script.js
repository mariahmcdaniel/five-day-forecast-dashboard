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
var prevSearches = JSON.parse(localStorage.getItem('cities'));
var displayHistory = function () {
  if (prevSearches != null) {
    for (var search of prevSearches) {
      var histBtn = document.createElement('button');
      histBtn.textContent = search;
      histBtn.setAttribute('class', 'searchHistory');
      document.getElementById('btnsDiv').appendChild(histBtn);
    }
  }
}

displayHistory();

var btnsDiv = document.getElementById('btnsDiv');
btnsDiv.addEventListener('click', function (event) {
  var clicked = event.target;

})

searchBtn.addEventListener('click', function () {
  var city = document.querySelector('input').value
  var coRequestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=5&appid=9379b40dea2a6d930a04b31663b3083f';

  var saveSearch = function (userInput) {
    if (prevSearches !== null) {
      prevSearches.push(userInput);
      localStorage.setItem('cities', JSON.stringify(prevSearches));
      displayHistory();
    } else {
      prevSearches = [userInput];
      localStorage.setItem('cities', JSON.stringify(prevSearches));
      displayHistory();
    }
  }
  saveSearch(city);


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
          for (var i = 4; i < 37; i += 8) {
            document.getElementById(`temp${i}`).textContent = 'Temp: ' + data.list[i].main.temp;;
            document.getElementById(`date${i}`).textContent = data.list[i].dt_txt;
            document.getElementById(`humid${i}`).textContent = 'Humidity: ' + data.list[i].main.humidity;
            document.getElementById(`wind${i}`).textContent = 'Wind Speed: ' + data.list[i].wind.speed;
          };
        })
        .catch(function (error) {
          console.log(error);
        });
    })
    .catch(function (error) {
      console.log(error);
    });

});