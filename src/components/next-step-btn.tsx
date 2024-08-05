import { FaArrowCircleDown } from "react-icons/fa"
import { State } from "../App"
import { useState } from "react"

export const NextStepBtn = ({
  onClick,
  state,
}: {
  onClick: () => void
  state: State
}) => {
  const [showMessage, setShowMessage] = useState(false)

  const timeout = setTimeout(() => {
    setShowMessage(true)
  }, 10000)

  const stopTimeout = () => {
    clearTimeout(timeout)
  }

  return (
    <button
      className="play-video-btn"
      onClick={() => {
        stopTimeout()
        onClick()
      }}
    >
      <p
        style={{
          whiteSpace: "nowrap",
          fontSize: "1.2rem",
          opacity: showMessage ? "1" : "0",
          transition: "opacity 1s ease-in-out",
        }}
      >
        KLIKNIJ I ZOBACZ CO SIĘ STANIE
      </p>
      <FaArrowCircleDown
        className="animated"
        fontSize="4rem"
      />
    </button>
  )
}
