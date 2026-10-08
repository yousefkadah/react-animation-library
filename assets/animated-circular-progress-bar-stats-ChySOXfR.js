var e=`"use client"

import { useEffect, useState } from "react"

import { AnimatedCircularProgressBar } from "@/components/ui/animated-circular-progress-bar"

const stats = [
  { label: "CPU", value: 72, color: "#f43f5e" },
  { label: "Memory", value: 4.6, max: 8, color: "#f59e0b" },
  { label: "Disk", value: 31, color: "#0ea5e9" },
]

export default function AnimatedCircularProgressBarStats() {
  // Start empty, then fill once mounted so the arcs animate in.
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setReady(true), 150)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="grid grid-cols-3 gap-6 [--track:rgba(0,0,0,0.08)] dark:[--track:rgba(255,255,255,0.12)]">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col items-center gap-2">
          <AnimatedCircularProgressBar
            value={ready ? stat.value : 0}
            max={stat.max}
            gaugePrimaryColor={stat.color}
            gaugeSecondaryColor="var(--track)"
            className="size-24 text-lg"
          />
          <span className="text-sm text-muted-foreground">{stat.label}</span>
        </div>
      ))}
    </div>
  )
}
`;export{e as default};