import lottie from "lottie-web"
import heartCrackAnimation from "../animations/heartCrackAnimation.json"
import React, { SetStateAction, useEffect, useRef } from "react"
import "../styles/cracked-heart.css"
import { State } from "../App"

export const CrackedHeart = () => {
  const anime = useRef(null)
  useEffect(() => {
    if (anime.current) {
      lottie.loadAnimation({
        container: anime.current,
        renderer: "svg",
        loop: 1,
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
