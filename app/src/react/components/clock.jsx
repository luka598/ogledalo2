import React, { useState, useEffect } from "react"
import classNames from "classnames"

export default function Clock(props) {
  const [clock, setClock] = useState({ year: 0, month: 0, day: 0, hours: 0, minutes: 0, seconds: 0, ms: 0 })

  useEffect(() => {
    const pad = (val, nZeros) => String(val).padStart(nZeros, '0')
    setTimeout(() => {
      let date = new Date()
      setClock({
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
        hours: pad(date.getHours(), 2),
        minutes: pad(date.getMinutes(), 2),
        seconds: pad(date.getSeconds(), 2),
        ms: pad(date.getMilliseconds(), 3)
      })
    }, 11)
  }, [clock])

  return (
    <div className={classNames("text-white", props.className)}>
      <div className="flex align-bottom">
        <p className="text-5xl">{clock.hours}<span className="animate-pulse">:</span>{clock.minutes}</p>
        <div>
          <p className="ml-1 self-end text-gray-200">{clock.seconds}</p>
          <p className="ml-1 self-end text-sm text-gray-400">{clock.ms}</p>
        </div>
      </div>
      <p className="text-center">{clock.day}.{clock.month}.{clock.year}.</p>
    </div>
  )
}
