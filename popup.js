var apiKey = 'd0180566f7cdc1febbd69f5372381329';

function getWeather() {
  var out = document.getElementById('weather-result');
  out.textContent = 'Locating…';

  if (!navigator.geolocation) {
    out.textContent = 'Geolocation not supported';
    return;
  }

  navigator.geolocation.getCurrentPosition(function(pos) {
    var lat = pos.coords.latitude;
    var lon = pos.coords.longitude;
    out.textContent = 'Fetching weather…';

    var url = 'https://api.openweathermap.org/data/2.5/weather'
      + '?lat=' + lat
      + '&lon=' + lon
      + '&units=metric'
      + '&appid=' + apiKey;

    fetch(url)
      .then(function(res) { return res.json(); })
      .then(function(data) {
        out.innerHTML = '<strong>' + data.name + '</strong><br>'
                      + data.main.temp.toFixed(1) + '°C, '
                      + data.weather[0].description;
      })
      .catch(function() {
        out.textContent = 'Error fetching weather';
      });
  }, function() {
    out.textContent = 'Permission denied';
  });
}

document.getElementById('get-weather').onclick = getWeather;
