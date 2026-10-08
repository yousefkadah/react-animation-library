var e=`"use client"

import type { ReactNode } from "react"
import { motion, useReducedMotion, type HTMLMotionProps, type MotionProps } from "motion/react"

import { cn } from "@/lib/utils"

const animationProps: MotionProps = {
  initial: { "--x": "100%", scale: 0.8 },
  animate: { "--x": "-100%", scale: 1 },
  whileTap: { scale: 0.95 },
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    repeatDelay: 1,
    type: "spring",
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: { type: "spring", stiffness: 200, damping: 5, mass: 0.5 },
  },
}

const labelMask =
  "linear-gradient(-75deg, var(--primary) calc(var(--x) + 20%), transparent calc(var(--x) + 30%), var(--primary) calc(var(--x) + 100%))"
const borderMask = "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude, linear-gradient(rgb(0,0,0), rgb(0,0,0))"
const tint = (amount: number) => \`color-mix(in oklab, var(--primary) \${amount}%, transparent)\`
const borderShine = \`linear-gradient(-75deg, \${tint(10)} calc(var(--x) + 20%), \${tint(50)} calc(var(--x) + 25%), \${tint(10)} calc(var(--x) + 100%))\`

export interface ShinyButtonProps extends HTMLMotionProps<"button"> {
  children?: ReactNode
  className?: string
}

/** A button with a light that sweeps across its label. Motion props (\`transition\`, \`animate\`, …) override the shine. */
export function ShinyButton({ children, className, ...props }: ShinyButtonProps) {
  const reducedMotion = useReducedMotion()
  return (
    <motion.button
      className={cn(
        "relative cursor-pointer rounded-lg border px-6 py-2 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out hover:shadow dark:bg-[radial-gradient(circle_at_50%_0%,color-mix(in_oklab,var(--primary)_10%,transparent)_0%,transparent_60%)] dark:hover:shadow-[0_0_20px_color-mix(in_oklab,var(--primary)_10%,transparent)]",
        className
      )}
      {...animationProps}
      {...(reducedMotion ? { transition: { duration: 0 } } : {})}
      {...props}
    >
      <span
        className="relative block size-full text-sm tracking-wide text-[rgb(0,0,0,65%)] uppercase dark:font-light dark:text-[rgb(255,255,255,90%)]"
        style={{ maskImage: labelMask, WebkitMaskImage: labelMask }}
      >
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 z-10 block rounded-[inherit] p-px"
        style={{ mask: borderMask, WebkitMask: borderMask, backgroundImage: borderShine }}
      />
    </motion.button>
  )
}
`;export{e as default};