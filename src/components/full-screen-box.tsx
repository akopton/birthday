import { useEffect, useRef } from "react"

export const FullScreenBox = ({ children }: { children?: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [ref.current])

  return (
    <div
      ref={ref}
      style={{
        height: "100vh",
        width: "100vw",
        maxWidth: "100svw",
        maxHeight: "100svh",
        background: "rgb(73, 73, 73)",
      }}
    >
      {children}
    </div>
  )
}
