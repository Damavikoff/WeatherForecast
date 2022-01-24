const API_KEY = '3b46066644b57abe8ffe0b69606b8649'
const ICO_SOURCE = 'static/icons/'
const LOC_URL = `http://api.openweathermap.org/geo/1.0/reverse?lat=latitude&lon=longitude&limit=1&appid=${API_KEY}`
const FRC_URL = `https://api.openweathermap.org/data/2.5/onecall?units=metric&lat=latitude&lon=longitude&exclude=minutely&lang=ru&appid=${API_KEY}`

const cityList = [
    {value: 0, name: 'Local', latitude: 0, longitude: 0},
    {value: 1, name: 'Amsterdam', latitude: 52.370216, longitude: 4.895168},
    {value: 2, name: 'Berlin', latitude: 52.531677, longitude: 13.381777},
    {value: 3, name: 'Moscow', latitude: 55.751244, longitude: 37.618423},
    {value: 4, name: 'Rome', latitude: 41.902782, longitude: 12.496366},
    {value: 5, name: 'Tokyo', latitude: 35.652832, longitude: 139.839478},
    {value: 6, name: 'Vienna', latitude: 48.210033, longitude: 16.363449},
    {value: 7, name: 'Warsaw', latitude: 52.237049, longitude: 21.017532}
]

const defaultLocation = cityList[0]

export {
    ICO_SOURCE,
    LOC_URL,
    FRC_URL,
    cityList,
    defaultLocation
}