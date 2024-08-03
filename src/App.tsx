import { useEffect, useRef, useState } from "react"
import "./App.css"
import { Loader } from "./components/loader"
import { CrackedHeart } from "./components/cracked-heart"
import { LoveMsg } from "./components/love-msg"

import video from "./kaczki.mp4"

type State = "loader" | "heart" | "crackedHeart" | "video"

function App() {
  const [animationState, setAnimationState] = useState(0)
  const [state, setState] = useState<State>("loader")

  // const [hideLoader, setHideLoader] = useState(false)
  // const [showHeart, setShowHeart] = useState(false)
  // const [isHeartCracked, setIsHeartCracked] = useState(false)

  useEffect(() => {
    if (animationState >= 100) {
      setTimeout(() => {
        setState("heart")
      }, 2000)
    }
  }, [animationState])

  useEffect(() => {
    if (state === "heart") {
      setTimeout(() => {
        setState("crackedHeart")
      }, 1500)
    }

    if (state === "crackedHeart") {
      setTimeout(() => {
        setState("video")
        videoRef.current?.play()
      }, 3500)
    }
  }, [state])

  // useEffect(() => {
  //   if (showHeart) {
  //     setTimeout(() => {
  //       setIsHeartCracked(true)
  //     }, 2500)
  //   }
  // }, [showHeart])

  const videoRef = useRef<HTMLVideoElement>(null)

  // useEffect(() => {}, [])
  //
  // const [showVideo, setShowVideo] = useState(false)

  // useEffect(() => {
  //   if (isHeartCracked) {
  //     setTimeout(() => {
  //       setShowHeart(false)
  //     }, 4000)
  //   }
  // }, [isHeartCracked])

  return (
    <div className="App">
      {state === "loader" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: state !== "loader" ? "0" : "100%",
            transition: "ease-in-out 1s",
          }}
        >
          <Loader
            hidden={state !== "loader"}
            loadingState={animationState}
            handleLoading={setAnimationState}
          />
        </div>
      )}
      {(state === "heart" || state === "crackedHeart") && (
        <div
          style={{
            position: "relative",
            height: "100%",
            padding: "0",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CrackedHeart />
          <LoveMsg hidden={state !== "crackedHeart"} />
        </div>
      )}
      {state === "video" && (
        <video
          ref={videoRef}
          width="600"
          height="400"
          controls
          autoPlay
        >
          <source
            src={video}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  )
}

export default App
