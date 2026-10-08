var e=`"use client"

import confetti from "canvas-confetti"

export default function ConfettiStars() {
  const handleClick = () => {
    const defaults = {
      spread: 360,
      ticks: 50,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#FDFFB8"],
    }

    const shoot = () => {
      confetti({ ...defaults, particleCount: 40, scalar: 1.2, shapes: ["star"] })
      confetti({ ...defaults, particleCount: 10, scalar: 0.75, shapes: ["circle"] })
    }

    setTimeout(shoot, 0)
    setTimeout(shoot, 100)
    setTimeout(shoot, 200)
  }

  return (
    <div className="relative">
      <button type="button" className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90" onClick={handleClick}>
        Trigger Stars
      </button>
    </div>
  )
}
`;export{e as default};