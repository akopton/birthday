import { CSSProperties, useEffect, useState } from "react"
import "../styles/long-message.css"

export const DynamicText = (props: {
  text: string
  isCurrent: boolean
  onEnd?: () => void
  time?: number
  timeout?: number
  style?: CSSProperties
}) => {
  const { timeout, text, onEnd, time, isCurrent, style } = props
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev === text.length) {
          clearInterval(interval)
          return prev + 1
        }
        return prev + 1
      })
    }, time || 50)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (currentIndex === text.length && onEnd) {
      setTimeout(() => {
        onEnd()
      }, timeout)
    }
  }, [currentIndex])

  const letters = text.split("")
  const currentLetter = letters.slice(0, currentIndex)

  return (
    <span
      className="dynamic-text"
      style={style}
    >
      {currentLetter}
      {isCurrent && (
        <span
          className={currentIndex >= letters.length ? "cursor blink" : "cursor"}
        >
          |
        </span>
      )}
    </span>
  )
}
