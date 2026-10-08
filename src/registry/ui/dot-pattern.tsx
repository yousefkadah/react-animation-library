"use client"

import { useEffect, useId, useRef, useState, type ComponentPropsWithoutRef, type CSSProperties } from "react"

import { cn } from "@/lib/utils"

export interface DotPatternProps extends ComponentPropsWithoutRef<"svg"> {
  /** Horizontal spacing between dots in pixels. */
  width?: number
  /** Vertical spacing between dots in pixels. */
  height?: number
  /** Horizontal offset of the whole pattern in pixels. */
  x?: number
  /** Vertical offset of the whole pattern in pixels. */
  y?: number
  /** Horizontal offset of each dot inside its cell. */
  cx?: number
  /** Vertical offset of each dot inside its cell. */
  cy?: number
  /** Radius of each dot. */
  cr?: number
  /** Make every dot pulse with a soft glow, each on its own random rhythm. */
  glow?: boolean
}

interface GlowDot {
  x: number
  y: number
  style: CSSProperties
}

export function DotPattern({
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  glow = false,
  className,
  ...props
}: DotPatternProps) {
  const id = useId()
  const svgRef = useRef<SVGSVGElement>(null)
  const [dots, setDots] = useState<GlowDot[]>([])

  // Glowing dots are individual circles (each needs its own timing), so they need the container size.
  // Their random timings are generated here, after mount, so server and client renders match.
  useEffect(() => {
    const svg = svgRef.current
    if (!glow || !svg) return
    let size = { width: -1, height: -1 }
    const measure = () => {
      const { width: boxWidth, height: boxHeight } = svg.getBoundingClientRect()
      if (boxWidth === size.width && boxHeight === size.height) return
      size = { width: boxWidth, height: boxHeight }
      const columns = Math.ceil(boxWidth / width)
      const rows = Math.ceil(boxHeight / height)
      setDots(
        Array.from({ length: columns * rows }, (_, index) => ({
          x: (index % columns) * width + cx + x,
          y: Math.floor(index / columns) * height + cy + y,
          style: {
            animationDelay: `${(Math.random() * 5).toFixed(2)}s`,
            animationDuration: `${(Math.random() * 3 + 2).toFixed(2)}s`,
          },
        }))
      )
    }
    measure()
    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(svg)
    return () => resizeObserver.disconnect()
  }, [glow, width, height, x, y, cx, cy])

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      {...props}
      className={cn("pointer-events-none absolute inset-0 h-full w-full text-neutral-400/80", className)}
    >
      <defs>
        {glow ? (
          <radialGradient id={`${id}-gradient`}>
            <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        ) : (
          <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
            <circle cx={cx} cy={cy} r={cr} fill="currentColor" />
          </pattern>
        )}
      </defs>
      {glow ? (
        <g>
          {dots.map((dot) => (
            <circle
              key={`${dot.x}-${dot.y}`}
              cx={dot.x}
              cy={dot.y}
              r={cr}
              fill={`url(#${id}-gradient)`}
              className="animate-dot-pattern-glow origin-center [transform-box:fill-box] motion-reduce:animate-none"
              style={dot.style}
            />
          ))}
        </g>
      ) : (
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      )}
    </svg>
  )
}
