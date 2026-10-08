"use client"

import { useMemo, useState, type ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

export interface InteractiveGridPatternProps extends ComponentPropsWithoutRef<"svg"> {
  /** Width of one square in pixels. */
  width?: number
  /** Height of one square in pixels. */
  height?: number
  /** Number of squares as `[horizontal, vertical]`. */
  squares?: [horizontal: number, vertical: number]
  /** Classes for every square, e.g. `hover:fill-blue-500`. */
  squaresClassName?: string
}

const squareBaseClass = "stroke-gray-400/30 transition-all duration-100 ease-in-out not-[&:hover]:duration-1000"

export function InteractiveGridPattern({
  width = 40,
  height = 40,
  squares = [24, 24],
  className,
  squaresClassName,
  ...props
}: InteractiveGridPatternProps) {
  const [horizontal, vertical] = squares
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null)

  // Resolved once, not per square, so hovering stays cheap on large grids.
  const idleSquareClass = useMemo(() => cn(squareBaseClass, "fill-transparent", squaresClassName), [squaresClassName])
  const hoveredSquareClass = useMemo(() => cn(squareBaseClass, "fill-gray-300/30", squaresClassName), [squaresClassName])

  return (
    <svg
      aria-hidden="true"
      width={width * horizontal}
      height={height * vertical}
      {...props}
      className={cn("absolute inset-0 h-full w-full border border-gray-400/30", className)}
    >
      {Array.from({ length: horizontal * vertical }, (_, index) => (
        <rect
          key={index}
          x={(index % horizontal) * width}
          y={Math.floor(index / horizontal) * height}
          width={width}
          height={height}
          className={hoveredSquare === index ? hoveredSquareClass : idleSquareClass}
          onMouseEnter={() => setHoveredSquare(index)}
          onMouseLeave={() => setHoveredSquare(null)}
        />
      ))}
    </svg>
  )
}
