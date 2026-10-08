"use client"

import {
  Children,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
  type RefAttributes,
} from "react"
import { motion, useInView, type HTMLMotionProps, type MotionProps } from "motion/react"

import { cn } from "@/lib/utils"

interface SequenceContextValue {
  completeItem: (index: number) => void
  activeIndex: number
  sequenceStarted: boolean
}

const SequenceContext = createContext<SequenceContextValue | null>(null)
const useSequence = () => useContext(SequenceContext)

const ItemIndexContext = createContext<number | null>(null)
const useItemIndex = () => useContext(ItemIndexContext)

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

type MotionElementType = keyof typeof motionElements
type TypingMotionComponent = ComponentType<Omit<HTMLMotionProps<"span">, "ref"> & RefAttributes<HTMLElement>>

export interface AnimatedSpanProps extends MotionProps {
  children: ReactNode
  className?: string
  /** Milliseconds to wait before fading in. Only used when the terminal's `sequence` is off. */
  delay?: number
  /** Wait until the line scrolls into view. Only used when the terminal's `sequence` is off. */
  startOnView?: boolean
}

export function AnimatedSpan({ children, delay = 0, className, startOnView = false, ...props }: AnimatedSpanProps) {
  const elementRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(elementRef, { amount: 0.3, once: true })

  const sequence = useSequence()
  const itemIndex = useItemIndex()
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (!sequence || itemIndex === null || !sequence.sequenceStarted || hasStarted) return
    if (sequence.activeIndex === itemIndex) setHasStarted(true)
  }, [sequence, hasStarted, itemIndex])

  const shouldAnimate = sequence ? hasStarted : startOnView ? isInView : true

  return (
    <motion.div
      ref={elementRef}
      initial={{ opacity: 0, y: -5 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: -5 }}
      transition={{ duration: 0.3, delay: sequence ? 0 : delay / 1000 }}
      className={cn("grid text-sm font-normal tracking-tight", className)}
      onAnimationComplete={() => {
        // Only a line that actually played may hand over to the next one.
        if (!sequence || itemIndex === null || !hasStarted) return
        sequence.completeItem(itemIndex)
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export interface TerminalTypingAnimationProps extends Omit<MotionProps, "children"> {
  /** The text to type. */
  children: string
  className?: string
  /** Milliseconds per character. */
  duration?: number
  /** Milliseconds to wait before typing. Only used when the terminal's `sequence` is off. */
  delay?: number
  /** Element to render. */
  as?: MotionElementType
  /** Wait until the line scrolls into view. Only used when the terminal's `sequence` is off. */
  startOnView?: boolean
}

/** Magic UI's `TypingAnimation`, renamed so it doesn't clash with the standalone Typing Animation component. */
export function TerminalTypingAnimation({
  children,
  className,
  duration = 60,
  delay = 0,
  as: Component = "span",
  startOnView = true,
  ...props
}: TerminalTypingAnimationProps) {
  if (typeof children !== "string") {
    throw new Error("TerminalTypingAnimation: children must be a string.")
  }

  const MotionComponent = motionElements[Component] as TypingMotionComponent
  const text = children.trim()

  const [displayedText, setDisplayedText] = useState("")
  const [started, setStarted] = useState(false)
  const elementRef = useRef<HTMLElement | null>(null)
  const isInView = useInView(elementRef, { amount: 0.3, once: true })

  const sequence = useSequence()
  const itemIndex = useItemIndex()
  const hasSequence = sequence !== null
  const sequenceStarted = sequence?.sequenceStarted ?? false
  const sequenceActiveIndex = sequence?.activeIndex ?? null
  const completeItemRef = useRef<SequenceContextValue["completeItem"] | null>(null)

  useEffect(() => {
    completeItemRef.current = sequence?.completeItem ?? null
  }, [sequence?.completeItem])

  useEffect(() => {
    if (started) return
    if (hasSequence && itemIndex !== null) {
      if (sequenceStarted && sequenceActiveIndex === itemIndex) setStarted(true)
      return
    }
    if (startOnView && !isInView) return
    const startTimeout = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(startTimeout)
  }, [delay, startOnView, isInView, started, hasSequence, sequenceActiveIndex, sequenceStarted, itemIndex])

  useEffect(() => {
    if (!started) return
    const characters = Array.from(text)
    let index = 0
    const typingEffect = setInterval(() => {
      if (index < characters.length) {
        index++
        setDisplayedText(characters.slice(0, index).join(""))
        return
      }
      clearInterval(typingEffect)
      if (itemIndex !== null) completeItemRef.current?.(itemIndex)
    }, duration)
    return () => clearInterval(typingEffect)
  }, [text, duration, started, itemIndex])

  return (
    <MotionComponent ref={elementRef} className={cn("text-sm font-normal tracking-tight", className)} {...props}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{displayedText}</span>
    </MotionComponent>
  )
}

export interface TerminalProps {
  /** The terminal lines: `TerminalTypingAnimation` and `AnimatedSpan` components, in order. */
  children: ReactNode
  className?: string
  /** Play the lines one after another: each line starts when the previous one finishes. */
  sequence?: boolean
  /** Wait until the terminal scrolls into view before starting the sequence. */
  startOnView?: boolean
}

export function Terminal({ children, className, sequence = true, startOnView = true }: TerminalProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(containerRef, { amount: 0.3, once: true })

  const [activeIndex, setActiveIndex] = useState(0)
  const sequenceHasStarted = sequence ? !startOnView || isInView : false

  const contextValue = useMemo<SequenceContextValue | null>(() => {
    if (!sequence) return null
    return {
      completeItem: (index: number) => {
        setActiveIndex((current) => (index === current ? current + 1 : current))
      },
      activeIndex,
      sequenceStarted: sequenceHasStarted,
    }
  }, [sequence, activeIndex, sequenceHasStarted])

  const wrappedChildren = useMemo(() => {
    if (!sequence) return children
    return Children.toArray(children).map((child, index) => (
      <ItemIndexContext.Provider key={index} value={index}>
        {child}
      </ItemIndexContext.Provider>
    ))
  }, [children, sequence])

  return (
    <SequenceContext.Provider value={contextValue}>
      <div
        ref={containerRef}
        className={cn("z-0 h-full max-h-100 w-full max-w-lg rounded-xl border border-border bg-background", className)}
      >
        <div className="flex flex-col gap-y-2 border-b border-border p-4">
          <div className="flex flex-row gap-x-2" aria-hidden="true">
            <div className="size-2 rounded-full bg-red-500" />
            <div className="size-2 rounded-full bg-yellow-500" />
            <div className="size-2 rounded-full bg-green-500" />
          </div>
        </div>
        <pre className="p-4">
          <code className="grid gap-y-1 overflow-auto">{wrappedChildren}</code>
        </pre>
      </div>
    </SequenceContext.Provider>
  )
}
