"use client"

import { useState } from "react"
import { Minus, Plus } from "lucide-react"

import { AnimatedCircularProgressBar } from "@/components/ui/animated-circular-progress-bar"

export default function AnimatedCircularProgressBarControls() {
  const [value, setValue] = useState(40)
  const step = (delta: number) => setValue((current) => Math.min(100, Math.max(0, current + delta)))

  return (
    <div className="flex items-center gap-6">
      <button
        type="button"
        aria-label="Decrease"
        className="inline-flex size-9 items-center justify-center rounded-full border transition-colors hover:bg-accent disabled:opacity-50"
        disabled={value <= 0}
        onClick={() => step(-10)}
      >
        <Minus className="size-4" />
      </button>
      <AnimatedCircularProgressBar
        value={value}
        gaugePrimaryColor="#10b981"
        gaugeSecondaryColor="var(--track)"
        className="[--track:rgba(0,0,0,0.08)] dark:[--track:rgba(255,255,255,0.12)]"
      />
      <button
        type="button"
        aria-label="Increase"
        className="inline-flex size-9 items-center justify-center rounded-full border transition-colors hover:bg-accent disabled:opacity-50"
        disabled={value >= 100}
        onClick={() => step(10)}
      >
        <Plus className="size-4" />
      </button>
    </div>
  )
}
