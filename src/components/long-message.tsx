import { useEffect, useState } from "react"
import "../styles/long-message.css"
import { DynamicText } from "./message"

export const LongMessage = ({ onEnd }: { onEnd: () => void }) => {
  const [counter, setCounter] = useState(0)

  const firstMessages: { text: string; timeout: number }[] = [
    { text: "JESZCZE WIĘCEJ PRZYGÓD,", timeout: 100 },
    { text: "PODRÓŻY, KONCERTÓW,", timeout: 200 },
    { text: "WSPÓLNYCH WSCHODÓW I ZACHODÓW!", timeout: 1000 },
  ]
  const secondMessages: { text: string; timeout: number }[] = [
    { text: "TEGO WSZYSTKIEGO,", timeout: 500 },
    { text: "W DNIU TWOICH URODZIN,", timeout: 200 },
    { text: "CHCIAŁBYM CI ŻYCZYĆ JA - TWÓJ FAFROK!", timeout: 1000 },
    { text: "I NIE TYLKO...", timeout: 0 },
  ]

  const [firstIndex, setFirstIndex] = useState(0)
  const [secondIndex, setSecondIndex] = useState(0)

  const playFirstNext = (isNext: boolean) =>
    setFirstIndex((prev) => (isNext ? prev + 1 : prev))

  const playSecondNext = (isNext: boolean) =>
    setSecondIndex((prev) => (isNext ? prev + 1 : prev))

  return (
    <div className="long-message">
      <div className="messages-wrapper">
        {firstMessages.map((msg, idx, arr) => {
          if (firstIndex >= idx) {
            return (
              <DynamicText
                isCurrent={counter === 0 && idx === firstIndex}
                text={msg.text}
                onEnd={() =>
                  arr[idx + 1] ? playFirstNext(true) : setCounter(1)
                }
                time={idx < arr.length ? 80 : 60}
                timeout={msg.timeout}
                style={{
                  marginTop: msg.timeout === 0 ? "50px" : "0",
                }}
                key={idx}
              />
            )
          }
        })}
      </div>
      {counter === 1 && (
        <div className="messages-wrapper">
          {secondMessages.map((msg, idx, arr) => {
            if (secondIndex >= idx) {
              return (
                <DynamicText
                  isCurrent={idx === secondIndex}
                  text={msg.text}
                  onEnd={() => (arr[idx + 1] ? playSecondNext(true) : onEnd())}
                  time={idx < arr.length ? 80 : 60}
                  timeout={msg.timeout}
                  key={idx}
                />
              )
            }
          })}
        </div>
      )}
    </div>
  )
}
