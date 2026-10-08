"use client"

import { useImperativeHandle, useLayoutEffect, useRef, type ComponentProps, type CSSProperties } from "react"

import { cn } from "@/lib/utils"

export interface PulsatingButtonProps extends ComponentProps<"button"> {
  /** Colour of the pulse. Defaults to the button's own background colour. */
  pulseColor?: string
  /** Duration of one pulse, e.g. `1.5s`. */
  duration?: string
  /** How far the pulse spreads, e.g. `8px`. */
  distance?: string
  /** `pulse` breathes in and out; `ripple` radiates outward and fades. */
  variant?: "pulse" | "ripple"
}

export function PulsatingButton({
  className,
  children,
  pulseColor,
  duration = "1.5s",
  distance = "8px",
  variant = "pulse",
  style,
  ref,
  ...props
}: PulsatingButtonProps) {
  const innerRef = useRef<HTMLButtonElement>(null)
  useImperativeHandle(ref, () => innerRef.current!)

  // Without a `pulseColor`, the pulse uses the button's computed background (exposed as `--bg`),
  // kept in sync when the theme class, the button's attributes or its hover/focus state change.
  useLayoutEffect(() => {
    const button = innerRef.current
    if (!button) return

    if (pulseColor) {
      button.style.removeProperty("--bg")
      return
    }

    let animationFrameId = 0
    let currentBackground = ""

    const updateBackground = () => {
      animationFrameId = 0
      const nextBackground = getComputedStyle(button).backgroundColor
      if (nextBackground === currentBackground) return
      currentBackground = nextBackground
      button.style.setProperty("--bg", nextBackground)
    }

    const scheduleUpdate = () => {
      if (animationFrameId) return
      animationFrameId = window.requestAnimationFrame(updateBackground)
    }

    updateBackground()

    const themeObserver = new MutationObserver(scheduleUpdate)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    const buttonObserver = new MutationObserver(scheduleUpdate)
    buttonObserver.observe(button, { attributes: true })

    const syncEvents = ["blur", "focus", "pointerenter", "pointerleave"] as const
    for (const eventName of syncEvents) button.addEventListener(eventName, scheduleUpdate)

    return () => {
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId)
      themeObserver.disconnect()
      buttonObserver.disconnect()
      for (const eventName of syncEvents) button.removeEventListener(eventName, scheduleUpdate)
    }
  }, [pulseColor])

  return (
    <button
      ref={innerRef}
      className={cn(
        "relative flex cursor-pointer items-center justify-center rounded-lg bg-primary px-4 py-2 text-center text-primary-foreground",
        className
      )}
      style={
        {
          ...(pulseColor && { "--pulse-color": pulseColor }),
          "--duration": duration,
          "--distance": distance,
          ...style,
        } as CSSProperties
      }
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[inherit] bg-inherit motion-reduce:animate-none",
          variant === "pulse" ? "animate-pulsating" : "animate-pulsating-ripple"
        )}
      />
    </button>
  )
}
