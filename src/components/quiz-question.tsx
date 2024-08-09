import { useEffect, useRef, useState } from "react"
import { DynamicText } from "./message"

export const QuizQuestion = ({
  question,
  isCurrent,
  answer,
  onChange,
  isError,
  isCorrect,
  onKeyDown,
  checkAnswer,
}: {
  question: string
  isCurrent: boolean
  answer: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  isCorrect: boolean
  isError: boolean
  checkAnswer: () => void
}) => {
  const [showForm, setShowForm] = useState(false)
  const ref = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (ref.current) ref.current.focus()
  }, [ref.current])

  return (
    <label
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "10px",
        fontSize: "1.15rem",
      }}
    >
      <DynamicText
        text={question}
        time={60}
        timeout={300}
        isCurrent={!showForm ? isCurrent : false}
        onEnd={() => setShowForm(true)}
      />
      {showForm && (
        <>
          <input
            ref={ref}
            onKeyDown={onKeyDown}
            autoFocus
            style={{
              background: "none",
              outline: "none",
              border: "2px solid pink",
              borderRadius: "8px",
              fontSize: "1.15rem",
              color: "white",
              padding: "4px 8px",
            }}
            value={answer}
            onChange={onChange}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <button
              style={{
                fontSize: "1.15rem",
                color: "black",
                background: "white",
                border: "2px solid white",
                borderRadius: "8px",
                padding: "2px 8px",
                margin: "0",
              }}
              onClick={checkAnswer}
            >
              Sprawdź
            </button>
            {isError && (
              <p style={{ margin: "0", padding: "0" }}>Niepoprawna odpowiedź</p>
            )}
            {isCorrect && (
              <p style={{ margin: "0", padding: "0" }}>Bardzo dobrze!</p>
            )}
          </div>
        </>
      )}
    </label>
  )
}
