import { useEffect, useState } from "react"
import { BsSuitHeartFill } from "react-icons/bs"
import "../styles/big-heart.css"

export const BigHeart = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShow(true)
    }, 100)
  }, [])

  const [heartAnimation, setHeartAnimation] = useState(false)

  useEffect(() => {
    if (heartAnimation) {
      setTimeout(() => {
        setHeartAnimation(false)
      }, 3500)
    }
  }, [heartAnimation])

  const [isBroken, setIsBroken] = useState(false)

  const handleClick = () => {
    setIsBroken((prev) => !prev)
  }

  return (
    <div
      style={{
        opacity: show ? "1" : "0",
        height: show ? "50%" : "0",
        width: show ? "80%" : "0",
        transition: "ease-in-out 1.5s",
        position: "relative",
        animation: heartAnimation ? "heartbeat 1s infinite" : "",
      }}
      className={`heart-container ${isBroken ? "broken" : ""}`}
      onClick={handleClick}
    >
      <div
        className="heart-big"
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <BsSuitHeartFill
          style={{
            color: "pink",
            height: "100%",
            width: "100%",
          }}
        />
        {isBroken && (
          <svg
            className="crack"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M 50 0 Q 60 20 50 40 Q 40 60 50 80 Q 55 90 50 100"
              stroke="white"
              strokeWidth="4"
              fill="none"
            />
          </svg>
        )}
      </div>
    </div>
  )
}
