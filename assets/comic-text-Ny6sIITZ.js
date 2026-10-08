var e=`"use client"

import type { CSSProperties } from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

export interface ComicTextProps {
  /** The text to display. */
  children: string
  className?: string
  /** Inline styles, merged over the comic styles. */
  style?: CSSProperties
  /** Font size in \`rem\`. The outline and shadows scale with it. */
  fontSize?: number
}

const DOT_COLOR = "#EF4444"
const BACKGROUND_COLOR = "#FACC15"

export function ComicText({ children, className, style, fontSize = 5 }: ComicTextProps) {
  if (typeof children !== "string") {
    throw new Error("children must be a string")
  }

  return (
    <motion.div
      className={cn("text-center select-none", className)}
      style={{
        fontSize: \`\${fontSize}rem\`,
        fontFamily: "'Bangers', 'Comic Sans MS', 'Impact', sans-serif",
        fontWeight: "900",
        WebkitTextStroke: \`\${fontSize * 0.35}px #000000\`,
        textTransform: "uppercase",
        filter: \`drop-shadow(5px 5px 0px #000000) drop-shadow(3px 3px 0px \${DOT_COLOR})\`,
        backgroundColor: BACKGROUND_COLOR,
        backgroundImage: \`radial-gradient(circle at 1px 1px, \${DOT_COLOR} 1px, transparent 0)\`,
        backgroundSize: "8px 8px",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        ...style,
      }}
      // The skew is a motion value so it combines with the pop-in scale and rotation.
      initial={{ opacity: 0, scale: 0.8, rotate: -2, skewX: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0, skewX: -10 }}
      transition={{
        duration: 0.6,
        ease: [0.175, 0.885, 0.32, 1.275],
        type: "spring",
      }}
    >
      {children}
    </motion.div>
  )
}
`;export{e as default};