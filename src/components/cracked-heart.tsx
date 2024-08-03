import lottie from "lottie-web"
import heartCrackAnimation from "../animations/heartCrackAnimation.json"
import { useEffect, useRef } from "react"
import "../styles/cracked-heart.css"

export const CrackedHeart = () => {
  const anime = useRef(null)
  useEffect(() => {
    if (anime.current) {
      lottie.loadAnimation({
        container: anime.current,
        renderer: "svg",
        loop: false,
        autoplay: true,
        animationData: heartCrackAnimation,
        rendererSettings: {
          className: "cracked-heart",
        },
      })
      return () => lottie.stop()
    }
  }, [])

  return <div ref={anime}></div>
}
