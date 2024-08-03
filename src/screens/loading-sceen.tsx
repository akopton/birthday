import { SetStateAction, useEffect, useState } from "react"
import { State } from "../App"
import { CrackedHeart } from "../components/cracked-heart"
import { Loader } from "../components/loader"
import { LoveMsg } from "../components/love-msg"
import { FullScreenBox } from "../components/full-screen-box"

export const LoadingScreen = ({
  state,
  setState,
}: {
  state: State
  setState: React.Dispatch<SetStateAction<State>>
}) => {
  const [animationState, setAnimationState] = useState(0)

  useEffect(() => {
    if (animationState >= 100) {
      setTimeout(() => {
        setState("heart")
      }, 2000)
    }
  }, [animationState])

  return (
    <FullScreenBox>
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
      {state !== "loader" && (
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
    </FullScreenBox>
  )
}
