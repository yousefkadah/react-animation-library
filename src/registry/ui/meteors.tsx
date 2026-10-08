"use client"

import { useEffect, useState, type CSSProperties } from "react"

import { cn } from "@/lib/utils"

export interface MeteorsProps {
  className?: string
  /** Number of meteors. */
  number?: number
  /** Minimum delay in seconds before a meteor starts. */
  minDelay?: number
  /** Maximum delay in seconds before a meteor starts. */
  maxDelay?: number
  /** Minimum seconds a meteor takes to fall. */
  minDuration?: number
  /** Maximum seconds a meteor takes to fall. */
  maxDuration?: number
  /** Angle of the trajectory in degrees. */
  angle?: number
}

export function Meteors({
  number = 20,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 2,
  maxDuration = 10,
  angle = 215,
  className,
}: MeteorsProps) {
  // Positions are random, so they are generated after mount (nothing renders during SSR).
  const [meteorStyles, setMeteorStyles] = useState<CSSProperties[]>([])

  useEffect(() => {
    setMeteorStyles(
      Array.from(
        { length: number },
        () =>
          ({
            "--angle": `${-angle}deg`,
            top: "-5%",
            left: `${Math.floor(Math.random() * 100)}%`,
            animationDelay: `${Math.random() * (maxDelay - minDelay) + minDelay}s`,
            animationDuration: `${Math.floor(Math.random() * (maxDuration - minDuration) + minDuration)}s`,
          }) as CSSProperties
      )
    )
  }, [number, minDelay, maxDelay, minDuration, maxDuration, angle])

  return (
    <>
      {meteorStyles.map((style, index) => (
        <span
          key={index}
          aria-hidden="true"
          style={style}
          className={cn(
            "pointer-events-none absolute size-0.5 rotate-(--angle) animate-meteor rounded-full bg-zinc-500 shadow-[0_0_0_1px_#ffffff10] motion-reduce:hidden",
            className
          )}
        >
          {/* tail */}
          <span className="pointer-events-none absolute top-1/2 -z-10 h-px w-12.5 -translate-y-1/2 bg-linear-to-r from-zinc-500 to-transparent" />
        </span>
      ))}
    </>
  )
}
