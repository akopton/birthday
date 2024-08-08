import { CSSProperties, useEffect, useRef } from "react"

export const FullScreenBox = ({
  children,
  style,
}: {
  children?: React.ReactNode
  style?: CSSProperties
}) => {
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
        width: "100svw",
        maxWidth: "100svw",
        maxHeight: "100svh",
        background: "rgb(73, 73, 73)",
        ...style,
      }}
    >
      {children}
    </div>
  )
}
