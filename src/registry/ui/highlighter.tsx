"use client"

import { useLayoutEffect, useRef, type ReactNode } from "react"
import { useInView } from "motion/react"
import { annotate } from "rough-notation"
import type { RoughAnnotation } from "rough-notation/lib/model"

import { cn } from "@/lib/utils"

export interface HighlighterProps {
  /** The content to annotate. */
  children: ReactNode
  className?: string
  /** The kind of annotation to draw. */
  action?: "highlight" | "underline" | "box" | "circle" | "strike-through" | "crossed-off" | "bracket"
  /** Colour of the annotation. */
  color?: string
  /** Stroke width in pixels. */
  strokeWidth?: number
  /** Milliseconds the drawing animation takes. */
  animationDuration?: number
  /** How many times the annotation is drawn; more than 1 gives a sketchier look. */
  iterations?: number
  /** Padding between the text and the annotation, in pixels. */
  padding?: number
  /** Annotate each line of wrapped text separately. */
  multiline?: boolean
  /** Wait until the text scrolls into view before drawing. */
  isView?: boolean
}

export function Highlighter({
  children,
  className,
  action = "highlight",
  color = "#ffd1dc",
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = false,
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null)

  const isInView = useInView(elementRef, {
    once: true,
    margin: "-10%",
  })

  // Draw straight away, or once in view when `isView` is set.
  const shouldShow = !isView || isInView

  useLayoutEffect(() => {
    const element = elementRef.current
    if (!shouldShow || !element) return

    const annotation: RoughAnnotation = annotate(element, {
      type: action,
      color,
      strokeWidth,
      animationDuration,
      iterations,
      padding,
      multiline,
    })
    annotation.show()

    // Re-draw when the text reflows so the annotation keeps hugging it.
    const resizeObserver = new ResizeObserver(() => {
      annotation.hide()
      annotation.show()
    })
    resizeObserver.observe(element)
    resizeObserver.observe(document.body)

    return () => {
      annotation.remove()
      resizeObserver.disconnect()
    }
  }, [shouldShow, action, color, strokeWidth, animationDuration, iterations, padding, multiline])

  return (
    <span ref={elementRef} className={cn("relative inline-block bg-transparent", className)}>
      {children}
    </span>
  )
}
