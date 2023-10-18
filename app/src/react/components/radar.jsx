import React  from "react"
import classNames from "classnames"

export default function Radar(props) {

  return (
  <div className={classNames("text-white", props.className)}>
    <img className="aspect-square h-44 rounded" src="https://vrijeme.hr/anim_goli.gif" alt="Radar"/>
  </div>
    )
}
