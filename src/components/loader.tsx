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
  const [heartsCount, setHeartsCount] = useState(0)

  useEffect(() => {
    const animationBreakpoints = [
      { breakpoint: 27, timeout: 5000 },
      { breakpoint: 43, timeout: 2000 },
      { breakpoint: 58, timeout: 2000 },
      { breakpoint: 77, timeout: 5500 },
      { breakpoint: 99, timeout: 10000 },
      { breakpoint: 100, timeout: 0 },
    ]
    animate(handleLoading, animationBreakpoints)
  }, [handleLoading])

  useEffect(() => {
    const interval = setInterval(() => {
      setHeartsCount((prev) => prev + 1)
      if (heartsCount >= 10) clearInterval(interval)
    }, 1000)
  }, [])

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
      }}
    >
      <div
        className="loader"
        style={{
          opacity: hidden ? "0" : "1",
          transition: "ease-in-out 1s",
        }}
      >
        <div
          className="loader-fill"
          style={{
            width: `${loadingState}%`,
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
          <Hearts />
          {!hidden && <Duck />}
        </div>
      </div>
    </div>
  )
}
