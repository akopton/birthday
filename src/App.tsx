import { useEffect, useState } from "react"
import "./App.css"

import { LoadingScreen } from "./screens/loading-sceen"
import { VideoPlayer } from "./components/video-player"
import { FullScreenBox } from "./components/full-screen-box"
import video from "./assets/kaczki.mp4"
import { FaArrowCircleDown } from "react-icons/fa"
import { Fireworks } from "./components/fireworks"
import { LongMessage } from "./components/long-message"
import { NextStepBtn } from "./components/next-step-btn"

export type State =
  | "loader"
  | "heart"
  | "crackedHeart"
  | "fireworks"
  | "long-message"
  | "button"
  | "video"
  | ""

function App() {
  const [state, setState] = useState<State>("loader")

  useEffect(() => {
    if (state === "heart") {
      setTimeout(() => {
        setState("crackedHeart")
      }, 1500)
    }

    // if (state === "fireworks") {
    //   setTimeout(() => {
    //     setState("button")
    //   }, 3500)
    // }
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

      {(state === "long-message" ||
        state === "button" ||
        state === "video") && <LongMessage onEnd={() => setState("button")} />}
      {state === "button" && (
        <NextStepBtn
          onClick={playVideo}
          state={state}
        />
      )}
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
