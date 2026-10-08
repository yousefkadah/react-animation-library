var e=`import { memo, type CSSProperties, type ReactNode } from "react"

import { cn } from "@/lib/utils"

export interface AuroraTextProps {
  children: ReactNode
  className?: string
  /** Colours of the aurora gradient. The first colour is repeated at the end for a seamless loop. */
  colors?: string[]
  /** Animation speed multiplier: 2 is twice as fast. */
  speed?: number
}

const defaultColors = ["#FF0080", "#7928CA", "#0070F3", "#38bdf8"]

export const AuroraText = memo(function AuroraText({
  children,
  className,
  colors = defaultColors,
  speed = 1,
}: AuroraTextProps) {
  const gradientStyle: CSSProperties = {
    backgroundImage: \`linear-gradient(135deg, \${colors.join(", ")}, \${colors[0]})\`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animationDuration: \`\${10 / speed}s\`,
  }

  return (
    <span className={cn("relative inline-block", className)}>
      <span className="sr-only">{children}</span>
      <span
        className="animate-aurora relative bg-size-[200%_auto] bg-clip-text text-transparent motion-reduce:animate-none"
        style={gradientStyle}
        aria-hidden="true"
      >
        {children}
      </span>
    </span>
  )
})
`;export{e as default};