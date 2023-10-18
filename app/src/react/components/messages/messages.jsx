import React, { useState, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { formatDistanceToNow } from 'date-fns'
import hr from 'date-fns/locale/hr'
import { Flipper, Flipped } from 'react-flip-toolkit'
import "./messages.css"

function formatTimeDelta(timeDelta) {
  const seconds = Math.floor(timeDelta / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return `${years}god`;
  } else if (months > 0) {
    return `${months}mj`;
  } else if (days > 0) {
    return `${days}d`;
  } else if (hours > 0) {
    return `${hours}s`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  } else {
    return "Sad";
  }
}

const timeAgoStyle = 0
function timeAgo(time) {
  if (timeAgoStyle === 0) {
    return formatTimeDelta(new Date() - new Date(time))
  } else if (timeAgoStyle === 1) {
    formatDistanceToNow(new Date(time), { addSuffix: true, locale: hr })
  }
}

export default function Messages() {
  const [messages, setMessages] = useState([])
  // {uuid: "", time: new Date(), username: "", text: "", image: undefined}


  const addMessage = (message) => {
    setMessages((old) => {
      const m = [message, ...old]
      if (m.length > 3) { m.pop(m.length - 1) }
      console.log(m)
      return m
    })
  }

  useEffect(() => {
    window.api.setMessageCallback((data) => {
      console.log(data)
      addMessage(data)
    })

  }, [])

  const lastUuid = () => {
    return messages.length > 0 ? messages[0].uuid : ""
  }

  return (
    <Flipper flipKey={lastUuid()}>
      <TransitionGroup>
        {
          messages.map((m, index) => (
            <CSSTransition key={m.uuid} timeout={500} classNames="message-transition">
              <Flipped key={m.uuid} flipId={m.uuid}>
                <div className="m-1 p-1 min-h-[4rem] w-[20rem] rounded bg-zinc-200 break-words">
                  <div className="flex">
                    <h5 >{m.username} {}</h5>
                    <h6 className="ml-auto text-sm text-zinc-700">{timeAgo(m.time)}</h6>
                  </div>
                  <p className="ml-2 text-zinc-800">{m.text}</p>
                </div>
              </Flipped>
            </CSSTransition>
          ))
        }
      </TransitionGroup>
    </Flipper>
  );
}
