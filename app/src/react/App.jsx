import React from 'react'

import Grid from "@/views/Grid"
import Webcam from "@/views/Webcam"

export default function App() {
  const [view, setView] = React.useState(0)

  React.useEffect(() => {
    const handleKeyPress = (event) => {
      const view_keymap = { '1': 0, '2': 1 }
      if (view_keymap[event.key] != undefined) {
        setView(view_keymap[event.key])
      }
    };

    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, []);

  if (view == 0) {
    return <Grid />
  } else if (view == 1) {
    return <Webcam />
  }
}
