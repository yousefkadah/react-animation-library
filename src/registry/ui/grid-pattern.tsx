"use client"

import { useId, type ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

export interface GridPatternProps extends ComponentPropsWithoutRef<"svg"> {
  /** Width of one grid cell in pixels. */
  width?: number
  /** Height of one grid cell in pixels. */
  height?: number
  /** Horizontal offset of the pattern in pixels. */
  x?: number
  /** Vertical offset of the pattern in pixels. */
  y?: number
  /** `[column, row]` cells to fill in. */
  squares?: Array<[x: number, y: number]>
  /** SVG `stroke-dasharray` of the grid lines, e.g. `4 2` for dashes. */
  strokeDasharray?: string
}

export function GridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = "0",
  squares,
  className,
  ...props
}: GridPatternProps) {
  const id = useId()

  return (
    <svg
      aria-hidden="true"
      {...props}
      className={cn("pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30", className)}
    >
      <defs>
        <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
          <path d={`M.5 ${height}V.5H${width}`} fill="none" strokeDasharray={strokeDasharray} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
      {squares && squares.length > 0 && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([squareX, squareY], index) => (
            <rect
              key={`${index}-${squareX}-${squareY}`}
              strokeWidth="0"
              width={width - 1}
              height={height - 1}
              x={squareX * width + 1}
              y={squareY * height + 1}
            />
          ))}
        </svg>
      )}
    </svg>
  )
}
