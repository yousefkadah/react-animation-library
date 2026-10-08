var e=`"use client"

import { useEffect, useMemo, useState } from "react"

import { cn } from "@/lib/utils"

export interface PixelImageGrid {
  rows: number
  cols: number
}

/** Predefined grids, named columns × rows. */
export type PixelImageGridName = "6x4" | "8x8" | "8x3" | "4x6" | "3x8"

const DEFAULT_GRIDS: Record<PixelImageGridName, PixelImageGrid> = {
  "6x4": { rows: 4, cols: 6 },
  "8x8": { rows: 8, cols: 8 },
  "8x3": { rows: 3, cols: 8 },
  "4x6": { rows: 6, cols: 4 },
  "3x8": { rows: 8, cols: 3 },
}

const MIN_GRID = 1
const MAX_GRID = 16

export interface PixelImageProps {
  /** The image source URL. */
  src: string
  /** Alternative text for the whole image. Leave empty for a decorative image. */
  alt?: string
  className?: string
  /** Predefined grid, columns × rows. */
  grid?: PixelImageGridName
  /** Custom grid (1–16 rows and columns). Takes precedence over \`grid\`. */
  customGrid?: PixelImageGrid
  /** Fade from grayscale to full colour after the pixels have appeared. */
  grayscaleAnimation?: boolean
  /** Milliseconds each pixel takes to fade in. */
  pixelFadeInDuration?: number
  /** Maximum random delay, in milliseconds, before a pixel fades in. */
  maxAnimationDelay?: number
  /** Milliseconds before the colour is revealed. */
  colorRevealDelay?: number
}

const isValidGrid = (grid?: PixelImageGrid): grid is PixelImageGrid =>
  !!grid &&
  Number.isInteger(grid.rows) &&
  Number.isInteger(grid.cols) &&
  grid.rows >= MIN_GRID &&
  grid.cols >= MIN_GRID &&
  grid.rows <= MAX_GRID &&
  grid.cols <= MAX_GRID

export function PixelImage({
  src,
  alt = "",
  className,
  grid = "6x4",
  grayscaleAnimation = true,
  pixelFadeInDuration = 1000,
  maxAnimationDelay = 1200,
  colorRevealDelay = 1300,
  customGrid,
}: PixelImageProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [showColor, setShowColor] = useState(false)
  const [delays, setDelays] = useState<number[]>([])

  const { rows, cols } = isValidGrid(customGrid) ? customGrid : DEFAULT_GRIDS[grid]

  const clipPaths = useMemo(
    () =>
      Array.from({ length: rows * cols }, (_, index) => {
        const row = Math.floor(index / cols)
        const col = index % cols
        const left = col * (100 / cols)
        const right = (col + 1) * (100 / cols)
        const top = row * (100 / rows)
        const bottom = (row + 1) * (100 / rows)
        return \`polygon(\${left}% \${top}%, \${right}% \${top}%, \${right}% \${bottom}%, \${left}% \${bottom}%)\`
      }),
    [rows, cols]
  )

  // Random delays are created after mount so server and client render the same markup.
  useEffect(() => {
    setDelays(Array.from({ length: rows * cols }, () => Math.random() * maxAnimationDelay))
  }, [rows, cols, maxAnimationDelay])

  useEffect(() => {
    // Wait for the hidden state to be painted so the pixels transition in.
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => setIsVisible(true))
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    const colorTimeout = setTimeout(() => setShowColor(true), colorRevealDelay)
    return () => clearTimeout(colorTimeout)
  }, [colorRevealDelay])

  return (
    <div
      className={cn("relative h-72 w-72 select-none md:h-96 md:w-96", className)}
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
    >
      {clipPaths.map((clipPath, index) => (
        <div
          key={index}
          className={cn("absolute inset-0 transition-all ease-out", isVisible ? "opacity-100" : "opacity-0")}
          style={{
            clipPath,
            transitionDelay: \`\${delays[index] ?? 0}ms\`,
            transitionDuration: \`\${pixelFadeInDuration}ms\`,
          }}
          aria-hidden="true"
        >
          <img
            src={src}
            alt=""
            className={cn(
              "z-1 size-full rounded-[2.5rem] object-cover",
              grayscaleAnimation && (showColor ? "grayscale-0" : "grayscale")
            )}
            style={{
              transition: grayscaleAnimation ? \`filter \${pixelFadeInDuration}ms cubic-bezier(0.4, 0, 0.2, 1)\` : "none",
            }}
            draggable={false}
          />
        </div>
      ))}
    </div>
  )
}
`;export{e as default};