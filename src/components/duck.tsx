import { useEffect, useRef } from "react"
import lottie from "lottie-web"

import duckAnimation from "../animations/duckAnimation.json"

const Duck = () => {
  const anime = useRef(null)
  useEffect(() => {
    if (anime.current) {
      lottie.loadAnimation({
        container: anime.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: duckAnimation,
        rendererSettings: {
          className: "duck-loader",
        },
      })
      return () => lottie.stop()
    }
  }, [])

  return (
    <div
      ref={anime}
      className="duck-container"
    ></div>
  )
}

export default Duck
