var e=`import type { ComponentPropsWithoutRef, CSSProperties } from "react"

import { cn } from "@/lib/utils"

export interface RippleProps extends ComponentPropsWithoutRef<"div"> {
  /** Diameter of the innermost circle in pixels. Each further circle is 70px wider. */
  mainCircleSize?: number
  /** Opacity of the innermost circle. Each further circle is 0.03 more transparent. */
  mainCircleOpacity?: number
  /** Number of circles. */
  numCircles?: number
}

export function Ripple({ mainCircleSize = 210, mainCircleOpacity = 0.24, numCircles = 8, className, ...props }: RippleProps) {
  return (
    <div
      aria-hidden="true"
      {...props}
      className={cn(
        "pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,white,transparent)] select-none",
        className
      )}
    >
      {Array.from({ length: numCircles }, (_, index) => {
        const size = mainCircleSize + index * 70
        return (
          <div
            key={index}
            className="animate-ripple absolute rounded-full border bg-foreground/25 shadow-xl motion-reduce:animate-none"
            style={
              {
                "--i": index,
                width: \`\${size}px\`,
                height: \`\${size}px\`,
                opacity: mainCircleOpacity - index * 0.03,
                animationDelay: \`\${index * 0.06}s\`,
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "var(--foreground)",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) scale(1)",
              } as CSSProperties
            }
          />
        )
      })}
    </div>
  )
}
`;export{e as default};