import { useEffect, useRef, useState } from "react"
import "./App.css"

import { LoadingScreen } from "./screens/loading-sceen"
import { VideoPlayer } from "./components/video-player"
import { FullScreenBox } from "./components/full-screen-box"

export type State = "loader" | "heart" | "crackedHeart" | "video"

function App() {
  const [state, setState] = useState<State>("loader")

  useEffect(() => {
    if (state === "heart") {
      setTimeout(() => {
        setState("crackedHeart")
      }, 1500)
    }

    if (state === "crackedHeart") {
      setTimeout(() => {
        setState("video")
      }, 3500)
    }
  }, [state])

  return (
    <div className="App">
      <LoadingScreen
        state={state}
        setState={setState}
      />
      {state === "video" && (
        <FullScreenBox>
          <VideoPlayer />
        </FullScreenBox>
      )}
    </div>
  )
}

export default App
