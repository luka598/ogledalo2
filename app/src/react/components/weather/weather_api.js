import axios from "axios";

const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=45.41&longitude=13.66&daily=weathercode,temperature_2m_max,precipitation_probability_max&current_weather=true&timezone=auto"

const wmoTwmos = {
  // Clear
  0: 0,
  // Partly cloudy
  1: 1, 2: 1, 3: 1,
  // Fog
  45: 2, 48: 2,
  // Drizzle
  51: 3, 53: 3, 55: 3,
  // Freezing drizzle
  56: 4, 57: 4,
  // Rain
  61: 5, 63: 5, 65: 5,
  // Freezing rain
  66: 6, 67: 6,
  // Snow fall
  71: 7, 73: 7, 75: 7,
  // Snow grains
  77: 8,
  // Rain shower
  80: 9, 81: 9, 82: 9,
  // Snow showers
  85: 10, 86: 10,
  // Thunderstorm
  95: 11,
  // Hail
  96: 12, 99: 12
}

/*
{
  now: {wmos, temperature, windSpeed, aisDay}
  future: [{time, wmos, temperatureMax, percipitationMax}] // 7 items
}
*/

export default function(callback) {
  return new Promise((resolve, reject) => {
    axios.get(apiUrl).then((resp) => {
      let data = resp.data
      let result = {}
      result.now = {
        time: new Date(data.current_weather.time),
        wmos: wmoTwmos[data.current_weather.weathercode],
        temperature: data.current_weather.temperature,
        windSpeed: data.current_weather.windspeed,
        isDay: data.current_weather.is_day
      }
      result.future = []
      for (let i = 0; i < 7; i++) {
        result.future.push({
          time: new Date(data.daily.time[i]),
          wmos: wmoTwmos[data.daily.weathercode[i]],
          temperatureMax: data.daily.temperature_2m_max[i],
          percipitationMax: data.daily.precipitation_probability_max[i]
        })
      }
      resolve(result)
    })
  })
}
