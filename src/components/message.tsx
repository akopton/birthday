import { useEffect, useState } from "react"

export const DynamicText = (props: {
  text: string
  onEnd: () => void
  time: number
  timeout: number
  isCurrent: boolean
}) => {
  const { timeout, text, onEnd, time, isCurrent } = props
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
    }, time)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (currentIndex === text.length) {
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
      style={{
        marginTop: timeout === 0 ? "50px" : "",
      }}
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
