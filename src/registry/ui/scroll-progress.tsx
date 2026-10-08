"use client"

import type { HTMLAttributes, Ref, RefObject } from "react"
import { motion, useScroll, type MotionProps } from "motion/react"

import { cn } from "@/lib/utils"

export interface ScrollProgressProps extends Omit<HTMLAttributes<HTMLElement>, keyof MotionProps> {
  ref?: Ref<HTMLDivElement>
  /** Scrollable element to track instead of the page. */
  container?: RefObject<HTMLElement | null>
}

export function ScrollProgress({ className, ref, container, ...props }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll({ container })

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-50 h-px origin-left bg-linear-to-r from-[#A97CF8] via-[#F38CB8] to-[#FDCC92] rtl:origin-right",
        className
      )}
      style={{ scaleX: scrollYProgress }}
      {...props}
    />
  )
}
