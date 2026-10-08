var e=`"use client"

import { createContext, useContext, useEffect, useRef, useState, type HTMLAttributes, type ReactNode } from "react"
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "motion/react"

import { cn } from "@/lib/utils"

/** Wraps \`v\` into the range [min, max). */
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min
}

/** Page scroll velocity, smoothed and mapped to a -5…5 speed boost. */
function useScrollVelocityFactor(): MotionValue<number> {
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  return useTransform(smoothVelocity, (v) => {
    const sign = v < 0 ? -1 : 1
    const magnitude = Math.min(5, (Math.abs(v) / 1000) * 5)
    return sign * magnitude
  })
}

const ScrollVelocityContext = createContext<MotionValue<number> | null>(null)

export type ScrollVelocityContainerProps = HTMLAttributes<HTMLDivElement>

export function ScrollVelocityContainer({ children, className, ...props }: ScrollVelocityContainerProps) {
  const velocityFactor = useScrollVelocityFactor()

  return (
    <ScrollVelocityContext.Provider value={velocityFactor}>
      <div className={cn("relative w-full", className)} {...props}>
        {children}
      </div>
    </ScrollVelocityContext.Provider>
  )
}

export interface ScrollVelocityRowProps extends HTMLAttributes<HTMLDivElement> {
  /** Content to repeat and scroll. */
  children: ReactNode
  /** Base speed, as a percentage of the content width per second. */
  baseVelocity?: number
  /** \`1\` moves the content to the left, \`-1\` to the right. Scrolling up flips it. */
  direction?: 1 | -1
  /** Speed up (and flip direction) with the page's scroll velocity. */
  scrollReactivity?: boolean
}

/** Rows inside a \`ScrollVelocityContainer\` share its velocity; standalone rows track their own. */
export function ScrollVelocityRow(props: ScrollVelocityRowProps) {
  const sharedVelocityFactor = useContext(ScrollVelocityContext)
  if (sharedVelocityFactor) {
    return <ScrollVelocityRowImpl {...props} velocityFactor={sharedVelocityFactor} />
  }
  return <ScrollVelocityRowLocal {...props} />
}

function ScrollVelocityRowLocal(props: ScrollVelocityRowProps) {
  const velocityFactor = useScrollVelocityFactor()
  return <ScrollVelocityRowImpl {...props} velocityFactor={velocityFactor} />
}

interface ScrollVelocityRowImplProps extends ScrollVelocityRowProps {
  velocityFactor: MotionValue<number>
}

function ScrollVelocityRowImpl({
  children,
  baseVelocity = 5,
  direction = 1,
  className,
  velocityFactor,
  scrollReactivity = true,
  ...props
}: ScrollVelocityRowImplProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const blockRef = useRef<HTMLDivElement>(null)
  const [numCopies, setNumCopies] = useState(1)

  const baseX = useMotionValue(0)
  const unitWidth = useMotionValue(0)
  const baseDirectionRef = useRef<number>(direction >= 0 ? 1 : -1)
  const currentDirectionRef = useRef<number>(direction >= 0 ? 1 : -1)

  const isInViewRef = useRef(true)
  const isPageVisibleRef = useRef(true)
  const prefersReducedMotionRef = useRef(false)

  useEffect(() => {
    baseDirectionRef.current = direction >= 0 ? 1 : -1
    currentDirectionRef.current = baseDirectionRef.current
  }, [direction])

  useEffect(() => {
    const container = containerRef.current
    const block = blockRef.current
    if (!container || !block) return

    const updateSizes = () => {
      const containerWidth = container.offsetWidth || 0
      const blockWidth = block.scrollWidth || 0
      unitWidth.set(blockWidth)
      const nextCopies = blockWidth > 0 ? Math.max(3, Math.ceil(containerWidth / blockWidth) + 2) : 1
      setNumCopies((prev) => (prev === nextCopies ? prev : nextCopies))
    }
    const handleVisibility = () => {
      isPageVisibleRef.current = document.visibilityState === "visible"
    }
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handleReducedMotion = () => {
      prefersReducedMotionRef.current = reducedMotionQuery.matches
    }

    updateSizes()
    const resizeObserver = new ResizeObserver(updateSizes)
    resizeObserver.observe(container)
    resizeObserver.observe(block)

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isInViewRef.current = entry?.isIntersecting ?? true
    })
    intersectionObserver.observe(container)

    document.addEventListener("visibilitychange", handleVisibility, { passive: true })
    handleVisibility()
    reducedMotionQuery.addEventListener("change", handleReducedMotion)
    handleReducedMotion()

    return () => {
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      document.removeEventListener("visibilitychange", handleVisibility)
      reducedMotionQuery.removeEventListener("change", handleReducedMotion)
    }
  }, [children, unitWidth])

  const x = useTransform([baseX, unitWidth], ([v, bw]) => {
    const width = Number(bw) || 1
    const offset = Number(v) || 0
    return \`\${-wrap(0, width, offset)}px\`
  })

  useAnimationFrame((_, delta) => {
    // Reduced motion: the row stays still.
    if (!isInViewRef.current || !isPageVisibleRef.current || prefersReducedMotionRef.current) return
    const width = unitWidth.get() || 0
    if (width <= 0) return
    const factor = scrollReactivity ? velocityFactor.get() : 0
    const boost = Math.min(5, Math.abs(factor))
    if (boost > 0.1) {
      currentDirectionRef.current = baseDirectionRef.current * (factor >= 0 ? 1 : -1)
    }
    const pixelsPerSecond = (width * baseVelocity) / 100
    baseX.set(baseX.get() + currentDirectionRef.current * pixelsPerSecond * (1 + boost) * (delta / 1000))
  })

  return (
    <div ref={containerRef} className={cn("w-full overflow-hidden whitespace-nowrap", className)} {...props}>
      <motion.div className="inline-flex transform-gpu items-center will-change-transform select-none" style={{ x }}>
        {Array.from({ length: numCopies }).map((_, i) => (
          <div
            key={i}
            ref={i === 0 ? blockRef : null}
            aria-hidden={i !== 0 ? true : undefined}
            className="inline-flex shrink-0 items-center"
          >
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
`;export{e as default};