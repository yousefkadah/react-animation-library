"use client"

import { useRef, type ReactNode } from "react"
import { AnimatePresence, motion, useInView, type UseInViewOptions, type Variants } from "motion/react"

import { cn } from "@/lib/utils"

type MarginType = UseInViewOptions["margin"]

export interface BlurFadeProps {
  children: ReactNode
  className?: string
  /** Custom `hidden` / `visible` variants. Replaces the default blur-and-slide. */
  variant?: { hidden: { y: number }; visible: { y: number } }
  /** Seconds the animation lasts. */
  duration?: number
  /** Seconds to wait before animating. */
  delay?: number
  /** Distance in pixels the element travels while fading in. */
  offset?: number
  /** Direction the element travels from. */
  direction?: "up" | "down" | "left" | "right"
  /** Wait until the element scrolls into view before animating. */
  inView?: boolean
  /** Root margin used for the in-view check. */
  inViewMargin?: MarginType
  /** Initial blur amount. */
  blur?: string
}

export function BlurFade({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  offset = 6,
  direction = "down",
  inView = false,
  inViewMargin = "-50px",
  blur = "6px",
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin })
  const isInView = !inView || inViewResult
  const axis = direction === "left" || direction === "right" ? "x" : "y"
  const sign = direction === "right" || direction === "down" ? -1 : 1
  const defaultVariants: Variants = {
    hidden: { [axis]: sign * offset, opacity: 0, filter: `blur(${blur})` },
    visible: { [axis]: 0, opacity: 1, filter: "blur(0px)" },
  }
  const combinedVariants = (variant as Variants | undefined) ?? defaultVariants

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        exit="hidden"
        variants={combinedVariants}
        transition={{ delay: 0.04 + delay, duration, ease: "easeOut" }}
        className={cn(className)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
