var e=`"use client"

import { useEffect, useState, type ComponentPropsWithoutRef, type CSSProperties, type Ref } from "react"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

export interface LightRaysProps extends ComponentPropsWithoutRef<"div"> {
  ref?: Ref<HTMLDivElement>
  /** Number of rays. */
  count?: number
  /** Colour of the rays and the ambient glow (any CSS colour; include some transparency). */
  color?: string
  /** Blur of each ray in pixels. */
  blur?: number
  /** Seconds for one swing of a ray. Lower is faster. */
  speed?: number
  /** Length of each ray, e.g. \`70vh\` or \`500px\`. */
  length?: string
}

interface LightRay {
  id: string
  left: number
  rotate: number
  width: number
  swing: number
  delay: number
  duration: number
  intensity: number
}

function createRays(count: number, cycle: number): LightRay[] {
  return Array.from({ length: Math.max(count, 0) }, (_, index) => {
    const left = 8 + Math.random() * 84
    return {
      id: \`\${index}-\${Math.round(left * 10)}\`,
      left,
      rotate: -28 + Math.random() * 56,
      width: 160 + Math.random() * 160,
      swing: 0.8 + Math.random() * 1.8,
      delay: Math.random() * cycle,
      duration: cycle * (0.75 + Math.random() * 0.5),
      intensity: 0.6 + Math.random() * 0.5,
    }
  })
}

function Ray({ left, rotate, width, swing, delay, duration, intensity, still }: LightRay & { still: boolean }) {
  return (
    <motion.div
      className="pointer-events-none absolute -top-[12%] left-[var(--ray-left)] h-[var(--light-rays-length)] w-[var(--ray-width)] origin-top -translate-x-1/2 rounded-full bg-linear-to-b from-[color-mix(in_srgb,var(--light-rays-color)_70%,transparent)] to-transparent opacity-0 blur-[var(--light-rays-blur)] dark:mix-blend-screen"
      style={{ "--ray-left": \`\${left}%\`, "--ray-width": \`\${width}px\` } as CSSProperties}
      initial={still ? { rotate, opacity: intensity * 0.6 } : { rotate }}
      animate={
        still
          ? undefined
          : { opacity: [0, intensity, 0], rotate: [rotate - swing, rotate + swing, rotate - swing] }
      }
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay, repeatDelay: duration * 0.1 }}
    />
  )
}

export function LightRays({
  className,
  style,
  count = 7,
  color = "rgba(160, 210, 255, 0.2)",
  blur = 36,
  speed = 14,
  length = "70vh",
  ref,
  ...props
}: LightRaysProps) {
  const [rays, setRays] = useState<LightRay[]>([])
  const reducedMotion = useReducedMotion() ?? false
  const cycle = Math.max(speed, 0.1)

  // Random layout is generated after mount so server and client renders match.
  useEffect(() => {
    setRays(createRays(count, cycle))
  }, [count, cycle])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      {...props}
      className={cn("pointer-events-none absolute inset-0 isolate overflow-hidden rounded-[inherit]", className)}
      style={
        {
          "--light-rays-color": color,
          "--light-rays-blur": \`\${blur}px\`,
          "--light-rays-length": length,
          ...style,
        } as CSSProperties
      }
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,color-mix(in_srgb,var(--light-rays-color)_45%,transparent),transparent_70%)] opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,color-mix(in_srgb,var(--light-rays-color)_35%,transparent),transparent_75%)] opacity-60" />
        {rays.map((ray) => (
          <Ray key={ray.id} {...ray} still={reducedMotion} />
        ))}
      </div>
    </div>
  )
}
`;export{e as default};