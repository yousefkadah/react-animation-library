var e=`"use client"

import { useEffect, useMemo, useRef, useState, type ComponentType, type RefAttributes, type RefObject } from "react"
import { motion, useInView, type DOMMotionComponents, type HTMLMotionProps, type MotionProps } from "motion/react"

import { cn } from "@/lib/utils"

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
type TypingAnimationMotionComponent = ComponentType<Omit<HTMLMotionProps<"span">, "ref"> & RefAttributes<HTMLElement>>

export interface TypingAnimationProps extends Omit<MotionProps, "children"> {
  /** A single string to type. */
  children?: string
  /** Strings to type and delete in sequence. Takes precedence over \`children\`. */
  words?: string[]
  className?: string
  /** Milliseconds per character. Used as the typing speed when \`typeSpeed\` is not set. */
  duration?: number
  /** Milliseconds per typed character. Defaults to \`duration\`. */
  typeSpeed?: number
  /** Milliseconds per deleted character. Defaults to half the typing speed. */
  deleteSpeed?: number
  /** Milliseconds to wait before typing starts. */
  delay?: number
  /** Milliseconds to pause on a finished word before deleting it. */
  pauseDelay?: number
  /** Keep cycling through the words forever. */
  loop?: boolean
  /** Element to render. */
  as?: MotionElementType
  /** Wait until the element scrolls into view before typing. */
  startOnView?: boolean
  /** Show the typing cursor. */
  showCursor?: boolean
  /** Blink the cursor. */
  blinkCursor?: boolean
  /** Cursor glyph. */
  cursorStyle?: "line" | "block" | "underscore"
}

const cursorChars = { line: "|", block: "▌", underscore: "_" } as const

export function TypingAnimation({
  children,
  words,
  className,
  duration = 100,
  typeSpeed,
  deleteSpeed,
  delay = 0,
  pauseDelay = 1000,
  loop = false,
  as: Component = "span",
  startOnView = true,
  showCursor = true,
  blinkCursor = true,
  cursorStyle = "line",
  ...props
}: TypingAnimationProps) {
  const MotionComponent = motionElements[Component] as TypingAnimationMotionComponent

  const [displayedText, setDisplayedText] = useState("")
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [phase, setPhase] = useState<"typing" | "pause" | "deleting">("typing")
  const elementRef = useRef<HTMLElement | null>(null)
  const isInView = useInView(elementRef as RefObject<Element>, { amount: 0.3, once: true })

  const wordsToAnimate = useMemo(() => words ?? (children ? [children] : []), [words, children])
  const hasMultipleWords = wordsToAnimate.length > 1

  const typingSpeed = typeSpeed ?? duration
  const deletingSpeed = deleteSpeed ?? typingSpeed / 2

  const shouldStart = startOnView ? isInView : true
  const animationSourceKey = useMemo(() => (words ? words.join("\\u0000") : (children ?? "")), [words, children])

  useEffect(() => {
    setDisplayedText("")
    setCurrentWordIndex(0)
    setCurrentCharIndex(0)
    setPhase("typing")
  }, [animationSourceKey])

  useEffect(() => {
    if (!shouldStart || wordsToAnimate.length === 0) return

    const timeoutDelay =
      delay > 0 && displayedText === ""
        ? delay
        : phase === "typing"
          ? typingSpeed
          : phase === "deleting"
            ? deletingSpeed
            : pauseDelay

    const timeout = setTimeout(() => {
      const graphemes = Array.from(wordsToAnimate[currentWordIndex] ?? "")

      switch (phase) {
        case "typing":
          if (currentCharIndex < graphemes.length) {
            setDisplayedText(graphemes.slice(0, currentCharIndex + 1).join(""))
            setCurrentCharIndex(currentCharIndex + 1)
          } else if (hasMultipleWords || loop) {
            const isLastWord = currentWordIndex === wordsToAnimate.length - 1
            if (!isLastWord || loop) setPhase("pause")
          }
          break
        case "pause":
          setPhase("deleting")
          break
        case "deleting":
          if (currentCharIndex > 0) {
            setDisplayedText(graphemes.slice(0, currentCharIndex - 1).join(""))
            setCurrentCharIndex(currentCharIndex - 1)
          } else {
            setCurrentWordIndex((currentWordIndex + 1) % wordsToAnimate.length)
            setPhase("typing")
          }
          break
      }
    }, timeoutDelay)

    return () => clearTimeout(timeout)
  }, [
    shouldStart,
    phase,
    currentCharIndex,
    currentWordIndex,
    displayedText,
    wordsToAnimate,
    hasMultipleWords,
    loop,
    typingSpeed,
    deletingSpeed,
    pauseDelay,
    delay,
  ])

  const currentWordLength = Array.from(wordsToAnimate[currentWordIndex] ?? "").length
  const isComplete =
    !loop &&
    currentWordIndex === wordsToAnimate.length - 1 &&
    currentCharIndex >= currentWordLength &&
    phase !== "deleting"

  const shouldShowCursor =
    showCursor && !isComplete && (hasMultipleWords || loop || currentCharIndex < currentWordLength)

  return (
    <MotionComponent
      ref={elementRef}
      className={cn("leading-20 tracking-[-0.02em]", Component === "span" && "inline-block", className)}
      {...props}
    >
      {/* The whole text for assistive tech, which would otherwise hear every keystroke. */}
      <span className="sr-only">{wordsToAnimate.join(", ")}</span>
      <span aria-hidden="true">
        {displayedText}
        {shouldShowCursor && (
          <span className={cn("inline-block", blinkCursor && "animate-blink-cursor motion-reduce:animate-none")}>
            {cursorChars[cursorStyle] ?? cursorChars.line}
          </span>
        )}
      </span>
    </MotionComponent>
  )
}
`;export{e as default};