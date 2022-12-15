var apiKey = '9379b40dea2a6d930a04b31663b3083f'; //Weather API Key
var cityName = 'london';
var coordRequestUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=5&appid=9379b40dea2a6d930a04b31663b3083f';
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
      document.getElementById('btnsContainer').appendChild(histBtn);
    }
  }
}

displayHistory();

var btnsDiv = document.getElementById('btnsDiv');
btnsDiv.addEventListener('click', function (event) {
  var clicked = event.target;
  var city = clicked.textContent;
  var coRequestUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=5&appid=9379b40dea2a6d930a04b31663b3083f';
  fetchWeather(coRequestUrl);
});

var fetchWeather = function (coRequestUrl) {

  fetch(coRequestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var lat = data[0].lat;
      var lon = data[0].lon;
      var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=9379b40dea2a6d930a04b31663b3083f';
      fetch(requestUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          cityEl.textContent = 'Upcoming Weather in ' + data.city.name; + ':'
          var cards = document.querySelectorAll('.weatherCard');
          for (var card of cards) {
            card.classList.remove('hide');
          };
          document.getElementById(`temp0`).textContent = 'Temp: ' + Math.floor(data.list[0].main.temp) + ' °F';
          document.getElementById(`date0`).textContent = data.city.name + ' today (' + data.list[0].dt_txt.slice(0, -9) + '):';
          document.getElementById(`humid0`).textContent = 'Humidity: ' + data.list[0].main.humidity;
          document.getElementById(`wind0`).textContent = 'Wind Speed: ' + data.list[0].wind.speed;
          var icon1 = data.list[0].weather[0].icon;
          document.getElementById(`icon0`).src = 'https://openweathermap.org/img/wn/' + icon1 + '@2x.png';
          for (var i = 7; i < 40; i += 8) {
            document.getElementById(`temp${i}`).textContent = 'Temp: ' + Math.floor(data.list[i].main.temp) + ' °F';
            document.getElementById(`date${i}`).textContent = data.list[i].dt_txt.slice(0, -9);
            document.getElementById(`humid${i}`).textContent = 'Humidity: ' + data.list[i].main.humidity;
            document.getElementById(`wind${i}`).textContent = 'Wind Speed: ' + data.list[i].wind.speed;
            var icon = data.list[i].weather[0].icon;
            document.getElementById(`icon${i}`).src = 'https://openweathermap.org/img/wn/' + icon + '@2x.png';
          };
        })
        .catch(function (error) {
          console.log(error);
        });
    })
    .catch(function (error) {
      console.log(error);
    });
};

searchBtn.addEventListener('click', function () {
  var city = document.querySelector('input').value
  var coRequestUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=5&appid=9379b40dea2a6d930a04b31663b3083f';

  var saveSearch = function (userInput) {
    if (prevSearches !== null) {
      prevSearches.push(userInput);
      localStorage.setItem('cities', JSON.stringify(prevSearches));
    } else {
      prevSearches = [userInput];
      localStorage.setItem('cities', JSON.stringify(prevSearches));
      displayHistory();
    }
  }
  saveSearch(city);
  fetchWeather(coRequestUrl);
});