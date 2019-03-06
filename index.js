window.onload = function () {
  getWeather()
}

const apiKey = '3317ddd89ed0eaa04733ad6ab3569291'

let unit = document.getElementById('temp-unit').value

const docMainBody = {
  city: document.getElementById('location'),
  date: document.getElementById('date'),
  temp: document.getElementById('temp'),
  desc: document.getElementById('weather-desc'),
  icon: document.getElementById('icon'),
  unitId: document.getElementById('unit')
}

const button = document.querySelector('button')
button.addEventListener("click", getZipFunc)

const unitChange = document.querySelector('select')
unitChange.onchange = changeHandler
