var e=`"use client"

import { useEffect, useRef, useState } from "react"
import createGlobe, { type COBEOptions, type Globe as CobeGlobe } from "cobe"
import { useMotionValue, useReducedMotion, useSpring } from "motion/react"

import { cn } from "@/lib/utils"

/** Pixels of horizontal drag per radian of rotation. */
const MOVEMENT_DAMPING = 200

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
}

export interface GlobeProps {
  className?: string
  /** cobe options, merged over the defaults. \`width\`, \`height\` and \`phi\` are managed for you. */
  config?: Partial<COBEOptions>
}

export function Globe({ className, config }: GlobeProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isReady, setIsReady] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const pointerStart = useRef<number | null>(null)
  const pointerMovement = useRef(0)

  const reducedMotion = useReducedMotion()
  const reducedMotionRef = useRef(reducedMotion)
  useEffect(() => {
    reducedMotionRef.current = reducedMotion
  }, [reducedMotion])

  const rotation = useMotionValue(0)
  const smoothRotation = useSpring(rotation, { mass: 1, damping: 30, stiffness: 100 })

  // Recreate the globe only when the config's content changes, not on every new object identity.
  const configKey = JSON.stringify(config ?? null)
  const configRef = useRef(config)
  useEffect(() => {
    configRef.current = config
  }, [config])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const options = { ...GLOBE_CONFIG, ...configRef.current }
    let width = canvas.offsetWidth
    let phi = options.phi
    const globe: CobeGlobe = createGlobe(canvas, { ...options, width, height: width })

    const resizeObserver = new ResizeObserver(() => {
      const next = canvas.offsetWidth
      if (next === width) return
      width = next
      globe.update({ width, height: width })
    })
    resizeObserver.observe(canvas)

    let frame = 0
    const render = () => {
      if (pointerStart.current === null && !reducedMotionRef.current) phi += 0.005
      globe.update({ phi: phi + smoothRotation.get() })
      frame = requestAnimationFrame(render)
    }
    frame = requestAnimationFrame(render)
    const readyTimer = setTimeout(() => setIsReady(true), 0)

    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(readyTimer)
      resizeObserver.disconnect()
      globe.destroy()
      // cobe wraps the canvas in a positioning <div>; unwrap it so a re-created globe doesn't nest.
      const wrapper = canvas.parentElement
      if (wrapper && wrapper !== rootRef.current) wrapper.replaceWith(canvas)
    }
  }, [configKey, smoothRotation])

  const endDrag = () => {
    pointerStart.current = null
    setIsDragging(false)
  }

  return (
    <div ref={rootRef} className={cn("absolute inset-0 mx-auto aspect-square w-full max-w-150", className)}>
      <canvas
        ref={canvasRef}
        aria-hidden
        className={cn(
          "size-full cursor-grab touch-pan-y opacity-0 transition-opacity duration-500 contain-[layout_paint_size]",
          isReady && "opacity-100",
          isDragging && "cursor-grabbing"
        )}
        onPointerDown={(event) => {
          pointerStart.current = event.clientX - pointerMovement.current
          setIsDragging(true)
        }}
        onPointerUp={endDrag}
        onPointerOut={endDrag}
        onPointerCancel={endDrag}
        onPointerMove={(event) => {
          if (pointerStart.current === null) return
          pointerMovement.current = event.clientX - pointerStart.current
          rotation.set(pointerMovement.current / MOVEMENT_DAMPING)
        }}
      />
    </div>
  )
}
`;export{e as default};