"use client"

import { useEffect, useRef, useState, type ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

export interface FlickeringGridProps extends ComponentPropsWithoutRef<"div"> {
  /** Size of each square in pixels. */
  squareSize?: number
  /** Gap between squares in pixels. */
  gridGap?: number
  /** Chance per second that a square changes its opacity. */
  flickerChance?: number
  /** Colour of the squares (any CSS colour). */
  color?: string
  /** Fixed canvas width in pixels. Defaults to the container's width. */
  width?: number
  /** Fixed canvas height in pixels. Defaults to the container's height. */
  height?: number
  /** Highest opacity a square can reach. */
  maxOpacity?: number
}

/** Resolves any CSS colour to an `rgba(r, g, b,` prefix so each square only appends its opacity. */
function toRgbaPrefix(color: string) {
  const canvas = document.createElement("canvas")
  canvas.width = canvas.height = 1
  const ctx = canvas.getContext("2d")
  if (!ctx) return "rgba(0, 0, 0,"
  ctx.fillStyle = color
  ctx.fillRect(0, 0, 1, 1)
  const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data)
  return `rgba(${r}, ${g}, ${b},`
}

export function FlickeringGrid({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color = "rgb(0, 0, 0)",
  width,
  height,
  className,
  maxOpacity = 0.3,
  ...props
}: FlickeringGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })
  // Read every frame, so changing it doesn't need to rebuild the grid.
  const flickerChanceRef = useRef(flickerChance)

  useEffect(() => {
    flickerChanceRef.current = flickerChance
  }, [flickerChance])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    const context = canvas?.getContext("2d")
    if (!canvas || !container || !context) return

    const rgbaPrefix = toRgbaPrefix(color)
    const cell = squareSize + gridGap
    let grid: { columns: number; rows: number; squares: Float32Array; dpr: number } | null = null
    let animationFrame: number | null = null
    let lastTime = 0
    let isInView = false
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)") ?? null

    const setupCanvas = () => {
      const canvasWidth = width || container.clientWidth
      const canvasHeight = height || container.clientHeight
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvasWidth * dpr
      canvas.height = canvasHeight * dpr
      setCanvasSize((current) =>
        current.width === canvasWidth && current.height === canvasHeight ? current : { width: canvasWidth, height: canvasHeight }
      )
      const columns = Math.ceil(canvasWidth / cell)
      const rows = Math.ceil(canvasHeight / cell)
      const squares = new Float32Array(columns * rows)
      for (let i = 0; i < squares.length; i++) squares[i] = Math.random() * maxOpacity
      grid = { columns, rows, squares, dpr }
    }

    const draw = () => {
      if (!grid) return
      const { columns, rows, squares, dpr } = grid
      context.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
          context.fillStyle = `${rgbaPrefix}${squares[i * rows + j]})`
          context.fillRect(i * cell * dpr, j * cell * dpr, squareSize * dpr, squareSize * dpr)
        }
      }
    }

    const frame = (time: number) => {
      const deltaTime = lastTime ? (time - lastTime) / 1000 : 0
      lastTime = time
      if (grid) {
        for (let i = 0; i < grid.squares.length; i++) {
          if (Math.random() < flickerChanceRef.current * deltaTime) grid.squares[i] = Math.random() * maxOpacity
        }
      }
      draw()
      animationFrame = requestAnimationFrame(frame)
    }

    const stop = () => {
      if (animationFrame !== null) cancelAnimationFrame(animationFrame)
      animationFrame = null
      lastTime = 0
    }

    // Animate only while on screen, and never when the user prefers reduced motion.
    const syncAnimation = () => {
      const shouldAnimate = isInView && !reducedMotion?.matches
      if (shouldAnimate && animationFrame === null) animationFrame = requestAnimationFrame(frame)
      else if (!shouldAnimate) stop()
    }

    const rebuild = () => {
      setupCanvas()
      draw()
    }
    rebuild()

    const resizeObserver = new ResizeObserver(rebuild)
    resizeObserver.observe(container)

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isInView = entry?.isIntersecting ?? false
        syncAnimation()
      },
      { threshold: 0 }
    )
    intersectionObserver.observe(canvas)
    reducedMotion?.addEventListener?.("change", syncAnimation)

    return () => {
      stop()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      reducedMotion?.removeEventListener?.("change", syncAnimation)
    }
  }, [squareSize, gridGap, maxOpacity, color, width, height])

  return (
    <div ref={containerRef} {...props} className={cn("h-full w-full", className)}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none"
        style={{ width: canvasSize.width, height: canvasSize.height }}
      />
    </div>
  )
}
