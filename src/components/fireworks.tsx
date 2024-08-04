import lottie from "lottie-web"
import fireworksAnimation from "../animations/fireworksAnimation.json"
import { useEffect, useRef, useState } from "react"

export const Fireworks = () => {
  const positions = [
    { top: "8%", left: "45%", text: "ZDRÓWKA" },
    { top: "25%", left: "60%", text: "POMYŚLNOŚCI" },
    { top: "20%", left: "15%", text: "SZCZĘŚCIA" },
    { top: "15%", left: "48%", text: "RADOŚCI" },
    { top: "8%", left: "42%", text: "SPEŁNIENIA MARZEŃ" },
    { top: "25%", left: "55%", text: "SAMYCH WSPANIAŁYCH CHWIL" },
    { top: "20%", left: "13%", text: "DURZO PIENIONSZKUF" },
    { top: "15%", left: "45%", text: "DUŻO PIESKÓW" },
  ]
  const [messageCount, setMessageCount] = useState(0)

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
      const interval = setInterval(() => {
        setMessageCount((prev) => {
          if (prev + 1 === 8) {
            clearInterval(interval)
            return prev + 1
          }
          return prev + 1
        })
      }, 1000)
      return () => lottie.stop()
    }
  }, [])

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
              }}
            >
              {p.text}
            </p>
          )
        }
      })}
    </div>
  )
}
