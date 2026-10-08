var e=`import type { ComponentPropsWithoutRef, CSSProperties } from "react"

import { cn } from "@/lib/utils"

export interface AnimatedShinyTextProps extends ComponentPropsWithoutRef<"span"> {
  /** Width of the light glare in pixels. */
  shimmerWidth?: number
}

export function AnimatedShinyText({ children, className, shimmerWidth = 100, style, ...props }: AnimatedShinyTextProps) {
  return (
    <span
      style={{ "--shiny-width": \`\${shimmerWidth}px\`, ...style } as CSSProperties}
      className={cn(
        "mx-auto max-w-md text-neutral-600/70 dark:text-neutral-400/70",
        // Shine effect
        "animate-shiny-text bg-size-[var(--shiny-width)_100%] bg-clip-text bg-position-[0_0] bg-no-repeat [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]",
        // Shine gradient
        "bg-linear-to-r from-transparent via-black/80 via-50% to-transparent dark:via-white/80",
        // No glare for reduced motion
        "motion-reduce:animate-none motion-reduce:bg-none",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
`;export{e as default};