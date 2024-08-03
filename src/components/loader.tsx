import { SetStateAction, useEffect, useState } from "react"
import { animate } from "../utils/animate"
import "../styles/loader.css"
import Duck from "./duck"
import { Hearts } from "./hearts"

export const Loader = (props: {
  hidden: boolean
  loadingState: number
  handleLoading: React.Dispatch<SetStateAction<number>>
}) => {
  const { hidden, handleLoading, loadingState } = props

  useEffect(() => {
    const animationBreakpoints = [
      { breakpoint: 27, timeout: 100 },
      { breakpoint: 43, timeout: 100 },
      { breakpoint: 58, timeout: 100 },
      { breakpoint: 77, timeout: 100 },
      { breakpoint: 99, timeout: 100 },
      { breakpoint: 100, timeout: 0 },
    ]
    animate(handleLoading, animationBreakpoints)
  }, [handleLoading])

  return (
    <div
      style={{
        overflow: "hidden",
        width: hidden ? "0" : "100%",
        transition: "ease-in-out 1s",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 0",
        position: "relative",
      }}
    >
      <div
        className="loader"
        style={{
          opacity: hidden ? "0" : "1",
          transition: "ease-in-out 1s",
          position: "relative",
        }}
      >
        <div
          className="loader-value"
          style={{
            opacity: hidden ? "0" : "1",
            transition: "ease-in-out .5s",
          }}
        >
          Ładowanie miłości... {loadingState.toString()} %
        </div>
        <div
          className="loader-fill"
          style={{
            width: `${loadingState}%`,
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: `${loadingState}%`,
          }}
        >
          <Hearts />
          {!hidden && <Duck />}
        </div>
      </div>
    </div>
  )
}
