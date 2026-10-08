var e=`"use client"

import { useCallback, useEffect, useRef, type ComponentPropsWithoutRef, type PointerEvent } from "react"
import { motion, useMotionValue, useSpring } from "motion/react"

import { cn } from "@/lib/utils"

export interface MagicCardProps extends ComponentPropsWithoutRef<"div"> {
  /** \`gradient\`: a spotlight and a glowing border follow the pointer. \`orb\`: a blurred orb follows it instead. */
  mode?: "gradient" | "orb"
  /** Radius of the spotlight and border glow in pixels. */
  gradientSize?: number
  /** Spotlight colour (gradient mode). Any CSS colour, including \`var(--…)\`. */
  gradientColor?: string
  /** Spotlight opacity (gradient mode). */
  gradientOpacity?: number
  /** Start colour of the border glow. */
  gradientFrom?: string
  /** End colour of the border glow. */
  gradientTo?: string
  /** Start colour of the orb (orb mode). */
  glowFrom?: string
  /** End colour of the orb (orb mode). */
  glowTo?: string
  /** Angle of the orb gradient in degrees (orb mode). */
  glowAngle?: number
  /** Diameter of the orb in pixels (orb mode). */
  glowSize?: number
  /** Blur of the orb in pixels (orb mode). */
  glowBlur?: number
  /** Opacity of the orb while hovered (orb mode). */
  glowOpacity?: number
}

type ResetReason = "enter" | "leave" | "global" | "init"

export function MagicCard({
  children,
  className,
  style,
  mode = "gradient",
  gradientSize = 200,
  gradientColor = "#262626",
  gradientOpacity = 0.8,
  gradientFrom = "#9E7AFF",
  gradientTo = "#FE8BBB",
  glowFrom = "#ee4f27",
  glowTo = "#6b21ef",
  glowAngle = 90,
  glowSize = 420,
  glowBlur = 60,
  glowOpacity = 0.9,
  onPointerMove,
  onPointerEnter,
  onPointerLeave,
  ...props
}: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  // Orb mode follows the pointer with springs; the gradients read plain CSS variables,
  // so moving the pointer never re-renders the component.
  const mouseX = useMotionValue(-gradientSize)
  const mouseY = useMotionValue(-gradientSize)
  const orbX = useSpring(mouseX, { stiffness: 250, damping: 30, mass: 0.6 })
  const orbY = useSpring(mouseY, { stiffness: 250, damping: 30, mass: 0.6 })
  const orbVisible = useSpring(0, { stiffness: 300, damping: 35 })

  const settings = useRef({ mode, glowOpacity, gradientSize })
  useEffect(() => {
    settings.current = { mode, glowOpacity, gradientSize }
  }, [mode, glowOpacity, gradientSize])

  const reset = useCallback(
    (reason: ResetReason = "leave") => {
      const current = settings.current
      if (current.mode === "orb") {
        orbVisible.set(reason === "enter" ? current.glowOpacity : 0)
        return
      }
      cardRef.current?.style.removeProperty("--magic-card-x")
      cardRef.current?.style.removeProperty("--magic-card-y")
      mouseX.set(-current.gradientSize)
      mouseY.set(-current.gradientSize)
    },
    [mouseX, mouseY, orbVisible]
  )

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const element = event.currentTarget
    const rect = element.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    element.style.setProperty("--magic-card-x", \`\${x}px\`)
    element.style.setProperty("--magic-card-y", \`\${y}px\`)
    mouseX.set(x)
    mouseY.set(y)
    onPointerMove?.(event)
  }

  useEffect(() => {
    reset("init")
  }, [reset])

  useEffect(() => {
    const handleGlobalPointerOut = (event: globalThis.PointerEvent) => {
      if (!event.relatedTarget) reset("global")
    }
    const handleBlur = () => reset("global")
    const handleVisibility = () => {
      if (document.visibilityState !== "visible") reset("global")
    }

    window.addEventListener("pointerout", handleGlobalPointerOut)
    window.addEventListener("blur", handleBlur)
    document.addEventListener("visibilitychange", handleVisibility)

    return () => {
      window.removeEventListener("pointerout", handleGlobalPointerOut)
      window.removeEventListener("blur", handleBlur)
      document.removeEventListener("visibilitychange", handleVisibility)
    }
  }, [reset])

  /** Pointer position with an off-card fallback, so the glow is hidden until the pointer arrives. */
  const off = \`\${-gradientSize}px\`
  const pointer = \`var(--magic-card-x, \${off}) var(--magic-card-y, \${off})\`

  return (
    <div
      {...props}
      ref={cardRef}
      className={cn("group relative isolate overflow-hidden rounded-[inherit] border border-transparent", className)}
      style={{
        background: \`linear-gradient(var(--background) 0 0) padding-box, radial-gradient(\${gradientSize}px circle at \${pointer}, \${gradientFrom}, \${gradientTo}, var(--border) 100%) border-box\`,
        ...style,
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={(event) => {
        reset("leave")
        onPointerLeave?.(event)
      }}
      onPointerEnter={(event) => {
        reset("enter")
        onPointerEnter?.(event)
      }}
    >
      <div className="absolute inset-px z-20 rounded-[inherit] bg-background" />

      {mode === "gradient" && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-px z-30 rounded-[inherit]"
          style={{
            background: \`radial-gradient(\${gradientSize}px circle at \${pointer}, \${gradientColor}, transparent 100%)\`,
            opacity: gradientOpacity,
          }}
        />
      )}

      {mode === "orb" && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 z-30 rounded-full mix-blend-multiply dark:mix-blend-screen"
          style={{
            width: glowSize,
            height: glowSize,
            x: orbX,
            y: orbY,
            translateX: "-50%",
            translateY: "-50%",
            filter: \`blur(\${glowBlur}px)\`,
            opacity: orbVisible,
            background: \`linear-gradient(\${glowAngle}deg, \${glowFrom}, \${glowTo})\`,
            willChange: "transform, opacity",
          }}
        />
      )}

      <div className="relative z-40">{children}</div>
    </div>
  )
}
`;export{e as default};