"use client"

import { useRef, type ComponentPropsWithoutRef, type RefObject } from "react"
import { motion, useScroll, useTransform, type MotionValue } from "motion/react"

import { cn } from "@/lib/utils"

export interface TextRevealProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /** The text to reveal word by word. */
  children: string
  /**
   * The scrolling element to track. Defaults to the page. Set it when TextReveal sits
   * inside its own `overflow-y-auto` box.
   */
  container?: RefObject<HTMLElement | null>
}

export function TextReveal({ children, className, container, ...props }: TextRevealProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, container })

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string")
  }

  const words = children.split(" ")

  return (
    <div ref={sectionRef} className={cn("relative z-0 h-[200vh]", className)} {...props}>
      <div className="sticky top-0 mx-auto flex h-[50%] max-w-4xl items-center bg-transparent px-4 py-20">
        <span className="sr-only">{children}</span>
        <span
          aria-hidden="true"
          className="flex flex-wrap p-5 text-2xl font-bold text-foreground/20 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl"
        >
          {words.map((word, index) => {
            const start = index / words.length
            const end = start + 1 / words.length
            return <Word key={index} progress={scrollYProgress} range={[start, end]} word={word} />
          })}
        </span>
      </div>
    </div>
  )
}

interface WordProps {
  word: string
  /** Scroll progress of the whole TextReveal section, 0–1. */
  progress: MotionValue<number>
  /** The slice of `progress` over which this word fades in. */
  range: [number, number]
}

function Word({ word, progress, range }: WordProps) {
  const opacity = useTransform(progress, range, [0, 1])
  return (
    <span className="relative mx-1 lg:mx-1.5">
      <span className="absolute opacity-30">{word}</span>
      <motion.span style={{ opacity }} className="text-foreground">
        {word}
      </motion.span>
    </span>
  )
}
