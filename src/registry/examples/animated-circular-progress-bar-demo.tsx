"use client"

import { useEffect, useState } from "react"

import { AnimatedCircularProgressBar } from "@/components/ui/animated-circular-progress-bar"

const next = (previous: number) => (previous === 100 ? 0 : previous + 10)

export default function AnimatedCircularProgressBarDemo() {
  const [value, setValue] = useState(0)

  useEffect(() => {
    setValue(next)
    const interval = setInterval(() => setValue(next), 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    // The track colour switches with the theme through a CSS variable.
    <AnimatedCircularProgressBar
      value={value}
      gaugePrimaryColor="rgb(79 70 229)"
      gaugeSecondaryColor="var(--track)"
      className="[--track:rgba(0,0,0,0.1)] dark:[--track:rgba(255,255,255,0.1)]"
    />
  )
}
