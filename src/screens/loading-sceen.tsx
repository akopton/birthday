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
        setState("")
      }, 500)
      setTimeout(() => {
        setState("heart")
      }, 1500)
    }
  }, [animationState])

  return (
    <FullScreenBox>
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: state !== "loader" ? "0" : "100%",
          transition: "width ease-in-out 1s",
        }}
      >
        <Loader
          hidden={false}
          loadingState={animationState}
          handleLoading={setAnimationState}
        />
      </div>
      {(state === "heart" ||
        state === "crackedHeart" ||
        state === "button" ||
        state === "video") && (
        <div
          style={{
            position: "relative",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
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
