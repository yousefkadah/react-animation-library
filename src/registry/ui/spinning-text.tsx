"use client"

import type { ComponentPropsWithoutRef, CSSProperties } from "react"
import { motion, useReducedMotion, type Transition, type Variants } from "motion/react"

import { cn } from "@/lib/utils"

export interface SpinningTextProps extends ComponentPropsWithoutRef<"div"> {
  /** The text to place around the circle. */
  children: string | string[]
  /** Seconds for one full rotation. */
  duration?: number
  /** Rotate counter-clockwise. */
  reverse?: boolean
  /** Radius of the circle, in `ch`. */
  radius?: number
  /** Overrides for the rotation transition. */
  transition?: Transition
  /** Custom variants for the rotating container and for each letter. */
  variants?: {
    container?: Variants
    item?: Variants
  }
}

const BASE_TRANSITION: Transition = {
  repeat: Infinity,
  ease: "linear",
}

const BASE_ITEM_VARIANTS: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
}

export function SpinningText({
  children,
  duration = 10,
  reverse = false,
  radius = 5,
  transition,
  variants,
  className,
  style,
}: SpinningTextProps) {
  const prefersReducedMotion = useReducedMotion()

  if (typeof children !== "string" && !Array.isArray(children)) {
    throw new Error("children must be a string or an array of strings")
  }
  if (Array.isArray(children) && !children.every((child) => typeof child === "string")) {
    throw new Error("all elements in children array must be strings")
  }

  const text = Array.isArray(children) ? children.join("") : children
  const letters = [...text.split(""), " "]

  const finalTransition: Transition = {
    ...BASE_TRANSITION,
    ...transition,
    duration: (transition as { duration?: number } | undefined)?.duration ?? duration,
  }

  const containerVariants: Variants = {
    visible: { rotate: reverse ? -360 : 360 },
    ...variants?.container,
  }

  const itemVariants: Variants = {
    ...BASE_ITEM_VARIANTS,
    ...variants?.item,
  }

  return (
    <motion.div
      className={cn("relative", className)}
      style={{ ...style }}
      initial="hidden"
      // Reduced motion: the text stays still.
      animate={prefersReducedMotion ? "hidden" : "visible"}
      variants={containerVariants}
      transition={finalTransition}
    >
      {letters.map((letter, index) => (
        <motion.span
          aria-hidden="true"
          key={`${index}-${letter}`}
          variants={itemVariants}
          className="absolute top-1/2 left-1/2 inline-block"
          style={
            {
              "--index": index,
              "--total": letters.length,
              "--radius": radius,
              transform: `
                  translate(-50%, -50%)
                  rotate(calc(360deg / var(--total) * var(--index)))
                  translateY(calc(var(--radius, 5) * -1ch))
                `,
              transformOrigin: "center",
            } as CSSProperties
          }
        >
          {letter}
        </motion.span>
      ))}
      <span className="sr-only">{text}</span>
    </motion.div>
  )
}
