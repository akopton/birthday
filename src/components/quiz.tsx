import { useState } from "react"
import { FullScreenBox } from "./full-screen-box"
import { DynamicText } from "./message"
import { QuizQuestion } from "./quiz-question"

export const Quiz = () => {
  const [showMessage, setShowMessage] = useState(false)
  const [showCode, setShowCode] = useState(false)
  const [showCode2, setShowCode2] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [questions, setQuestions] = useState<{
    [key: number]: {
      question: string
      answer: string
      isCorrect: boolean
      isError: boolean
    }
  }>({
    0: {
      question:
        "1. Jest największym, a zarazem jednym z najmniejszych zwierząt w tym domu.",
      answer: "",
      isCorrect: false,
      isError: false,
    },
    1: {
      question: "2. Ile w naszym domu znajduje się ptaków?",
      answer: "",
      isCorrect: false,
      isError: false,
    },
    2: {
      question: "3. Mokra pozwala żyć, sucha może zabić.",
      answer: "",
      isCorrect: false,
      isError: false,
    },
  })

  const correctAnswers = ["luna", "5", "ziemia"]

  const checkAnswer = (idx: number) => {
    const correct =
      questions[idx].answer.toLowerCase() !== "" ||
      questions[idx].answer.toLowerCase() === correctAnswers[idx].toLowerCase()
    const noAnswer = questions[idx].answer.toLowerCase() === ""
    const incorrect =
      questions[idx].answer.toLowerCase() !== "" &&
      questions[idx].answer.toLowerCase() !== correctAnswers[idx].toLowerCase()

    if (incorrect || noAnswer) {
      setQuestions((prev) => ({
        ...prev,
        [idx]: { ...prev[idx], isError: true, isCorrect: false },
      }))
      setShowMessage(false)
      setShowCode(false)
      return
    }

    if (correct) {
      setQuestions((prev) => {
        const newState = {
          ...prev,
          [idx]: { ...prev[idx], isError: false, isCorrect: true },
        }

        if (Object.values(newState).every((v) => v.isCorrect)) {
          setShowMessage(true)
        }

        return newState
      })
      setCurrentQuestion((prev) => prev + 1)
      return
    }
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === "Enter") {
      checkAnswer(idx)
    }
  }

  return (
    <FullScreenBox
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <h2
        style={{
          width: "100%",
          textAlign: "center",
          color: "pink",
          margin: "0",
        }}
      >
        ROZWIĄŻ ZAGADKĘ
      </h2>
      <div
        style={{
          color: "white",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {Object.values(questions).map((q, idx) => {
          return currentQuestion >= idx ? (
            <QuizQuestion
              question={q.question}
              answer={questions[idx].answer}
              isCurrent={currentQuestion === idx}
              isCorrect={q.isCorrect}
              isError={q.isError}
              checkAnswer={() => checkAnswer(idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              onChange={(e) =>
                setQuestions((prev) => ({
                  ...prev,
                  [idx]: { ...prev[idx], answer: e.target.value },
                }))
              }
              key={q.question}
            />
          ) : null
        })}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          gap: "10px",
          color: "pink",
        }}
      >
        {showMessage && (
          <DynamicText
            text="Brawo! Na wszystkie pytania odpowiedziałaś dobrze!"
            isCurrent={showMessage && !showCode}
            onEnd={() => setShowCode(true)}
            time={60}
            timeout={0}
          />
        )}
        {showCode && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <DynamicText
              text="Oto twój kod: "
              isCurrent={showCode && !showCode2}
              onEnd={() => setShowCode2(true)}
              time={60}
              timeout={0}
            />
            {showCode2 && (
              <DynamicText
                text="571"
                isCurrent={showCode2 && !showHint}
                onEnd={() => setShowHint(true)}
                time={1000}
                timeout={0}
                style={{
                  letterSpacing: "5px",
                }}
              />
            )}
          </div>
        )}
        {showHint && (
          <DynamicText
            text="Podpowiedź: zajrzyj w głąb."
            isCurrent={showHint}
            onEnd={() => setShowHint(true)}
            time={80}
            timeout={0}
          />
        )}
      </div>
    </FullScreenBox>
  )
}
