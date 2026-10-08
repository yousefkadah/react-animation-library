"use client"

import { createContext, useContext, useRef, type ReactNode } from "react"
import { motion, useMotionValue, useSpring, useTransform, type HTMLMotionProps, type MotionValue } from "motion/react"

import { cn } from "@/lib/utils"

const DEFAULT_SIZE = 40
const DEFAULT_MAGNIFICATION = 60
const DEFAULT_DISTANCE = 140
const DEFAULT_DISABLEMAGNIFICATION = false

interface DockContextValue {
  /** Horizontal pointer position (client X), `Infinity` while the pointer is outside the dock. */
  mouseX: MotionValue<number>
  iconSize: number
  iconMagnification: number
  iconDistance: number
  disableMagnification: boolean
}

const DockContext = createContext<DockContextValue | null>(null)

export interface DockProps extends Omit<HTMLMotionProps<"div">, "children"> {
  className?: string
  /** Resting size of every `DockIcon` in pixels. */
  iconSize?: number
  /** Size an icon grows to when the pointer is right over it. */
  iconMagnification?: number
  /** Turn the magnification effect off. */
  disableMagnification?: boolean
  /** Distance in pixels from the pointer within which icons grow. */
  iconDistance?: number
  /** Vertical alignment of the icons inside the dock. */
  direction?: "top" | "middle" | "bottom"
  children: ReactNode
}

export function Dock({
  className,
  children,
  iconSize = DEFAULT_SIZE,
  iconMagnification = DEFAULT_MAGNIFICATION,
  disableMagnification = DEFAULT_DISABLEMAGNIFICATION,
  iconDistance = DEFAULT_DISTANCE,
  direction = "middle",
  onMouseMove,
  onMouseLeave,
  ...props
}: DockProps) {
  const mouseX = useMotionValue(Infinity)

  return (
    <DockContext.Provider value={{ mouseX, iconSize, iconMagnification, iconDistance, disableMagnification }}>
      <motion.div
        {...props}
        onMouseMove={(event) => {
          mouseX.set(event.clientX)
          onMouseMove?.(event)
        }}
        onMouseLeave={(event) => {
          mouseX.set(Infinity)
          onMouseLeave?.(event)
        }}
        className={cn(
          "mx-auto mt-8 flex h-[58px] w-max items-center justify-center gap-2 rounded-2xl border p-2 backdrop-blur-md supports-backdrop-filter:bg-white/10 supports-backdrop-filter:dark:bg-black/10",
          className,
          {
            "items-start": direction === "top",
            "items-center": direction === "middle",
            "items-end": direction === "bottom",
          }
        )}
      >
        {children}
      </motion.div>
    </DockContext.Provider>
  )
}

export interface DockIconProps extends Omit<HTMLMotionProps<"div">, "children"> {
  /** Resting size in pixels. Defaults to the dock's `iconSize`. */
  size?: number
  /** Size when the pointer is right over the icon. Defaults to the dock's `iconMagnification`. */
  magnification?: number
  /** Turn magnification off for this icon. Defaults to the dock's `disableMagnification`. */
  disableMagnification?: boolean
  /** Distance in pixels within which the icon grows. Defaults to the dock's `iconDistance`. */
  distance?: number
  /** Pointer X position to react to. Provided automatically inside a `Dock`. */
  mouseX?: MotionValue<number>
  className?: string
  children?: ReactNode
}

export function DockIcon({
  size: sizeProp,
  magnification: magnificationProp,
  disableMagnification: disableMagnificationProp,
  distance: distanceProp,
  mouseX: mouseXProp,
  className,
  children,
  style,
  ...props
}: DockIconProps) {
  const dock = useContext(DockContext)
  // An icon's own props win over the dock's.
  const size = sizeProp ?? dock?.iconSize ?? DEFAULT_SIZE
  const magnification = magnificationProp ?? dock?.iconMagnification ?? DEFAULT_MAGNIFICATION
  const distance = distanceProp ?? dock?.iconDistance ?? DEFAULT_DISTANCE
  const disableMagnification = disableMagnificationProp ?? dock?.disableMagnification ?? DEFAULT_DISABLEMAGNIFICATION

  const ref = useRef<HTMLDivElement>(null)
  const padding = Math.max(6, size * 0.2)
  const defaultMouseX = useMotionValue(Infinity)

  /** Pointer distance from the icon's centre. */
  const distanceCalc = useTransform(mouseXProp ?? dock?.mouseX ?? defaultMouseX, (value: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return value - bounds.x - bounds.width / 2
  })

  const targetSize = disableMagnification ? size : magnification
  const sizeTransform = useTransform(distanceCalc, [-distance, 0, distance], [size, targetSize, size])
  const scaleSize = useSpring(sizeTransform, { mass: 0.1, stiffness: 150, damping: 12 })

  return (
    <motion.div
      ref={ref}
      style={{ width: scaleSize, height: scaleSize, padding, ...style }}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full",
        disableMagnification && "transition-colors hover:bg-muted-foreground",
        className
      )}
      {...props}
    >
      <div className="flex size-full items-center justify-center">{children}</div>
    </motion.div>
  )
}
