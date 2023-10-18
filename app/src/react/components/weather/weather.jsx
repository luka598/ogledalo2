import React, { useState, useEffect } from "react"
import classNames from "classnames"
import WAPI from "./weather_api.js"

import Clear from "./icons/fill/all/clear-day.svg"
import PartlyCloudy from "./icons/fill/all/partly-cloudy-day.svg"
import Fog from "./icons/fill/all/fog.svg"
import Drizzle from "./icons/fill/all/drizzle.svg"
import FreezingDrizzle from "./icons/fill/all/sleet.svg"
import Rain from "./icons/fill/all/rain.svg"
import FreezingRain from "./icons/fill/all/sleet.svg"
import SnowFall from "./icons/fill/all/snow.svg"
import SnowGrains from "./icons/fill/all/snow.svg"
import RainShowers from "./icons/fill/all/rain.svg"
import SnowShowers from "./icons/fill/all/snow.svg"
import Thunderstorm from "./icons/fill/all/thunderstorms.svg"
import Hail from "./icons/fill/all/thunderstorms.svg"

import Thermometer from "./icons/fill/all/thermometer.svg"
import Wind from "./icons/fill/all/wind.svg"
import Raindrop from "./icons/fill/all/raindrop.svg"
import NotAvabile from "./icons/fill/all/not-available.svg"

const SIZE_LARGE = "50rem"
const SIZE_SMALL = "15rem"
const SIZE_XSMALL = "5rem"

const wmosTsvg = {
  // Clear
  0: Clear,
  // Partly cloudy
  1: PartlyCloudy,
  // Fog
  2: Fog,
  // Drizzle
  3: Drizzle,
  // Freezing drizzle
  4: FreezingDrizzle,
  // Rain
  5: Rain,
  //Freezing rain
  6: FreezingRain,
  // Snow fall
  7: SnowFall,
  // Snow grains
  8: SnowGrains,
  // Rain shower
  9: RainShowers,
  // Snow showers
  10: SnowShowers,
  // Thunderstorm
  11: Thunderstorm,
  // Hail
  12: Hail
}

const dateFormat = (date) => (date.getDate().toString().padStart(2, "0") + "/" + date.getMonth().toString().padStart(2, "0"))

export default function Weather(props) {
  const [weather, setWeather] = useState(undefined)


  useEffect(() => {
    const getWeather = () => {
      WAPI().then((data) => setWeather(data))
      console.log("Getting weather")
    }

    getWeather()
    const interval = setInterval(getWeather, (1000 * 60) * 10)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return weather ?
    (
      <div className={classNames("text-white", props.className)}>
        <div className="flex justify-center">
          <img src={wmosTsvg[weather.now.wmos]} width={SIZE_LARGE} height={SIZE_LARGE} alt="Weather icon" />
          <div className="pt-1 pb-1 flex flex-col align-center text-xs">
            <div className="flex">
              <img src={Thermometer} width={SIZE_SMALL} alt="Thermometer icon" />{weather.now.temperature} °C
            </div>
            <div className="flex">
              <img src={Wind} width={SIZE_SMALL} alt="Wind icon" />{weather.now.windSpeed} km/h
            </div>
          </div>
        </div>
        <div className="flex border-[0.5px] border-zinc-900 rounded p-0.5 gap-1">

          {
            weather.future.map((w, index) => (
              <div className="flex flex-col align-center text-center" key={index}>
                <p className="text-zinc-400 text-[0.3rem]">{dateFormat(new Date(w.time))}</p>
                <img src={wmosTsvg[w.wmos]} width={SIZE_SMALL} height={SIZE_SMALL} alt="Weather icon" />
                <p className="text-[0.3rem]">{w.temperatureMax}°</p>
                <div className="flex">
                  <img src={Raindrop} width={SIZE_XSMALL} alt="Raindrop icon" /><p className="text-[0.3rem]">{w.percipitationMax}%</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    )
    :
    (<img src={NotAvabile} width={SIZE_LARGE} alt="N/A" />)
}
