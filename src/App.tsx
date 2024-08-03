import { useEffect, useRef, useState } from "react"
import "./App.css"

import { LoadingScreen } from "./screens/loading-sceen"
import { VideoPlayer } from "./components/video-player"
import { FullScreenBox } from "./components/full-screen-box"
import video from "./kaczki.mp4"

export type State = "loader" | "heart" | "crackedHeart" | "button" | "video"

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
        setState("button")
      }, 3500)
    }
  }, [state])

  const [currentVideo, setCurrentVideo] = useState(0)
  const videos = [video, video]
  const playNext = () => setCurrentVideo((prev) => prev + 1)

  const playVideo = () => setState("video")

  return (
    <div className="App">
      <LoadingScreen
        state={state}
        setState={setState}
      />
      {state === "button" && <button onClick={playVideo}> puść</button>}
      {state === "video" &&
        videos.map((v, idx) => {
          if (idx <= currentVideo) {
            return (
              <FullScreenBox key={idx}>
                <VideoPlayer
                  video={v}
                  onEnded={playNext}
                />
              </FullScreenBox>
            )
          }
        })}
    </div>
  )
}

export default App
