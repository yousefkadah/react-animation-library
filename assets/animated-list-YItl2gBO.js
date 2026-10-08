var e=`"use client"

import { Children, isValidElement, memo, useEffect, useMemo, useState, type ComponentPropsWithoutRef, type ReactNode } from "react"
import { AnimatePresence, motion, type MotionProps } from "motion/react"

import { cn } from "@/lib/utils"

export interface AnimatedListItemProps {
  children: ReactNode
  className?: string
}

export function AnimatedListItem({ children, className }: AnimatedListItemProps) {
  const animations: MotionProps = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring", stiffness: 350, damping: 40 },
  }

  return (
    <motion.div {...animations} layout className={cn("mx-auto w-full", className)}>
      {children}
    </motion.div>
  )
}

export interface AnimatedListProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode
  /** Milliseconds between two items appearing. */
  delay?: number
}

export const AnimatedList = memo(function AnimatedList({ children, className, delay = 1000, ...props }: AnimatedListProps) {
  const [index, setIndex] = useState(0)
  const childrenArray = useMemo(() => Children.toArray(children), [children])

  useEffect(() => {
    if (index >= childrenArray.length - 1) return
    const timeout = setTimeout(() => {
      setIndex((previous) => (previous + 1) % childrenArray.length)
    }, delay)
    return () => clearTimeout(timeout)
  }, [index, delay, childrenArray.length])

  /** The items revealed so far, newest first. */
  const itemsToShow = useMemo(() => childrenArray.slice(0, index + 1).reverse(), [index, childrenArray])

  return (
    <div className={cn("flex flex-col items-center gap-4", className)} {...props}>
      <AnimatePresence>
        {itemsToShow.map((item, position) => (
          <AnimatedListItem key={isValidElement(item) && item.key !== null ? item.key : position}>{item}</AnimatedListItem>
        ))}
      </AnimatePresence>
    </div>
  )
})
`;export{e as default};