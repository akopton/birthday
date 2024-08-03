// import { FaHeart } from "react-icons/fa"

import { useEffect, useRef } from "react"

// export const Hearts = (props: {
//   animationState: number
//   heartsCount: number
//   side: "left" | "right"
//   hidden: boolean
// }) => {
//   const { animationState, heartsCount, side } = props
//   return side === "right" ? (
//     <>
//       <div
//         className="hearts"
//         style={{
//           right: "-10px",
//           bottom: "30%",
//         }}
//       >
//         {Array.from({ length: heartsCount }).map((_, idx) => (
//           <FaHeart
//             className="heart"
//             style={{
//               animation:
//                 "floating-heart 2s infinite cubic-bezier(0.8, 0.8, 0.8, 0.8)",
//             }}
//             key={idx}
//           />
//         ))}
//       </div>
//       <div
//         className="hearts"
//         style={{
//           bottom: "35%",
//           right: "-20px",
//         }}
//       >
//         {Array.from({ length: heartsCount }).map((_, idx) => (
//           <FaHeart
//             className="heart"
//             style={{
//               animation:
//                 "floating-heart-bottom 1.5s infinite cubic-bezier(0.5, 0.5, 0.5, 0.5)",
//             }}
//             key={idx}
//           />
//         ))}
//       </div>
//     </>
//   ) : (
//     <>
//       <div
//         className="hearts"
//         style={{
//           left: "-15px",
//         }}
//       >
//         {Array.from({ length: heartsCount }).map((_, idx) => (
//           <FaHeart
//             className="heart"
//             style={{
//               animation:
//                 "floating-heart-left 2s infinite cubic-bezier(0.8, 0.8, 0.8, 0.8)",
//             }}
//             key={idx}
//           />
//         ))}
//       </div>
//       <div
//         className="hearts"
//         style={{
//           bottom: "20%",
//           left: "-15px",
//         }}
//       >
//         {Array.from({ length: heartsCount }).map((_, idx) => (
//           <FaHeart
//             className="heart"
//             style={{
//               animation:
//                 "floating-heart-bottom-left 1.5s infinite cubic-bezier(0.5, 0.5, 0.5, 0.5)",
//             }}
//             key={idx}
//           />
//         ))}
//       </div>
//     </>
//   )
// }
import lottie from "lottie-web"

import heartsAnimation from "../animations/heartsAnimation.json"
export const Hearts = () => {
  const anime = useRef(null)
  useEffect(() => {
    if (anime.current) {
      lottie.loadAnimation({
        container: anime.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: heartsAnimation,
        rendererSettings: {
          className: "duck-loader",
        },
      })
      return () => lottie.stop()
    }
  }, [])

  return (
    <div
      ref={anime}
      className="hearts"
    ></div>
  )
}
