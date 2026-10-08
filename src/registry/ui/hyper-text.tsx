"use client"

import { useEffect, useRef, useState, type ComponentType, type RefAttributes } from "react"
import { motion, type DOMMotionComponents, type HTMLMotionProps, type MotionProps } from "motion/react"

import { cn } from "@/lib/utils"

type CharacterSet = string[] | readonly string[]

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
type HyperTextMotionComponent = ComponentType<Omit<HTMLMotionProps<"div">, "ref"> & RefAttributes<HTMLElement>>

export interface HyperTextProps extends Omit<MotionProps, "children"> {
  /** The text to scramble. */
  children: string
  className?: string
  /** Duration of the scramble in milliseconds. */
  duration?: number
  /** Delay before the first scramble in milliseconds. */
  delay?: number
  /** Element to render. */
  as?: MotionElementType
  /** Wait until the element scrolls into view before the first scramble. */
  startOnView?: boolean
  /** Scramble again whenever the pointer enters the element. */
  animateOnHover?: boolean
  /** Characters used while scrambling. */
  characterSet?: CharacterSet
}

const DEFAULT_CHARACTER_SET = Object.freeze("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")) as readonly string[]

const getRandomInt = (max: number): number => Math.floor(Math.random() * max)

export function HyperText({
  children,
  className,
  duration = 800,
  delay = 0,
  as: Component = "div",
  startOnView = false,
  animateOnHover = true,
  characterSet = DEFAULT_CHARACTER_SET,
  ...props
}: HyperTextProps) {
  const MotionComponent = motionElements[Component] as HyperTextMotionComponent

  const [displayText, setDisplayText] = useState<string[]>(() => children.split(""))
  const [isAnimating, setIsAnimating] = useState(false)
  const iterationCount = useRef(0)
  const elementRef = useRef<HTMLElement | null>(null)
  // Read through a ref so an inline `characterSet` array doesn't restart the scramble every render.
  const characterSetRef = useRef(characterSet)

  useEffect(() => {
    characterSetRef.current = characterSet
  }, [characterSet])

  const handleAnimationTrigger = () => {
    if (animateOnHover && !isAnimating) {
      iterationCount.current = 0
      setIsAnimating(true)
    }
  }

  // Start after `delay`, straight away or once the element scrolls into view.
  useEffect(() => {
    let startTimeout: ReturnType<typeof setTimeout> | undefined
    const start = () => {
      startTimeout = setTimeout(() => setIsAnimating(true), delay)
    }

    if (!startOnView) {
      start()
      return () => clearTimeout(startTimeout)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          start()
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: "-30% 0px -30% 0px" }
    )
    if (elementRef.current) observer.observe(elementRef.current)

    return () => {
      observer.disconnect()
      clearTimeout(startTimeout)
    }
  }, [delay, startOnView])

  // The scramble itself: letters resolve left to right over `duration`.
  useEffect(() => {
    if (!isAnimating) return
    let animationFrameId: number | null = null
    const letters = children.split("")
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1)
      iterationCount.current = progress * letters.length
      const set = characterSetRef.current

      setDisplayText(
        letters.map((letter, index) =>
          letter === " " || index <= iterationCount.current ? letter : (set[getRandomInt(set.length)] ?? letter)
        )
      )

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      } else {
        setIsAnimating(false)
      }
    }

    animationFrameId = requestAnimationFrame(animate)
    return () => {
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId)
    }
  }, [children, duration, isAnimating])

  const letters = isAnimating ? displayText : children.split("")

  return (
    <MotionComponent
      ref={elementRef}
      className={cn("overflow-hidden py-2 text-4xl font-bold", className)}
      onMouseEnter={handleAnimationTrigger}
      {...props}
    >
      <span className="sr-only">{children}</span>
      <span aria-hidden="true">
        {letters.map((letter, index) => (
          <span key={index} className={cn("font-mono", letter === " " ? "w-3" : "")}>
            {letter.toUpperCase()}
          </span>
        ))}
      </span>
    </MotionComponent>
  )
}
