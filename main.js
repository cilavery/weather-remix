window.onload = function() {
  getWeather()
}

const apiKey = '3317ddd89ed0eaa04733ad6ab3569291'

let unit = 'imperial'
let day = 'night' // use ternary to set to 'night' or '' based on time
let city = document.getElementById('location')
let date = document.getElementById('date')
let temp = document.getElementById('temp')
let desc = document.getElementById('weather-desc')
let icon = document.getElementById('icon')
let unitId = document.getElementById('unit')

getWeather = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      fetchWeather(position.coords.latitude, position.coords.longitude);
    })
  }
}

fetchWeather = (lat, lon) => {
  fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`)
    .then(response => {
      return response.json()
    })
    .then(myJson => {
      const cityJson = myJson.name
      const tempJson = Math.round(myJson.main.temp)
      const weatherJson = myJson.weather[0] //array
      setMainBody(cityJson, tempJson, weatherJson)
    })
}

setMainBody = (cityJson, tempJson, weatherJson) => {
  date.innerText = new Date().toDateString()
  city.innerText = cityJson
  temp.innerText = tempJson
  desc.innerText = weatherJson.description
  icon.className = `wi-owm-${weatherJson.id}`
  unitId.innerText = 'imperial' ? 'º F' : 'º C'
}
