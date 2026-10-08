"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type HTMLMotionProps,
} from "motion/react"

import { cn } from "@/lib/utils"

const DEFAULT_COLORS = ["#c679c4", "#fa3d1d", "#ffb005", "#e1e1fe", "#0358f7"]
const BAND_HALF = 17
const SWEEP_START = -BAND_HALF
const SWEEP_END = 100 + BAND_HALF

const sweepEase = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2)

function buildGradient(pos: number, colors: string[], textColor: string) {
  const bandStart = pos - BAND_HALF
  const bandEnd = pos + BAND_HALF

  if (bandStart >= 100) {
    return `linear-gradient(90deg, ${textColor}, ${textColor})`
  }
  const n = colors.length
  const parts: string[] = []

  if (bandStart > 0) parts.push(`${textColor} 0%`, `${textColor} ${bandStart.toFixed(2)}%`)

  colors.forEach((c, i) => {
    const pct = n === 1 ? pos : bandStart + (i / (n - 1)) * BAND_HALF * 2
    parts.push(`${c} ${pct.toFixed(2)}%`)
  })

  if (bandEnd < 100) parts.push(`transparent ${bandEnd.toFixed(2)}%`, `transparent 100%`)

  return `linear-gradient(90deg, ${parts.join(", ")})`
}

/** Measures each string's rendered width with an invisible clone of the element. */
function measureWidths(el: HTMLElement, texts: string[]) {
  const ghost = el.cloneNode() as HTMLElement
  Object.assign(ghost.style, {
    position: "absolute",
    visibility: "hidden",
    pointerEvents: "none",
    width: "auto",
    whiteSpace: "nowrap",
  })
  el.parentElement?.appendChild(ghost)
  const widths = texts.map((t) => {
    ghost.textContent = t
    return ghost.getBoundingClientRect().width
  })
  ghost.remove()
  return widths
}

export interface DiaTextRevealProps
  extends Omit<HTMLMotionProps<"span">, "ref" | "children" | "style" | "animate" | "transition" | "color"> {
  /** Text to reveal. Pass several strings to rotate through them when `repeat` is on. */
  text: string | string[]
  /** Colours sampled across the moving gradient band. */
  colors?: string[]
  /** Colour of the revealed text, and of the regions outside the band while it sweeps. */
  textColor?: string
  /** Seconds one sweep takes. */
  duration?: number
  /** Seconds to wait before the sweep starts. */
  delay?: number
  /** With several strings, replay the sweep and advance to the next string after each pass. */
  repeat?: boolean
  /** Seconds to pause between cycles when `repeat` is on. */
  repeatDelay?: number
  /** Start the sweep when the element scrolls into view. */
  startOnView?: boolean
  /** Only play the first time the element comes into view. */
  once?: boolean
  /** Additional class names for the animated `span` (e.g. typography utilities). */
  className?: string
  /** With several strings, reserve the widest string's width instead of animating the width per string. */
  fixedWidth?: boolean
}

export function DiaTextReveal({
  text,
  colors = DEFAULT_COLORS,
  textColor = "var(--foreground)",
  duration = 1.5,
  delay = 0,
  repeat = false,
  repeatDelay = 0.5,
  startOnView = true,
  once = true,
  className,
  fixedWidth = false,
  ...props
}: DiaTextRevealProps) {
  const texts = Array.isArray(text) ? text : [text]
  const textsKey = texts.join("\0")
  const isMulti = texts.length > 1
  const prefersReducedMotion = useReducedMotion()

  const spanRef = useRef<HTMLSpanElement>(null)
  const optsRef = useRef({ colors, textColor, duration, delay, repeat, repeatDelay, texts })
  useEffect(() => {
    optsRef.current = { colors, textColor, duration, delay, repeat, repeatDelay, texts }
  })

  const hasPlayedRef = useRef(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const stopRef = useRef<(() => void) | null>(null)

  const [activeIndex, setActiveIndex] = useState(0)
  const [measuredWidths, setMeasuredWidths] = useState<number[]>([])

  const sweepPos = useMotionValue(SWEEP_START)
  const backgroundImage = useTransform(sweepPos, (pos) =>
    buildGradient(pos, optsRef.current.colors, optsRef.current.textColor)
  )

  const isInView = useInView(spanRef, { once, amount: 0.1 })

  const measure = useCallback(() => {
    const el = spanRef.current
    if (!el || !isMulti) return
    setMeasuredWidths(measureWidths(el, textsKey.split("\0")))
  }, [isMulti, textsKey])

  // Measure now, once web fonts have loaded, and when the viewport (and so the font size) changes.
  useEffect(() => {
    measure()
    let cancelled = false
    document.fonts?.ready.then(() => {
      if (!cancelled) measure()
    })
    window.addEventListener("resize", measure, { passive: true })
    return () => {
      cancelled = true
      window.removeEventListener("resize", measure)
    }
  }, [measure])

  const play = useCallback(() => {
    const { duration, delay, repeat, repeatDelay } = optsRef.current

    sweepPos.set(SWEEP_START)

    const controls = animate(sweepPos, SWEEP_END, {
      duration,
      delay,
      ease: sweepEase,
      onComplete() {
        if (!repeat) return
        timerRef.current = setTimeout(() => {
          setActiveIndex((index) => (index + 1) % optsRef.current.texts.length)
          play()
        }, repeatDelay * 1000)
      },
    })

    stopRef.current = () => controls.stop()
  }, [sweepPos])

  useEffect(() => {
    if (prefersReducedMotion) {
      sweepPos.set(SWEEP_END)
      return
    }
    if (startOnView && !isInView) return
    if (once && hasPlayedRef.current) return
    hasPlayedRef.current = true
    play()

    return () => {
      stopRef.current?.()
      clearTimeout(timerRef.current)
    }
  }, [isInView, startOnView, once, prefersReducedMotion, sweepPos, play])

  const currentIndex = activeIndex % texts.length
  const fixedW = isMulti && fixedWidth && measuredWidths.length > 0 ? Math.max(...measuredWidths) : undefined
  const animatedW = isMulti && !fixedWidth ? measuredWidths[currentIndex] : undefined

  return (
    <motion.span
      ref={spanRef}
      className={cn(
        "align-bottom leading-[100%] -translate-y-0.5",
        isMulti && "inline-block overflow-hidden whitespace-nowrap",
        className
      )}
      style={{
        color: "transparent",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        backgroundSize: "100% 100%",
        backgroundImage,
        ...(fixedW != null && { width: fixedW }),
      }}
      animate={animatedW != null ? { width: animatedW } : undefined}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      {...props}
    >
      {texts[currentIndex]}
    </motion.span>
  )
}
