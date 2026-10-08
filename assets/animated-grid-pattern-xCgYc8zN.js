var e=`"use client"

import { useCallback, useEffect, useId, useRef, useState, type ComponentPropsWithoutRef } from "react"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

export interface AnimatedGridPatternProps extends ComponentPropsWithoutRef<"svg"> {
  /** Width of one grid cell in pixels. */
  width?: number
  /** Height of one grid cell in pixels. */
  height?: number
  /** Horizontal offset of the pattern in pixels. */
  x?: number
  /** Vertical offset of the pattern in pixels. */
  y?: number
  /** SVG \`stroke-dasharray\` of the grid lines. */
  strokeDasharray?: number | string
  /** Number of squares lit up at any time. */
  numSquares?: number
  /** Opacity a square fades up to. */
  maxOpacity?: number
  /** Seconds a square takes to fade in (and again to fade out). */
  duration?: number
  /** Seconds a square stays lit before fading out. */
  repeatDelay?: number
}

interface Square {
  id: number
  pos: [number, number]
  iteration: number
}

export function AnimatedGridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 50,
  className,
  maxOpacity = 0.5,
  duration = 4,
  repeatDelay = 0.5,
  ...props
}: AnimatedGridPatternProps) {
  const id = useId()
  const svgRef = useRef<SVGSVGElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [squares, setSquares] = useState<Square[]>([])
  const reducedMotion = useReducedMotion()

  const randomPosition = useCallback(
    (): [number, number] => [
      Math.floor((Math.random() * dimensions.width) / width),
      Math.floor((Math.random() * dimensions.height) / height),
    ],
    [dimensions.width, dimensions.height, width, height]
  )

  /** Once a square has faded in and out, it reappears somewhere else. */
  const moveSquare = useCallback(
    (squareId: number) => {
      setSquares((current) => {
        const square = current[squareId]
        if (!square) return current
        const next = current.slice()
        next[squareId] = { ...square, pos: randomPosition(), iteration: square.iteration + 1 }
        return next
      })
    },
    [randomPosition]
  )

  // Positions are random, so they are generated after mount (never during render).
  useEffect(() => {
    if (!dimensions.width || !dimensions.height) return
    setSquares(Array.from({ length: numSquares }, (_, index) => ({ id: index, pos: randomPosition(), iteration: 0 })))
  }, [dimensions.width, dimensions.height, numSquares, randomPosition])

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: nextWidth, height: nextHeight } = entry.contentRect
        setDimensions((current) =>
          current.width === nextWidth && current.height === nextHeight ? current : { width: nextWidth, height: nextHeight }
        )
      }
    })
    resizeObserver.observe(svg)
    return () => resizeObserver.disconnect()
  }, [])

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      {...props}
      className={cn("pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30", className)}
    >
      <defs>
        <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
          <path d={\`M.5 \${height}V.5H\${width}\`} fill="none" strokeDasharray={strokeDasharray} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={\`url(#\${id})\`} />
      <svg x={x} y={y} className="overflow-visible">
        {squares.map(({ pos: [squareX, squareY], id: squareId, iteration }, index) =>
          reducedMotion ? (
            <rect
              key={squareId}
              width={width - 1}
              height={height - 1}
              x={squareX * width + 1}
              y={squareY * height + 1}
              opacity={maxOpacity}
              fill="currentColor"
              strokeWidth="0"
            />
          ) : (
            <motion.rect
              key={\`\${squareId}-\${iteration}\`}
              initial={{ opacity: 0 }}
              animate={{ opacity: maxOpacity }}
              transition={{ duration, repeat: 1, delay: index * 0.1, repeatType: "reverse", repeatDelay }}
              onAnimationComplete={() => moveSquare(squareId)}
              width={width - 1}
              height={height - 1}
              x={squareX * width + 1}
              y={squareY * height + 1}
              fill="currentColor"
              strokeWidth="0"
            />
          )
        )}
      </svg>
    </svg>
  )
}
`;export{e as default};