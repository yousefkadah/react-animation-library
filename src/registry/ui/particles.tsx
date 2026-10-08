"use client"

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react"
import { useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

export interface ParticlesProps extends ComponentPropsWithoutRef<"div"> {
  /** Number of particles. */
  quantity?: number
  /** How strongly particles resist the pointer; lower values follow it more. */
  staticity?: number
  /** Smoothing of the pointer attraction; higher values react more slowly. */
  ease?: number
  /** Base particle radius in pixels (each particle adds a random 0–1px). */
  size?: number
  /** Toggle to regenerate every particle. */
  refresh?: boolean
  /** Particle colour as a hex string (`#fff` or `#ffffff`). */
  color?: string
  /** Constant horizontal drift in pixels per frame. */
  vx?: number
  /** Constant vertical drift in pixels per frame. */
  vy?: number
}

interface Circle {
  x: number
  y: number
  translateX: number
  translateY: number
  size: number
  alpha: number
  targetAlpha: number
  dx: number
  dy: number
  magnetism: number
}

function hexToRgb(hex: string): [number, number, number] {
  let value = hex.replace("#", "")
  if (value.length === 3) value = value.split("").map((char) => char + char).join("")
  const int = Number.parseInt(value, 16)
  return [(int >> 16) & 255, (int >> 8) & 255, int & 255]
}

function remap(value: number, start1: number, end1: number, start2: number, end2: number) {
  const remapped = ((value - start1) * (end2 - start2)) / (end1 - start1) + start2
  return remapped > 0 ? remapped : 0
}

export function Particles({
  className,
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = "#ffffff",
  vx = 0,
  vy = 0,
  ...props
}: ParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = Boolean(useReducedMotion())

  const scene = useRef({
    circles: [] as Circle[],
    size: { w: 0, h: 0 },
    mouse: { x: 0, y: 0 },
    dpr: 1,
    redrawStatic: () => {},
  })

  // Live settings, read every frame, so changing them never restarts the animation.
  const settings = useRef({ staticity, ease, vx, vy, rgb: hexToRgb(color).join(", ") })
  useEffect(() => {
    settings.current = { staticity, ease, vx, vy, rgb: hexToRgb(color).join(", ") }
    // A colour change under reduced motion repaints the still frame.
    scene.current.redrawStatic()
  }, [staticity, ease, vx, vy, color])

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d") ?? null
    if (!container || !canvas || !context) return
    const s = scene.current
    let frame = 0
    let resizeTimer: ReturnType<typeof setTimeout> | undefined

    const createCircle = (): Circle => ({
      x: Math.floor(Math.random() * s.size.w),
      y: Math.floor(Math.random() * s.size.h),
      translateX: 0,
      translateY: 0,
      size: Math.floor(Math.random() * 2) + size,
      alpha: 0,
      targetAlpha: Number.parseFloat((Math.random() * 0.6 + 0.1).toFixed(1)),
      dx: (Math.random() - 0.5) * 0.1,
      dy: (Math.random() - 0.5) * 0.1,
      magnetism: 0.1 + Math.random() * 4,
    })

    const drawCircle = (circle: Circle) => {
      context.translate(circle.translateX, circle.translateY)
      context.beginPath()
      context.arc(circle.x, circle.y, circle.size, 0, 2 * Math.PI)
      context.fillStyle = `rgba(${settings.current.rgb}, ${circle.alpha})`
      context.fill()
      context.setTransform(s.dpr, 0, 0, s.dpr, 0, 0)
    }

    const clear = () => context.clearRect(0, 0, s.size.w, s.size.h)

    /** Reduced motion: one still frame with every particle at its resting opacity. */
    const drawStatic = () => {
      clear()
      for (const circle of s.circles) {
        circle.alpha = circle.targetAlpha
        drawCircle(circle)
      }
    }

    /** Sizes the canvas to its container (at device resolution) and scatters fresh particles. */
    const initCanvas = () => {
      s.dpr = window.devicePixelRatio || 1
      s.size = { w: container.offsetWidth, h: container.offsetHeight }
      canvas.width = s.size.w * s.dpr
      canvas.height = s.size.h * s.dpr
      canvas.style.width = `${s.size.w}px`
      canvas.style.height = `${s.size.h}px`
      context.setTransform(s.dpr, 0, 0, s.dpr, 0, 0)
      s.circles = Array.from({ length: quantity }, createCircle)
      if (reducedMotion) drawStatic()
    }

    const animate = () => {
      const { staticity: currentStaticity, ease: currentEase, vx: driftX, vy: driftY } = settings.current
      clear()
      s.circles.forEach((circle, index) => {
        // Fade particles out as they approach an edge.
        const closestEdge = Math.min(
          circle.x + circle.translateX - circle.size,
          s.size.w - circle.x - circle.translateX - circle.size,
          circle.y + circle.translateY - circle.size,
          s.size.h - circle.y - circle.translateY - circle.size
        )
        const edgeFactor = Number.parseFloat(remap(closestEdge, 0, 20, 0, 1).toFixed(2))
        if (edgeFactor > 1) circle.alpha = Math.min(circle.alpha + 0.02, circle.targetAlpha)
        else circle.alpha = circle.targetAlpha * edgeFactor

        circle.x += circle.dx + driftX
        circle.y += circle.dy + driftY
        circle.translateX += (s.mouse.x / (currentStaticity / circle.magnetism) - circle.translateX) / currentEase
        circle.translateY += (s.mouse.y / (currentStaticity / circle.magnetism) - circle.translateY) / currentEase
        drawCircle(circle)

        // Replace particles that drift out of the canvas.
        if (circle.x < -circle.size || circle.x > s.size.w + circle.size || circle.y < -circle.size || circle.y > s.size.h + circle.size) {
          s.circles[index] = createCircle()
        }
      })
      frame = requestAnimationFrame(animate)
    }

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const { w, h } = s.size
      const x = event.clientX - rect.left - w / 2
      const y = event.clientY - rect.top - h / 2
      if (x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2) s.mouse = { x, y }
    }

    const resizeObserver = new ResizeObserver(() => {
      if (container.offsetWidth === s.size.w && container.offsetHeight === s.size.h) return
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(initCanvas, 200)
    })

    initCanvas()
    if (!reducedMotion) frame = requestAnimationFrame(animate)
    s.redrawStatic = () => {
      if (reducedMotion) drawStatic()
    }
    resizeObserver.observe(container)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(resizeTimer)
      resizeObserver.disconnect()
      window.removeEventListener("mousemove", handleMouseMove)
      s.redrawStatic = () => {}
    }
  }, [quantity, size, refresh, reducedMotion])

  return (
    <div ref={containerRef} aria-hidden className={cn("pointer-events-none", className)} {...props}>
      <canvas ref={canvasRef} className="size-full" />
    </div>
  )
}
