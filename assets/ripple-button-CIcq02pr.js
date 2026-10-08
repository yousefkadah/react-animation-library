var e=`"use client"

import { useEffect, useRef, useState, type ComponentProps, type CSSProperties, type MouseEvent } from "react"

import { cn } from "@/lib/utils"

export interface RippleButtonProps extends ComponentProps<"button"> {
  /** Colour of the ripple. */
  rippleColor?: string
  /** Duration of one ripple, e.g. \`600ms\` or \`1s\`. */
  duration?: string
}

interface Ripple {
  x: number
  y: number
  size: number
  key: number
}

function toMilliseconds(duration: string): number {
  const value = Number.parseFloat(duration)
  if (Number.isNaN(value)) return 600
  const unit = duration.trim()
  return unit.endsWith("s") && !unit.endsWith("ms") ? value * 1000 : value
}

export function RippleButton({
  className,
  children,
  rippleColor = "#ffffff",
  duration = "600ms",
  onClick,
  ...props
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([])
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>())
  const nextKey = useRef(0)

  useEffect(() => {
    const pending = timers.current
    return () => {
      for (const timer of pending) clearTimeout(timer)
      pending.clear()
    }
  }, [])

  const createRipple = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const ripple = {
      x: event.clientX - rect.left - size / 2,
      y: event.clientY - rect.top - size / 2,
      size,
      key: nextKey.current++,
    }
    setRipples((current) => [...current, ripple])

    const timer = setTimeout(() => {
      timers.current.delete(timer)
      setRipples((current) => current.filter((item) => item.key !== ripple.key))
    }, toMilliseconds(duration))
    timers.current.add(timer)
  }

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    createRipple(event)
    onClick?.(event)
  }

  return (
    <button
      className={cn(
        "relative flex cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 bg-background px-4 py-2 text-center text-primary",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span aria-hidden="true" className="pointer-events-none absolute inset-0">
        {ripples.map((ripple) => (
          <span
            key={ripple.key}
            className="absolute animate-rippling rounded-full bg-background opacity-30"
            style={
              {
                width: \`\${ripple.size}px\`,
                height: \`\${ripple.size}px\`,
                top: \`\${ripple.y}px\`,
                left: \`\${ripple.x}px\`,
                backgroundColor: rippleColor,
                transform: "scale(0)",
                "--duration": duration,
              } as CSSProperties
            }
          />
        ))}
      </span>
    </button>
  )
}
`;export{e as default};