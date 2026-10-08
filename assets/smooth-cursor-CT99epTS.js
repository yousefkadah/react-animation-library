var e=`"use client"

import { useEffect, useId, useRef, useState, useSyncExternalStore, type ReactNode } from "react"
import { motion, useSpring } from "motion/react"

export interface SmoothCursorSpringConfig {
  damping: number
  stiffness: number
  mass: number
  restDelta: number
}

export interface SmoothCursorProps {
  /** Custom cursor. Defaults to an arrow with a soft shadow. */
  cursor?: ReactNode
  /** Spring used to follow the pointer. Rotation and scale derive their own springs from it. */
  springConfig?: SmoothCursorSpringConfig
}

/** Only devices with a precise, hover-capable pointer get the custom cursor. */
const DESKTOP_POINTER_QUERY = "(any-hover: hover) and (any-pointer: fine)"

const DEFAULT_SPRING: SmoothCursorSpringConfig = { damping: 45, stiffness: 400, mass: 1, restDelta: 0.001 }

/*
 * Page-wide bookkeeping shared by every SmoothCursor: only the most recently mounted, enabled
 * instance draws a cursor, and the native cursor is hidden while at least one is active.
 */
let activeInstances: string[] = []
let savedBodyCursor: string | null = null
const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

const getTopmost = () => activeInstances[activeInstances.length - 1] ?? null
const getServerTopmost = () => null

function activate(id: string) {
  if (!activeInstances.includes(id)) activeInstances = [...activeInstances, id]
  if (savedBodyCursor === null) {
    savedBodyCursor = document.body.style.cursor
    document.body.style.cursor = "none"
  }
  listeners.forEach((listener) => listener())
}

function deactivate(id: string) {
  activeInstances = activeInstances.filter((instance) => instance !== id)
  if (activeInstances.length === 0 && savedBodyCursor !== null) {
    document.body.style.cursor = savedBodyCursor
    savedBodyCursor = null
  }
  listeners.forEach((listener) => listener())
}

function DefaultCursorSVG() {
  const filterId = \`smooth-cursor-shadow-\${useId().replace(/[^a-zA-Z0-9_-]/g, "")}\`
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={50} height={54} viewBox="0 0 50 54" fill="none" className="scale-50">
      <g filter={\`url(#\${filterId})\`}>
        <path
          d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
          fill="black"
        />
        <path
          d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z"
          stroke="white"
          strokeWidth={2.25825}
        />
      </g>
      <defs>
        <filter id={filterId} x={0.602397} y={0.952444} width={49.0584} height={52.428} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy={2.25825} />
          <feGaussianBlur stdDeviation={2.25825} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </svg>
  )
}

export function SmoothCursor({ cursor = <DefaultCursorSVG />, springConfig = DEFAULT_SPRING }: SmoothCursorProps) {
  const instanceId = useId()
  const [isEnabled, setIsEnabled] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const topmost = useSyncExternalStore(subscribe, getTopmost, getServerTopmost)

  const lastPosition = useRef({ x: 0, y: 0 })
  const velocity = useRef({ x: 0, y: 0 })
  const lastUpdateTime = useRef(0)
  const previousAngle = useRef(0)
  const accumulatedRotation = useRef(0)

  const cursorX = useSpring(0, springConfig)
  const cursorY = useSpring(0, springConfig)
  const rotation = useSpring(0, { ...springConfig, damping: 60, stiffness: 300 })
  const scale = useSpring(1, { ...springConfig, stiffness: 500, damping: 35 })

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_POINTER_QUERY)
    const updateEnabled = () => {
      setIsEnabled(mediaQuery.matches)
      if (!mediaQuery.matches) setIsVisible(false)
    }
    updateEnabled()
    mediaQuery.addEventListener("change", updateEnabled)
    return () => mediaQuery.removeEventListener("change", updateEnabled)
  }, [])

  useEffect(() => {
    if (!isEnabled) return

    let scaleTimeout: ReturnType<typeof setTimeout> | undefined
    let frame = 0

    const move = (event: PointerEvent) => {
      setIsVisible(true)
      const now = Date.now()
      const position = { x: event.clientX, y: event.clientY }
      const elapsed = now - lastUpdateTime.current
      if (elapsed > 0) {
        velocity.current = {
          x: (position.x - lastPosition.current.x) / elapsed,
          y: (position.y - lastPosition.current.y) / elapsed,
        }
      }
      lastUpdateTime.current = now
      lastPosition.current = position

      cursorX.set(position.x)
      cursorY.set(position.y)

      const speed = Math.hypot(velocity.current.x, velocity.current.y)
      if (speed > 0.1) {
        const angle = Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI) + 90
        let difference = angle - previousAngle.current
        if (difference > 180) difference -= 360
        if (difference < -180) difference += 360
        accumulatedRotation.current += difference
        rotation.set(accumulatedRotation.current)
        previousAngle.current = angle

        scale.set(0.95)
        clearTimeout(scaleTimeout)
        scaleTimeout = setTimeout(() => scale.set(1), 150)
      }
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch" || frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        move(event)
      })
    }

    activate(instanceId)
    window.addEventListener("pointermove", handlePointerMove, { passive: true })

    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      cancelAnimationFrame(frame)
      clearTimeout(scaleTimeout)
      deactivate(instanceId)
    }
  }, [isEnabled, instanceId, cursorX, cursorY, rotation, scale])

  if (!isEnabled || topmost !== instanceId) return null

  return (
    <motion.div
      aria-hidden
      style={{
        position: "fixed",
        left: cursorX,
        top: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        rotate: rotation,
        scale,
        zIndex: 100,
        pointerEvents: "none",
        willChange: "transform",
      }}
      initial={false}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.15 }}
    >
      {cursor}
    </motion.div>
  )
}
`;export{e as default};