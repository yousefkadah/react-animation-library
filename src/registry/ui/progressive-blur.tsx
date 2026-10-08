import type { ComponentPropsWithoutRef, CSSProperties } from "react"

import { cn } from "@/lib/utils"

export interface ProgressiveBlurProps extends ComponentPropsWithoutRef<"div"> {
  /** Height of the blurred band, e.g. `30%` or `120px`. Ignored when `position` is `both`. */
  height?: string
  /** Edge the blur sits on. `both` covers the whole container. */
  position?: "top" | "bottom" | "both"
  /** Blur radius of each stacked layer, in pixels, from the faintest to the strongest. */
  blurLevels?: number[]
}

const DEFAULT_BLUR_LEVELS = [0.5, 1, 2, 4, 8, 16, 32, 64]
const FULL_MASK = "linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)"

/**
 * Each layer blurs more than the last and is masked to a band 12.5% further along, so the blur
 * ramps up smoothly toward the edge instead of starting with a hard line.
 */
function layerStyles(position: NonNullable<ProgressiveBlurProps["position"]>, levels: number[]): CSSProperties[] {
  const direction = position === "top" ? "to top" : "to bottom"
  const band = (from: number, to: number, end: number) =>
    position === "both"
      ? FULL_MASK
      : `linear-gradient(${direction}, rgba(0,0,0,0) ${from}%, rgba(0,0,0,1) ${to}%, rgba(0,0,0,1) ${end}%, rgba(0,0,0,0) ${end + 12.5}%)`

  return levels.map((blur, index) => {
    let mask: string
    if (index === 0) mask = band(0, 12.5, 25)
    else if (index === levels.length - 1)
      mask = position === "both" ? FULL_MASK : `linear-gradient(${direction}, rgba(0,0,0,0) 87.5%, rgba(0,0,0,1) 100%)`
    else mask = band(index * 12.5, (index + 1) * 12.5, (index + 2) * 12.5)

    return {
      zIndex: index + 1,
      backdropFilter: `blur(${blur}px)`,
      WebkitBackdropFilter: `blur(${blur}px)`,
      maskImage: mask,
      WebkitMaskImage: mask,
    }
  })
}

export function ProgressiveBlur({
  className,
  height = "30%",
  position = "bottom",
  blurLevels = DEFAULT_BLUR_LEVELS,
  style,
  children,
  ...props
}: ProgressiveBlurProps) {
  return (
    <div
      {...props}
      className={cn(
        "pointer-events-none absolute inset-x-0 z-10",
        className,
        position === "top" ? "top-0" : position === "bottom" ? "bottom-0" : "inset-y-0"
      )}
      style={{ height: position === "both" ? "100%" : height, ...style }}
    >
      {layerStyles(position, blurLevels).map((layerStyle, index) => (
        <div key={index} aria-hidden className="absolute inset-0" style={layerStyle} />
      ))}
      {children}
    </div>
  )
}
