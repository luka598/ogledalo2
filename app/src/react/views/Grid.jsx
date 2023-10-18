import { useState, useEffect } from "react"
import classNames from "classnames"

import Messages from "@/components/messages/messages"
import Clock from "@/components/clock"
import Weather from "@/components/weather/weather"
import Webcam from '@/components/Webcam'

function App() {
  const [awake, setAwake] = useState(false)

  const fd_callback = (n) => {
    if (n > 0) {
      setAwake(true)
    } else {
      setAwake(false)
    }
  }

  return (
    <div className="w-screen h-screen bg-black relative overflow-hidden">
      <Webcam className="absolute right-3 top-3 hidden" fd_callback={fd_callback} />
      <div className="bg-zinc-300 text-white shadow shadow-zinc-600 rounded m-1 p-1 absolute right-0 opacity-5" onClick={() => document.documentElement.requestFullscreen()}>xxx.xxx.xxx.xxx http(6969) ({awake})</div>

      <div className={classNames(
        "inline-block absolute transition-all duration-1000 left-1/2 -translate-x-1/2",
        {
          "top-1/2 -translate-y-1/2 scale-[2] opacity-10": !awake,
          "top-[15%] -translate-y-1/2 scale-[1.25]": awake,
        }
      )}>
        <Clock />
      </div>

      <div className={classNames(
        "inline-block absolute transition-all duration-1000 left-1/2 -translate-x-1/2",
        {
          "top-full": !awake,
          "top-1/2 -translate-y-1/2 scale-[3]": awake,
        }
      )}>
        <Weather />
      </div>

      <div className={classNames(
        "inline-block absolute transition-all duration-1000 top-1/2 -translate-y-1/2",
        {
          "left-full": !awake,
          "left-[85%] -translate-x-1/2 scale-[1]": awake,
        }
      )}>
        <Messages />
      </div>

    </div>
  );
}

export default App;
