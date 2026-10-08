"use client"

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

export interface NeonColorsProps {
  firstColor: string
  secondColor: string
}

export interface NeonGradientCardProps extends HTMLAttributes<HTMLElement> {
  /** Element to render the card as. */
  as?: ElementType
  /** Width of the neon border in pixels. */
  borderSize?: number
  /** Corner radius in pixels. */
  borderRadius?: number
  /** The two colours of the neon gradient. */
  neonColors?: NeonColorsProps
}

/** Static classes for the inner surface and its two neon layers (`before` = border, `after` = glow). */
const innerClass = [
  "relative size-full min-h-[inherit] rounded-(--card-content-radius) bg-gray-100 p-6",
  "before:absolute before:-top-(--border-size) before:-left-(--border-size) before:-z-10 before:block",
  "before:h-(--pseudo-element-height) before:w-(--pseudo-element-width) before:rounded-(--border-radius)",
  "before:bg-[linear-gradient(0deg,var(--neon-first-color),var(--neon-second-color))] before:bg-size-[100%_200%]",
  "before:animate-background-position-spin motion-reduce:before:animate-none",
  "after:absolute after:-top-(--border-size) after:-left-(--border-size) after:-z-10 after:block",
  "after:h-(--pseudo-element-height) after:w-(--pseudo-element-width) after:rounded-(--border-radius) after:blur-(--after-blur)",
  "after:bg-[linear-gradient(0deg,var(--neon-first-color),var(--neon-second-color))] after:bg-size-[100%_200%] after:opacity-80",
  "after:animate-background-position-spin motion-reduce:after:animate-none",
  "dark:bg-neutral-900",
  "wrap-break-word",
].join(" ")

const defaultNeonColors: NeonColorsProps = { firstColor: "#ff00aa", secondColor: "#00FFF1" }

export function NeonGradientCard({
  as: Component = "div",
  className,
  children,
  style,
  borderSize = 2,
  borderRadius = 20,
  neonColors = defaultNeonColors,
  ...props
}: NeonGradientCardProps) {
  const containerRef = useRef<HTMLElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const updateDimensions = () => {
      setDimensions({ width: container.offsetWidth, height: container.offsetHeight })
    }
    updateDimensions()
    const resizeObserver = new ResizeObserver(updateDimensions)
    resizeObserver.observe(container)
    return () => resizeObserver.disconnect()
  }, [])

  const { width, height } = dimensions
  const { firstColor, secondColor } = neonColors

  return (
    <Component
      {...props}
      ref={containerRef}
      style={
        {
          "--border-size": `${borderSize}px`,
          "--border-radius": `${borderRadius}px`,
          "--neon-first-color": firstColor,
          "--neon-second-color": secondColor,
          "--card-width": `${width}px`,
          "--card-height": `${height}px`,
          "--card-content-radius": `${borderRadius - borderSize}px`,
          "--pseudo-element-background-image": `linear-gradient(0deg, ${firstColor}, ${secondColor})`,
          "--pseudo-element-width": `${width + borderSize * 2}px`,
          "--pseudo-element-height": `${height + borderSize * 2}px`,
          "--after-blur": `${width / 3}px`,
          ...style,
        } as CSSProperties
      }
      className={cn("relative z-10 size-full rounded-(--border-radius)", className)}
    >
      <div className={innerClass}>{children}</div>
    </Component>
  )
}
