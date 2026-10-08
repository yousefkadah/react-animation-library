var e=`"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useMotionValue, type HTMLMotionProps } from "motion/react"

import { cn } from "@/lib/utils"

/**
 * Replaces the cursor with a custom, animated pointer while it is over this component's parent
 * element. Drop it inside any \`relative\` container and pass your own pointer as children.
 * \`className\` styles the default arrow; every other prop goes to the motion element.
 */
export type PointerProps = HTMLMotionProps<"div">

export function Pointer({ className, style, children, ...props }: PointerProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [isActive, setIsActive] = useState(false)
  const anchorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const parent = anchorRef.current?.parentElement
    if (!parent) return

    const handleMove = (event: MouseEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
      setIsActive(true)
    }
    const handleLeave = () => setIsActive(false)

    // Hide the real cursor on the parent only, and put back whatever it had before.
    const previousCursor = parent.style.cursor
    parent.style.cursor = "none"
    parent.addEventListener("mousemove", handleMove)
    parent.addEventListener("mouseenter", handleMove)
    parent.addEventListener("mouseleave", handleLeave)

    return () => {
      parent.style.cursor = previousCursor
      parent.removeEventListener("mousemove", handleMove)
      parent.removeEventListener("mouseenter", handleMove)
      parent.removeEventListener("mouseleave", handleLeave)
    }
  }, [x, y])

  return (
    <div ref={anchorRef} className="contents">
      <AnimatePresence>
        {isActive && (
          <motion.div
            aria-hidden
            className="pointer-events-none fixed z-50"
            style={{ ...style, top: y, left: x }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            {...props}
          >
            {children || (
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="1"
                viewBox="0 0 16 16"
                height="24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
                className={cn("rotate-[-70deg] stroke-white text-black", className)}
              >
                <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
              </svg>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
`;export{e as default};