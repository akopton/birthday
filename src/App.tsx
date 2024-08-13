import { useEffect, useState } from "react"
import "./App.css"

import { LoadingScreen } from "./screens/loading-sceen"
import { VideoPlayer } from "./components/video-player"
import { FullScreenBox } from "./components/full-screen-box"
import { LongMessage } from "./components/long-message"
import { NextStepBtn } from "./components/next-step-btn"
import { Quiz } from "./components/quiz"
import { BeforeQuiz } from "./components/before-quiz"
import szymonsabkaVid from "./assets/szymonsabka.mp4"
import agataVid from "./assets/agata.mp4"
import kocikVid from "./assets/kocik.mp4"
import kalawojtekVid from "./assets/kalawojtek.mp4"
import paweldaria from "./assets/paweldaria.mp4"

export type State =
  | "loader"
  | "heart"
  | "crackedHeart"
  | "fireworks"
  | "long-message"
  | "button"
  | "video"
  | "quiz"
  | "beforequiz"
  | "beforequiz2"
  | "beforequiz3"
  | "beforequiz4"
  | ""

function App() {
  const [state, setState] = useState<State>("loader")

  useEffect(() => {
    if (state === "heart") {
      setTimeout(() => {
        setState("crackedHeart")
      }, 1500)
    }
  }, [state])

  const [currentVideo, setCurrentVideo] = useState(0)
  const videos = [szymonsabkaVid, kocikVid, agataVid, kalawojtekVid, paweldaria]
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
        videos.map((v, idx, arr) => {
          if (idx <= currentVideo) {
            return (
              <FullScreenBox key={idx}>
                <VideoPlayer
                  video={v}
                  onEnded={
                    idx === arr.length - 1
                      ? () => {
                          setTimeout(() => {
                            setState("beforequiz")
                          }, 1000)
                        }
                      : () => playNext()
                  }
                />
              </FullScreenBox>
            )
          }
        })}
      {(state === "beforequiz" || state === "quiz") && (
        <FullScreenBox
          style={{
            display: "flex",
            flexDirection: "column",
            color: "pink",
            padding: "20px",
            gap: "30px",
          }}
        >
          <BeforeQuiz onEnd={() => setState("quiz")} />
        </FullScreenBox>
      )}
      {state === "quiz" && <Quiz />}
    </div>
  )
}

export default App
