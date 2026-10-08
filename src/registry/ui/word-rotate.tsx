"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion, type MotionProps } from "motion/react"

import { cn } from "@/lib/utils"

export interface WordRotateProps {
  /** The words to rotate through. */
  words: string[]
  /** Milliseconds each word stays on screen. */
  duration?: number
  /** Motion props for each word (`initial`, `animate`, `exit`, `transition`, …). Defaults to a slide-down fade. */
  motionProps?: MotionProps
  className?: string
}

const DEFAULT_MOTION_PROPS: MotionProps = {
  initial: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 },
  transition: { duration: 0.25, ease: "easeOut" },
}

/** Reduced motion keeps the rotation but drops the vertical travel. */
const REDUCED_MOTION_PROPS: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.25, ease: "easeOut" },
}

export function WordRotate({ words, duration = 2500, motionProps, className }: WordRotateProps) {
  const [index, setIndex] = useState(0)
  const prefersReducedMotion = useReducedMotion()
  const resolvedMotionProps = motionProps ?? (prefersReducedMotion ? REDUCED_MOTION_PROPS : DEFAULT_MOTION_PROPS)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % Math.max(words.length, 1))
    }, duration)

    return () => clearInterval(interval)
  }, [words, duration])

  const word = words[index % Math.max(words.length, 1)] ?? ""

  return (
    <div className="overflow-hidden py-2">
      <AnimatePresence mode="wait">
        <motion.h1 key={word} className={cn(className)} {...resolvedMotionProps}>
          {word}
        </motion.h1>
      </AnimatePresence>
    </div>
  )
}
