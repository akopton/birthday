import "../styles/love-msg.css"

export const LoveMsg = ({ hidden }: { hidden: boolean }) => {
  return (
    <>
      {!hidden && <div className="message first-message">KOCHANIE!</div>}
      {!hidden && <div className="message second-message">DUŻO MIŁOŚCI!</div>}
    </>
  )
}
