"use client"

import { memo } from "react"
import { AnimatePresence, motion, type DOMMotionComponents, type MotionProps, type Variants } from "motion/react"

import { cn } from "@/lib/utils"

export type TextAnimateBy = "text" | "word" | "character" | "line"

export type TextAnimateAnimation =
  | "fadeIn"
  | "blurIn"
  | "blurInUp"
  | "blurInDown"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "scaleUp"
  | "scaleDown"

const motionElements = {
  article: motion.article,
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
  li: motion.li,
  p: motion.p,
  section: motion.section,
  span: motion.span,
} as const

type MotionElementType = Extract<keyof DOMMotionComponents, keyof typeof motionElements>

export interface TextAnimateProps extends Omit<MotionProps, "children"> {
  /** The text to animate. */
  children: string
  className?: string
  /** Classes applied to every animated segment. */
  segmentClassName?: string
  /** Seconds to wait before the first segment animates. */
  delay?: number
  /** Seconds over which all segments are staggered in. */
  duration?: number
  /** Custom `hidden` / `show` / `exit` variants for each segment. Replaces the preset. */
  variants?: Variants
  /** Element to render. */
  as?: MotionElementType
  /** How the text is split into animated segments. */
  by?: TextAnimateBy
  /** Wait until the element scrolls into view before animating. */
  startOnView?: boolean
  /** Only animate the first time the element enters the viewport. */
  once?: boolean
  /** The animation preset to use. */
  animation?: TextAnimateAnimation
  /** Render the full string for screen readers and hide the split segments from them. */
  accessible?: boolean
}

const staggerTimings: Record<TextAnimateBy, number> = {
  text: 0.06,
  word: 0.05,
  character: 0.03,
  line: 0.06,
}

const springScale = { duration: 0.3, scale: { type: "spring", damping: 15, stiffness: 300 } } as const

const presetItemVariants: Record<TextAnimateAnimation, Variants> = {
  fadeIn: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
  },
  blurIn: {
    hidden: { opacity: 0, filter: "blur(10px)" },
    show: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.3 } },
    exit: { opacity: 0, filter: "blur(10px)", transition: { duration: 0.3 } },
  },
  blurInUp: {
    hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
    show: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { y: { duration: 0.3 }, opacity: { duration: 0.4 }, filter: { duration: 0.3 } },
    },
    exit: {
      opacity: 0,
      filter: "blur(10px)",
      y: 20,
      transition: { y: { duration: 0.3 }, opacity: { duration: 0.4 }, filter: { duration: 0.3 } },
    },
  },
  blurInDown: {
    hidden: { opacity: 0, filter: "blur(10px)", y: -20 },
    show: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { y: { duration: 0.3 }, opacity: { duration: 0.4 }, filter: { duration: 0.3 } },
    },
  },
  slideUp: {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: { y: -20, opacity: 0, transition: { duration: 0.3 } },
  },
  slideDown: {
    hidden: { y: -20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: { y: 20, opacity: 0, transition: { duration: 0.3 } },
  },
  slideLeft: {
    hidden: { x: 20, opacity: 0 },
    show: { x: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: { x: -20, opacity: 0, transition: { duration: 0.3 } },
  },
  slideRight: {
    hidden: { x: -20, opacity: 0 },
    show: { x: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: { x: 20, opacity: 0, transition: { duration: 0.3 } },
  },
  scaleUp: {
    hidden: { scale: 0.5, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: springScale },
    exit: { scale: 0.5, opacity: 0, transition: { duration: 0.3 } },
  },
  scaleDown: {
    hidden: { scale: 1.5, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: springScale },
    exit: { scale: 1.5, opacity: 0, transition: { duration: 0.3 } },
  },
}

function splitText(text: string, by: TextAnimateBy): string[] {
  switch (by) {
    case "word":
      return text.split(/(\s+)/)
    case "character":
      // Array.from keeps emoji and other surrogate pairs in one segment.
      return Array.from(text)
    case "line":
      return text.split("\n")
    default:
      return [text]
  }
}

function TextAnimateBase({
  children,
  delay = 0,
  duration = 0.3,
  variants,
  className,
  segmentClassName,
  as: Component = "p",
  startOnView = true,
  once = false,
  by = "word",
  animation = "fadeIn",
  accessible = true,
  ...props
}: TextAnimateProps) {
  const MotionComponent = motionElements[Component]
  const segments = splitText(children, by)
  const stagger = duration / Math.max(segments.length, 1)

  const finalVariants: { container: Variants; item: Variants } = variants
    ? {
        container: {
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { opacity: { duration: 0.01, delay }, delayChildren: delay, staggerChildren: stagger },
          },
          exit: { opacity: 0, transition: { staggerChildren: stagger, staggerDirection: -1 } },
        },
        item: variants,
      }
    : {
        container: {
          hidden: { opacity: 1 },
          show: { opacity: 1, transition: { delayChildren: delay, staggerChildren: stagger } },
          exit: { opacity: 0, transition: { staggerChildren: stagger, staggerDirection: -1 } },
        },
        item: presetItemVariants[animation],
      }

  return (
    <AnimatePresence mode="popLayout">
      <MotionComponent
        variants={finalVariants.container}
        initial="hidden"
        whileInView={startOnView ? "show" : undefined}
        animate={startOnView ? undefined : "show"}
        exit="exit"
        className={cn("whitespace-pre-wrap", className)}
        viewport={{ once }}
        aria-label={accessible ? children : undefined}
        {...props}
      >
        {accessible && <span className="sr-only">{children}</span>}
        {segments.map((segment, index) => (
          <motion.span
            key={`${by}-${segment}-${index}`}
            variants={finalVariants.item}
            custom={index * staggerTimings[by]}
            className={cn(by === "line" ? "block" : "inline-block whitespace-pre", segmentClassName)}
            aria-hidden={accessible ? true : undefined}
          >
            {segment}
          </motion.span>
        ))}
      </MotionComponent>
    </AnimatePresence>
  )
}

export const TextAnimate = memo(TextAnimateBase)
