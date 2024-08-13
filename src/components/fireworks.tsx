import lottie from "lottie-web"
import fireworksAnimation from "../animations/fireworksAnimation.json"
import React, { SetStateAction, useEffect, useRef, useState } from "react"

import "../styles/fireworks.css"
import { State } from "../App"

export const Fireworks = ({
  setState,
}: {
  setState: React.Dispatch<SetStateAction<State>>
}) => {
  const positions = [
    { top: "8%", left: "45%", text: "ZDRÓWKA" },
    { top: "25%", left: "60%", text: "POMYŚLNOŚCI" },
    { top: "20%", left: "0%", text: "SAMYCH WSPANIAŁYCH CHWIL" },
    { top: "15%", left: "48%", text: "RADOŚCI" },
    { top: "8%", left: "42%", text: "SZCZĘŚCIA" },
    { top: "25%", left: "50%", text: "SPEŁNIENIA MARZEŃ" },
    { top: "20%", left: "13%", text: "DURZO PIENIONSZKUF" },
    { top: "15%", left: "45%", text: "DUŻO PIESKÓW" },
  ]
  const [messageCount, setMessageCount] = useState<number | undefined>()

  const showMessages = async () => {
    await new Promise((resolve) => {
      setTimeout(() => {
        setMessageCount(0)
        resolve("")
      }, 600)
    })

    await new Promise((resolve) => {
      const interval = setInterval(() => {
        setMessageCount((prev) => {
          if (prev || prev === 0) {
            if (prev + 1 === 8) {
              clearInterval(interval)
              resolve(prev + 1)
              return prev + 1
            }
            return prev + 1
          } else return 0
        })
      }, 1000)
    })

    await new Promise((resolve) => {
      const interval = setInterval(() => {
        setMessageCount((prev) => {
          if (prev) {
            if (prev + 1 === 8) {
              clearInterval(interval)
              resolve(prev + 1)
              return prev + 1
            }
            return prev + 1
          } else return 0
        })
      }, 1100)
    })
  }

  const anime = useRef(null)
  useEffect(() => {
    if (anime.current) {
      lottie.loadAnimation({
        container: anime.current,
        renderer: "svg",
        loop: 1,
        autoplay: true,
        animationData: fireworksAnimation,
        rendererSettings: {
          progressiveLoad: true,
        },
      })
      showMessages()
      return () => lottie.stop()
    }
  }, [])

  useEffect(() => {
    if (messageCount === 8) {
      setTimeout(() => {
        setState("long-message")
      }, 500)
    }
  }, [messageCount])

  const getAnimation = (leftMargin: string) => {
    const marginNumber = parseInt(leftMargin.replace("%", ""))

    if (marginNumber < 43) return "appear-right 1s 1 ease-in-out"
    return "appear-left 1s 1 ease-in-out"
  }

  return (
    <div ref={anime}>
      {positions.map((p, idx) => {
        if (messageCount === idx) {
          return (
            <p
              key={idx}
              style={{
                position: "absolute",
                left: p.left,
                top: p.top,
                animation: getAnimation(p.left),
              }}
              className="wish-message"
            >
              {p.text}
            </p>
          )
        }
      })}
    </div>
  )
}
