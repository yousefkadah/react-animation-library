"use client"

import { useEffect, useMemo, useRef, useState, type ComponentPropsWithoutRef } from "react"
import { useInView, useMotionValue, useSpring } from "motion/react"

import { cn } from "@/lib/utils"

export interface NumberTickerProps extends ComponentPropsWithoutRef<"span"> {
  /** The value to count to (or from, when counting down). */
  value: number
  /** The value to count from (or to, when counting down). */
  startValue?: number
  /** Count up from `startValue` to `value`, or down from `value` to `startValue`. */
  direction?: "up" | "down"
  /** Seconds to wait after the number scrolls into view. */
  delay?: number
  /** Number of decimal places to show. */
  decimalPlaces?: number
  /** BCP 47 locale passed to `Intl.NumberFormat` (grouping and decimal separators). */
  locale?: string
}

export function NumberTicker({
  value,
  startValue = 0,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
  locale = "en-US",
  ...props
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(direction === "down" ? value : startValue)
  const springValue = useSpring(motionValue, { damping: 60, stiffness: 100 })
  const isInView = useInView(ref, { once: true, margin: "0px" })

  const formatter = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      }),
    [locale, decimalPlaces]
  )

  // Rendered once; afterwards the spring writes straight to the DOM so React never resets it mid-count.
  const [initialText] = useState(() => formatter.format(direction === "down" ? value : startValue))

  useEffect(() => {
    if (!isInView) return
    const timer = setTimeout(() => {
      motionValue.set(direction === "down" ? startValue : value)
    }, delay * 1000)
    return () => clearTimeout(timer)
  }, [motionValue, isInView, delay, value, direction, startValue])

  useEffect(() => {
    const render = (latest: number) => {
      if (ref.current) ref.current.textContent = formatter.format(Number(latest.toFixed(decimalPlaces)))
    }
    render(springValue.get())
    return springValue.on("change", render)
  }, [springValue, formatter, decimalPlaces])

  return (
    <span ref={ref} className={cn("inline-block tracking-wider text-foreground tabular-nums", className)} {...props}>
      {initialText}
    </span>
  )
}
