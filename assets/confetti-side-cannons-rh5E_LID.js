var e=`"use client"

import { useEffect, useRef } from "react"
import confetti from "canvas-confetti"

export default function ConfettiSideCannons() {
  const frameId = useRef(0)
  useEffect(() => () => cancelAnimationFrame(frameId.current), [])

  const handleClick = () => {
    const end = Date.now() + 3 * 1000
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"]

    const frame = () => {
      if (Date.now() > end) return
      confetti({ particleCount: 2, angle: 60, spread: 55, startVelocity: 60, origin: { x: 0, y: 0.5 }, colors })
      confetti({ particleCount: 2, angle: 120, spread: 55, startVelocity: 60, origin: { x: 1, y: 0.5 }, colors })
      frameId.current = requestAnimationFrame(frame)
    }

    cancelAnimationFrame(frameId.current)
    frame()
  }

  return (
    <div className="relative">
      <button type="button" className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90" onClick={handleClick}>
        Trigger Side Cannons
      </button>
    </div>
  )
}
`;export{e as default};