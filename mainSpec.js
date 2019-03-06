describe('parseFiveDay function', () => {
  it('should call mapFiveDay', () => {
    spyOn(window, 'mapFiveDay')
    parseFiveDay([1, 2, 3, 4, 5])
    expect(window.mapFiveDay).toHaveBeenCalled()
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