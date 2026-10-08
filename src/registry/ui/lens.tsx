"use client"

import { useState, type KeyboardEvent, type MouseEvent, type ReactNode } from "react"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"

export interface LensPosition {
  /** Distance from the left edge of the lens container, in pixels. */
  x: number
  /** Distance from the top edge of the lens container, in pixels. */
  y: number
}

export interface LensProps {
  /** The content to magnify. It is rendered twice (once magnified), so keep it presentational. */
  children: ReactNode
  className?: string
  /** Magnification inside the lens. Must be at least 1. */
  zoomFactor?: number
  /** Diameter of the lens in pixels. */
  lensSize?: number
  /** Where the lens sits when `isStatic` is set. */
  position?: LensPosition
  /** Where the lens rests while the pointer is outside. Keeps the lens always visible. */
  defaultPosition?: LensPosition
  /** Keep the lens at `position` instead of following the pointer. */
  isStatic?: boolean
  /** Seconds the lens takes to appear and disappear. */
  duration?: number
  /** Colour of the mask that shapes the lens. Any opaque colour behaves the same. */
  lensColor?: string
  /** Accessible name of the zoomable region. */
  ariaLabel?: string
}

const ORIGIN: LensPosition = { x: 0, y: 0 }

export function Lens({
  children,
  className,
  zoomFactor = 1.3,
  lensSize = 170,
  isStatic = false,
  position = ORIGIN,
  defaultPosition,
  duration = 0.1,
  lensColor = "black",
  ariaLabel = "Zoom Area",
}: LensProps) {
  if (zoomFactor < 1) throw new Error("Lens: zoomFactor must be greater than 1")
  if (lensSize < 0) throw new Error("Lens: lensSize must be greater than 0")

  const [isHovering, setIsHovering] = useState(false)
  const [mousePosition, setMousePosition] = useState<LensPosition>(position)

  const current = isStatic ? position : defaultPosition && !isHovering ? defaultPosition : mousePosition
  const alwaysVisible = isStatic || Boolean(defaultPosition)
  const maskImage = `radial-gradient(circle ${lensSize / 2}px at ${current.x}px ${current.y}px, ${lensColor} 100%, transparent 100%)`
  const origin = `${current.x}px ${current.y}px`

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setMousePosition({ x: event.clientX - rect.left, y: event.clientY - rect.top })
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") setIsHovering(false)
  }

  return (
    <div
      className={cn("relative z-20 overflow-hidden rounded-xl", className)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
    >
      {children}
      {/* A static / resting lens is visible from the start; only hover-triggered lenses animate in. */}
      <AnimatePresence initial={false}>
        {(alwaysVisible || isHovering) && (
          <motion.div
            key="lens"
            aria-hidden
            className="pointer-events-none absolute inset-0 z-50 overflow-hidden"
            style={{ transformOrigin: origin }}
            initial={{ opacity: 0, scale: 0.58 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration }}
          >
            <div className="absolute inset-0" style={{ maskImage, WebkitMaskImage: maskImage }}>
              <div className="absolute inset-0" style={{ transform: `scale(${zoomFactor})`, transformOrigin: origin }}>
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
