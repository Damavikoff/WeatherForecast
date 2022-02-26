import { doRequest, prepareUrl, formatDate } from '../src/utils'
import { LOC_URL, cityList } from '../src/defaults'
import fetchMock from "jest-fetch-mock"

describe('utils test', () => {

  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it('prepareUrl function should replace appropriate url keys for latitude and longitude with values provided', () => {
    const latitude = 123.45
    const longitude = 678.90
    const url = prepareUrl(LOC_URL, { latitude, longitude })
    const latitudeMatch = url.match(/lat=[^&]+&/)?.[0]?.slice(4, -1)
    const longitudeMatch = url.match(/lon=[^&]+&/)?.[0]?.slice(4, -1)
    expect(latitudeMatch).toBe(latitude.toString())
    expect(longitudeMatch).toBe(longitude.toString())
  })

  it('doRequest function should return parsed json object on succesfull call', async () => {
    const location = cityList[1]
    const url = prepareUrl(LOC_URL, location)
    const result = await doRequest(url)
    expect(typeof result).toBe('object')
  })

  it('doRequest function should return throw an error for any non-succesfull server response', () => {
    const url = prepareUrl(LOC_URL, {latitude: 1111111, longitude: 1111111})
    expect(doRequest(url)).rejects.toThrow(Error)
  })

  it('formatDate function format Date object or number top appropriate format string', () => {
    const date = new Date()
    const numeric = Number(date.getTime().toString().slice(0, -3))
    const format = 'dd-mm-yyyy'
    const day = date.getDate().toString().padStart(2, 0)
    const month = (date.getMonth() + 1).toString().padStart(2, 0)
    const year = date.getFullYear().toString()
    const formattedByDate = formatDate(date, format)
    const formattedByNumber = formatDate(numeric, format)
    expect(day === formattedByDate.slice(0, 2) && day === formattedByNumber.slice(0, 2)).toBeTruthy()
    expect(month === formattedByDate.slice(3, 5) && month === formattedByNumber.slice(3, 5)).toBeTruthy()
    expect(year === formattedByDate.slice(6) && year === formattedByNumber.slice(6)).toBeTruthy()
  })

})
