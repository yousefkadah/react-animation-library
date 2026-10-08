"use client"

import { useId, type ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

export interface StripedPatternProps extends ComponentPropsWithoutRef<"svg"> {
  /** Which way the stripes lean. */
  direction?: "left" | "right"
  /** Width of one pattern tile in pixels (the horizontal spacing of the stripes). */
  width?: number | string
  /** Height of one pattern tile in pixels. */
  height?: number | string
}

export function StripedPattern({ direction = "left", className, width = 10, height = 10, ...props }: StripedPatternProps) {
  const id = useId()
  const w = Number(width)
  const h = Number(height)

  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={cn("pointer-events-none absolute inset-0 z-10 h-full w-full stroke-[0.5]", className)}
    >
      <defs>
        <pattern id={id} width={w} height={h} patternUnits="userSpaceOnUse">
          {direction === "left" ? (
            <>
              <line x1="0" y1={h} x2={w} y2="0" stroke="currentColor" />
              <line x1={-w} y1={h} x2="0" y2="0" stroke="currentColor" />
              <line x1={w} y1={h} x2={w * 2} y2="0" stroke="currentColor" />
            </>
          ) : (
            <>
              <line x1="0" y1="0" x2={w} y2={h} stroke="currentColor" />
              <line x1={-w} y1="0" x2="0" y2={h} stroke="currentColor" />
              <line x1={w} y1="0" x2={w * 2} y2={h} stroke="currentColor" />
            </>
          )}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}
