"use client"

import { useState } from "react"

import { RippleButton } from "@/components/ui/ripple-button"

export default function RippleButtonCustom() {
  const [clicks, setClicks] = useState(0)

  return (
    <div className="flex flex-col items-center gap-3">
      <RippleButton
        rippleColor="#a855f7"
        duration="1s"
        className="rounded-full border-violet-500/40 px-6 py-2.5 font-medium text-violet-700 dark:text-violet-300"
        onClick={() => setClicks((count) => count + 1)}
      >
        Slow purple ripple
      </RippleButton>
      <p className="text-sm text-muted-foreground" aria-live="polite">
        Clicked {clicks} {clicks === 1 ? "time" : "times"}
      </p>
    </div>
  )
}
