var e=`import { Children, type ComponentPropsWithoutRef, type CSSProperties } from "react"

import { cn } from "@/lib/utils"

export interface OrbitingCirclesProps extends ComponentPropsWithoutRef<"div"> {
  /** Orbit counter-clockwise. */
  reverse?: boolean
  /** Seconds for one full orbit (divided by \`speed\`). */
  duration?: number
  /** Seconds to offset the starting position along the orbit. */
  delay?: number
  /** Radius of the orbit in pixels. */
  radius?: number
  /** Draw the circular path. */
  path?: boolean
  /** Size of each orbiting item in pixels. */
  iconSize?: number
  /** Speed multiplier. */
  speed?: number
}

export function OrbitingCircles({
  className,
  children,
  reverse = false,
  duration = 20,
  delay = 0,
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 1,
  style,
  ...props
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed
  const items = Children.toArray(children)

  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 size-full"
          aria-hidden="true"
        >
          <circle className="stroke-black/10 stroke-1 dark:stroke-white/10" cx="50%" cy="50%" r={radius} fill="none" />
        </svg>
      )}
      {items.map((child, index) => {
        const angle = (360 / items.length) * index
        return (
          <div
            key={index}
            {...props}
            style={
              {
                "--duration": calculatedDuration,
                "--radius": radius,
                "--angle": angle,
                "--icon-size": \`\${iconSize}px\`,
                animationDelay: delay ? \`\${-delay}s\` : undefined,
                ...style,
              } as CSSProperties
            }
            className={cn(
              "animate-orbit absolute flex size-(--icon-size) transform-gpu items-center justify-center rounded-full motion-reduce:[animation-play-state:paused]",
              reverse && "[animation-direction:reverse]",
              className
            )}
          >
            {child}
          </div>
        )
      })}
    </>
  )
}
`;export{e as default};