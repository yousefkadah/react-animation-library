import type { ComponentPropsWithoutRef, CSSProperties } from "react"

import { cn } from "@/lib/utils"

export interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  /** Scroll right-to-left (or bottom-to-top when vertical) instead. */
  reverse?: boolean
  /** Pause the animation while the pointer is over the marquee. */
  pauseOnHover?: boolean
  /** Scroll vertically instead of horizontally. */
  vertical?: boolean
  /** How many copies of the content to render so the loop never shows a gap. */
  repeat?: number
  /** Duration of one loop, e.g. `20s`. Defaults to `40s`. */
  duration?: string
  /** Gap between items, e.g. `2rem`. Defaults to `1rem`. */
  gap?: string
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  vertical = false,
  repeat = 4,
  duration,
  gap,
  style,
  children,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      style={{ "--duration": duration, "--gap": gap, ...style } as CSSProperties}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        vertical ? "flex-col" : "flex-row",
        className
      )}
    >
      {Array.from({ length: repeat }, (_, index) => (
        <div
          key={index}
          aria-hidden={index > 0 ? true : undefined}
          className={cn(
            "flex shrink-0 justify-around [gap:var(--gap)] motion-reduce:[animation-play-state:paused]",
            vertical ? "animate-marquee-vertical flex-col" : "animate-marquee flex-row",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
            reverse && "[animation-direction:reverse]"
          )}
        >
          {children}
        </div>
      ))}
    </div>
  )
}
