var e=`import type { ComponentPropsWithoutRef, CSSProperties } from "react"

import { cn } from "@/lib/utils"

export interface AnimatedGradientTextProps extends ComponentPropsWithoutRef<"span"> {
  /** Animation speed multiplier; widens the gradient so it travels further per loop. */
  speed?: number
  /** Gradient start (and end) colour. */
  colorFrom?: string
  /** Gradient middle colour. */
  colorTo?: string
}

export function AnimatedGradientText({
  children,
  className,
  speed = 1,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  style,
  ...props
}: AnimatedGradientTextProps) {
  return (
    <span
      style={
        {
          "--bg-size": \`\${speed * 300}%\`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          ...style,
        } as CSSProperties
      }
      className={cn(
        "animate-gradient inline bg-linear-to-r from-(--color-from) via-(--color-to) to-(--color-from) bg-size-[var(--bg-size)_100%] bg-clip-text text-transparent motion-reduce:animate-none",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
`;export{e as default};