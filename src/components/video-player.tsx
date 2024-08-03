import { useEffect, useRef } from "react"
import video from "../kaczki.mp4"

export const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }, [videoRef.current])

  return (
    <video
      ref={videoRef}
      width="200"
      height="400"
      controls
      autoPlay
      playsInline
    >
      <source
        src={video}
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
  )
}
