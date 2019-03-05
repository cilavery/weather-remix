window.onload = function () {
  getWeather()
}

const apiKey = '3317ddd89ed0eaa04733ad6ab3569291'
let today = new Date()
let unit = 'imperial'

const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']

const docMainBody = {
  city: document.getElementById('location'),
  date: document.getElementById('date'),
  temp: document.getElementById('temp'),
  desc: document.getElementById('weather-desc'),
  icon: document.getElementById('icon'),
  unitId: document.getElementById('unit')
}

getWeather = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      fetchCurrentWeather(position.coords.latitude, position.coords.longitude)
      fetchForecastWeather(position.coords.latitude, position.coords.longitude)
    })
  }
}

fetchCurrentWeather = (lat, lon) => {
  fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`)
    .then(response => {
      return response.json()
    })
    .then(myJson => {
      const cityJson = myJson.name
      const tempJson = myJson.main.temp
      const weatherJson = myJson.weather[0]
      const sunlight = {}
      sunlight.sunrise = myJson.sys.sunrise
      sunlight.sunset = myJson.sys.sunset
      setTemp(docMainBody, { cityJson, tempJson, weatherJson, sunlight })
    })
}

fetchForecastWeather = (lat, lon) => {
  fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`)
    .then(response => {
      return response.json()
    })
    .then(myJson => {
      parseFiveDay(myJson.list)
    })
}

setTemp = (doc, { cityJson, tempJson, weatherJson, sunlight, dayOfWeek }) => {
  let day
  sunlight ? (day = (today.getTime() > sunlight.sunrise) && (today.getTime() > sunlight.sunset) ? 'day' : 'night') : day = null
  doc.date.innerText = sunlight ? today.toDateString() : daysOfWeek[new Date(dayOfWeek * 1000).getDay()]
  doc.city.innerText = typeof cityJson !== 'undefined' ? cityJson : null
  doc.temp.innerText = Math.round(tempJson)
  doc.desc.innerText = weatherJson.description
  doc.icon.className = `wi wi-owm-${day ? day + '-' : ''}${weatherJson.id}`
  doc.unitId.innerText = 'imperial' ? 'º F' : 'º C'
}

/* 5-DAY FORECAST */
parseFiveDay = (arr) => {
  let fiveDays = arr.filter(forecast => {
    return (today.getDate() !== new Date(forecast.dt * 1000).getDate()) && (new Date(forecast.dt_txt).getHours() === 9)
  })
  mapFiveDay(fiveDays)
}

mapFiveDay = (arr) => {
  const forecastNode = document.getElementById('five-day')
  arr.forEach(day => {
    let node = document.createElement('div')
    let dayNode = document.createElement('h6')
    dayNode.id = 'date-forecast'
    node.appendChild(dayNode)
    let descNode = document.createElement('div')
    descNode.id = 'weather-desc-forecast'
    node.appendChild(descNode)
    let iconElem = document.createElement('icon')
    iconElem.id = 'icon-forecast'
    node.appendChild(iconElem)
    let tempNode = document.createElement('div')
    tempNode.id = 'temp-forecast'
    node.appendChild(tempNode)
    let unitNode = document.createElement('div')
    unitNode.id = 'unit-forecast'
    node.appendChild(unitNode)
    forecastNode.appendChild(node)
    accessFiveDay(node, day)
  })
}

accessFiveDay = (node, data) => {
  let docForecast = {
    date: node.childNodes[0],
    desc: node.childNodes[1],
    icon: node.childNodes[2],
    temp: node.childNodes[3],
    unitId: node.childNodes[4]
  }
  setTemp(docForecast, { tempJson: data.main.temp, weatherJson: data.weather[0], dayOfWeek: data.dt })
}