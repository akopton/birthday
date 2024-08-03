import { useCallback, useEffect, useRef } from "react"
import { useIsVisible } from "../hooks/is-visible"

export const VideoPlayer = ({
  video,
  onEnded,
}: {
  video: string
  onEnded: () => void
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { isVisible, targetRef } = useIsVisible(
    {
      root: null,
      rootMargin: "200px",
      threshold: 0.1,
    },
    false
  )

  const startVideoOnMouseMove = useCallback(async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.play()
      } catch (e) {
        // do nothing
      }
    }
  }, [videoRef.current])

  const stopVideoOnMove = useCallback(() => {
    if (videoRef.current) {
      try {
        videoRef.current.pause()
      } catch (e) {
        // do nothing
      }
    }
  }, [videoRef.current])

  useEffect(() => {
    if (isVisible) {
      startVideoOnMouseMove()
    } else {
      stopVideoOnMove()
    }
  }, [isVisible, startVideoOnMouseMove, stopVideoOnMove])

  // useEffect(() => {
  //   if (videoRef.current) {
  //     if (
  //       videoRef.current.currentTime > 0 &&
  //       !videoRef.current.ended &&
  //       !videoRef.current.paused
  //     ) {
  //       videoRef.current.muted = false
  //     }
  //   }
  // }, [videoRef.current])

  // useEffect(() => {
  //   if (targetRef.current && videoRef.current) {
  //     if (
  //       videoRef.current.currentTime > 0 &&
  //       !videoRef.current.ended &&
  //       !videoRef.current.paused
  //     ) {
  //       targetRef.current.click()
  //     }
  //   }
  // }, [videoRef.current, targetRef.current])

  useEffect(() => {
    const video = videoRef.current

    const handleCanPlayThrough = () => {
      if (video) {
        setTimeout(() => {
          video.muted = false
          video.play().catch((error) => {
            console.log("Error trying to play the video:", error)
          })
        }, 100) // Small delay to ensure autoplay policy is met
        video.removeEventListener("canplaythrough", handleCanPlayThrough)
      }
    }

    if (video) {
      video.addEventListener("canplaythrough", handleCanPlayThrough)
      video.play().catch((error) => {
        console.log("Autoplay was prevented:", error)
      })
    }

    return () => {
      if (video) {
        video.removeEventListener("canplaythrough", handleCanPlayThrough)
      }
    }
  }, [videoRef.current])

  return (
    <span
      ref={targetRef}
      style={{
        position: "relative",
        minHeight: "50px",
        height: "100%",
      }}
      // onClick={async () => {
      //   if (videoRef.current) {
      //     await videoRef.current.play()
      //   }
      // }}
    >
      <video
        ref={videoRef}
        autoPlay={false}
        preload="none"
        playsInline
        muted
        style={{
          objectFit: "contain",
          display: "block",
          width: "100%",
          height: "100%",
        }}
        onEnded={onEnded}
      >
        <source
          src={video}
          type="video/mp4"
        />
        Your browser does not support the video tag. Please try viewing this
        page in a modern browser.
      </video>
    </span>
  )
}
