import { useState } from "react"
import { FullScreenBox } from "./full-screen-box"
import { DynamicText } from "./message"

export const BeforeQuiz = ({ onEnd }: { onEnd: () => void }) => {
  const [index, setIndex] = useState(0)

  return (
    <>
      <DynamicText
        isCurrent={index === 0}
        text="PAMIĘTAJ, ŻE JESTEŚ WYJĄTKOWA, KOCHANA, MĄDRA, CUDOWNA, PIĘKNA I TEN DZIEŃ NALEŻY DO CIEBIE!"
        timeout={1000}
        onEnd={() => setIndex((prev) => prev + 1)}
      />
      {index >= 1 && (
        <DynamicText
          text="ALE..."
          isCurrent={index === 1}
          timeout={1000}
          onEnd={() => setIndex((prev) => prev + 1)}
        />
      )}
      {index >= 2 && (
        <DynamicText
          text="CZEKA NA CIEBIE JESZCZE WYZWANIE, Z KTÓRYM TERAZ SIĘ ZMIERZYSZ."
          isCurrent={index === 2}
          timeout={500}
          onEnd={() => setIndex((prev) => prev + 1)}
        />
      )}
      {index >= 3 && (
        <DynamicText
          text="POWODZENIA !!!!"
          isCurrent={index === 3}
          timeout={2000}
          onEnd={onEnd}
        />
      )}
    </>
  )
}
