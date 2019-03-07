describe('getZipFunc function', () => {
  let inputEl
  let testNode
  beforeEach(() => {
    testNode = document.getElementById('test')
    inputEl = document.createElement('input')
    testNode.appendChild(inputEl)
    inputEl.value = '11231'
  })
  afterEach(() => {
    testNode.removeChild(inputEl)
  })
  it('should call clearNodes function', () => {
    let clearNodesSpy = spyOn(window, 'clearNodes')
    spyOn(window, 'fetchCurrentWeatherByZip')
    spyOn(window, 'fetchForecastWeatherByZip')
    window.getZipFunc()
    expect(clearNodesSpy).toHaveBeenCalled()
  })
  it('should should call fetchCurrentWeatherByZip function', () => {
    spyOn(window, 'clearNodes')
    let fetchSpy = spyOn(window, 'fetchCurrentWeatherByZip')
    spyOn(window, 'fetchForecastWeatherByZip')
    window.getZipFunc()
    expect(fetchSpy).toHaveBeenCalled()
  })
  it('should should call fetchForecastWeatherByZip function', () => {
    spyOn(window, 'clearNodes')
    spyOn(window, 'fetchCurrentWeatherByZip')
    let fetchSpy = spyOn(window, 'fetchForecastWeatherByZip')
    window.getZipFunc()
    expect(fetchSpy).toHaveBeenCalled()
  })
})

describe('clearNodes function', () => {
  let testNode
  let childNode
  beforeEach(() => {
    testNode = document.getElementById('test')
    for (var i = 0; i < 4; i++) {
      childNode = document.createElement('div')
      testNode.appendChild(childNode)
    }
  })
  it('should clear all child nodes', () => {
    window.clearNodes('test')
    let result = testNode.childNodes
    expect(result.length).toEqual(0)
  })
})

describe('parseFiveDay function', () => {
  it('should call mapFiveDay', () => {
    let spyFunc = spyOn(window, 'mapFiveDay')
    parseFiveDay([1, 2, 3, 4, 5])
    expect(spyFunc).toHaveBeenCalled()
  })
})

describe('convertToMetric function', () => {
  it('should convert fahrenheit temperature to celsius', () => {
    const arrTemps = [32, 55, 85, 74]
    expect(convertToMetric(arrTemps)).toEqual([0, 13, 29, 23])
  })
})

describe('convertToImperial function', () => {
  it('should convert celsius temperature to fahrenheit', () => {
    const arrTemps = [0, 5, 11, 14, 23]
    expect(convertToImperial(arrTemps)).toEqual([32, 41, 52, 57, 73])
  })
})

describe('changeHandler function', () => {
  it('should call convertToMetric if newUnit === metric', () => {
    let event = { target: { value: 'metric' } }
    let spyFunc = spyOn(window, 'convertToMetric')
    spyOn(window, 'replaceUnitText')
    spyOn(window, 'replaceTempText')
    window.changeHandler(event)
    expect(spyFunc).toHaveBeenCalled()
  })
  it('should call convertToImperial if newUnit === imperial', () => {
    let event = { target: { value: 'imperial' } }
    let spyFunc = spyOn(window, 'convertToImperial')
    spyOn(window, 'replaceUnitText')
    spyOn(window, 'replaceTempText')
    window.changeHandler(event)
    expect(spyFunc).toHaveBeenCalled()
  })
})

describe('getAllTempValues function', () => {
  let tempNode
  let testNode
  beforeEach(() => {
    tempNode = document.createElement('div')
    tempNode.className = 'temp-forecast'
    tempNode.innerText = '72'
    testNode = document.getElementById('test')
    testNode.appendChild(tempNode)
  })
  afterEach(() => {
    testNode.removeChild(tempNode)
  })
  it('should get all temp value nodes', () => {
    let temps = window.getAllTempValues()
    expect(temps.length).toEqual(1)
  })
})

describe('replaceTempText function', () => {
  let oldTempNode
  let testNode
  beforeEach(() => {
    oldTempNode = document.createElement('div')
    oldTempNode.className = 'temp-forecast'
    oldTempNode.innerText = '72'
    testNode = document.getElementById('test')
    testNode.appendChild(oldTempNode)
  })
  afterEach(() => {
    testNode.removeChild(oldTempNode)
  })
  it('should replace old temperature with new re-calculated temperature', () => {
    let newTempNode = ['22']
    window.replaceTempText(newTempNode)
    let result = document.getElementsByClassName('temp-forecast')
    expect(result[0].innerText).toBe('22')
  })
})

