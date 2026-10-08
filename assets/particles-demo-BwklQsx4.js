var e=`"use client"

import { useEffect, useState } from "react"

import { Particles } from "@/components/ui/particles"

export default function ParticlesDemo() {
  // White particles in dark mode, black in light mode.
  const [color, setColor] = useState("#ffffff")

  useEffect(() => {
    const root = document.documentElement
    const sync = () => setColor(root.classList.contains("dark") ? "#ffffff" : "#000000")
    sync()
    const observer = new MutationObserver(sync)
    observer.observe(root, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative flex h-[320px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
      <span className="pointer-events-none z-10 text-center text-8xl leading-none font-semibold whitespace-pre-wrap">Particles</span>
      <Particles className="absolute inset-0 z-0" quantity={100} ease={80} color={color} refresh />
    </div>
  )
}
`;export{e as default};