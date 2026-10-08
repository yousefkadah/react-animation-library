var e=`"use client"

import { isValidElement, useEffect, useRef, useState, type ReactNode } from "react"
import { renderToString } from "react-dom/server"
import { Pause, Play } from "lucide-react"
import { useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

export interface IconCloudProps {
  className?: string
  /** Icons to place on the sphere: React elements (e.g. inline SVGs or Lucide icons) or SVG markup strings. */
  icons?: ReactNode[]
  /** Image URLs to place on the sphere (cropped to circles). Used when \`icons\` is not set. */
  images?: string[]
  /** Show the play / pause button. */
  showControl?: boolean
}

interface SpherePoint {
  x: number
  y: number
  z: number
  id: number
}

interface RotationTarget {
  x: number
  y: number
  startX: number
  startY: number
  startTime: number
  duration: number
}

/** Logical canvas size in CSS pixels (the backing store is scaled by devicePixelRatio). */
const SIZE = 400
const ICON_SIZE = 40
const SVG_NS = "http://www.w3.org/2000/svg"

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

/** Places \`count\` points evenly on a sphere of radius 100 (Fibonacci lattice). */
function buildSphere(count: number): SpherePoint[] {
  const offset = 2 / count
  const increment = Math.PI * (3 - Math.sqrt(5))
  return Array.from({ length: count }, (_, index) => {
    const y = index * offset - 1 + offset / 2
    const radius = Math.sqrt(1 - y * y)
    const phi = index * increment
    return { x: Math.cos(phi) * radius * 100, y: y * 100, z: Math.sin(phi) * radius * 100, id: index }
  })
}

function toSvgMarkup(icon: ReactNode): string {
  if (typeof icon === "string") return icon
  const markup = isValidElement(icon) ? renderToString(icon) : ""
  return /<svg[^>]*\\sxmlns=/.test(markup) ? markup : markup.replace("<svg", \`<svg xmlns="\${SVG_NS}"\`)
}

export function IconCloud({ className, icons, images, showControl = true }: IconCloudProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const reducedMotion = useReducedMotion()

  // Everything the render loop touches lives in a ref so animating never re-renders React.
  const scene = useRef({
    points: [] as SpherePoint[],
    iconCanvases: [] as HTMLCanvasElement[],
    loaded: [] as boolean[],
    hasMedia: false,
    rotation: { x: 0, y: 0 },
    target: null as RotationTarget | null,
    isDragging: false,
    isPaused: false,
    lastPointer: { x: 0, y: 0 },
    mouse: { x: 0, y: 0 },
    dpr: 1,
    frame: 0,
    disposed: true,
  })

  const project = (point: SpherePoint) => {
    const { rotation } = scene.current
    const cosX = Math.cos(rotation.x)
    const sinX = Math.sin(rotation.x)
    const cosY = Math.cos(rotation.y)
    const sinY = Math.sin(rotation.y)
    const rotatedX = point.x * cosY - point.z * sinY
    const rotatedZ = point.x * sinY + point.z * cosY
    const rotatedY = point.y * cosX + rotatedZ * sinX
    return { x: rotatedX, y: rotatedY, z: rotatedZ }
  }

  const draw = () => {
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d")
    if (!canvas || !context) return
    const s = scene.current
    context.setTransform(s.dpr, 0, 0, s.dpr, 0, 0)
    context.clearRect(0, 0, SIZE, SIZE)

    const center = SIZE / 2
    const maxDistance = Math.sqrt(center * center * 2)
    const dx = s.mouse.x - center
    const dy = s.mouse.y - center
    const speed = 0.003 + (Math.sqrt(dx * dx + dy * dy) / maxDistance) * 0.01

    if (s.target) {
      const progress = Math.min(1, (performance.now() - s.target.startTime) / s.target.duration)
      const eased = easeOutCubic(progress)
      s.rotation = {
        x: s.target.startX + (s.target.x - s.target.startX) * eased,
        y: s.target.startY + (s.target.y - s.target.startY) * eased,
      }
      if (progress >= 1) s.target = null
    } else if (!s.isDragging && !s.isPaused) {
      s.rotation = { x: s.rotation.x + (dy / SIZE) * speed, y: s.rotation.y + (dx / SIZE) * speed }
    }

    s.points.forEach((point, index) => {
      const projected = project(point)
      const scale = (projected.z + 200) / 300
      context.save()
      context.translate(center + projected.x, center + projected.y)
      context.scale(scale, scale)
      context.globalAlpha = Math.max(0.2, Math.min(1, (projected.z + 150) / 200))
      if (s.hasMedia) {
        if (s.iconCanvases[index] && s.loaded[index]) {
          context.drawImage(s.iconCanvases[index], -ICON_SIZE / 2, -ICON_SIZE / 2, ICON_SIZE, ICON_SIZE)
        }
      } else {
        context.beginPath()
        context.arc(0, 0, 20, 0, Math.PI * 2)
        context.fillStyle = "#4444ff"
        context.fill()
        context.fillStyle = "white"
        context.textAlign = "center"
        context.textBaseline = "middle"
        context.font = "16px Arial"
        context.fillText(\`\${point.id + 1}\`, 0, 0)
      }
      context.restore()
    })
  }

  const tick = () => {
    const s = scene.current
    s.frame = 0
    if (s.disposed) return
    draw()
    const hasPendingAssets = s.hasMedia && !s.loaded.every(Boolean)
    if (!s.isPaused || s.isDragging || s.target !== null || hasPendingAssets) s.frame = requestAnimationFrame(tick)
  }

  /** (Re)starts the render loop if it has stopped (it idles while paused). */
  const start = () => {
    const s = scene.current
    if (!s.frame && !s.disposed) s.frame = requestAnimationFrame(tick)
  }

  // Pause for reduced motion, and follow changes to the preference.
  useEffect(() => {
    setIsPaused(Boolean(reducedMotion))
  }, [reducedMotion])

  useEffect(() => {
    scene.current.isPaused = isPaused
    if (!isPaused) start()
  }, [isPaused])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const s = scene.current
    s.disposed = false
    s.dpr = window.devicePixelRatio || 1
    canvas.width = SIZE * s.dpr
    canvas.height = SIZE * s.dpr

    const items: (ReactNode | string)[] = icons ?? images ?? []
    s.points = buildSphere(items.length || 20)
    s.hasMedia = Boolean(icons || images)
    s.loaded = items.map(() => false)
    s.iconCanvases = items.map((item, index) => {
      const offscreen = document.createElement("canvas")
      offscreen.width = ICON_SIZE * s.dpr
      offscreen.height = ICON_SIZE * s.dpr
      const context = offscreen.getContext("2d")
      if (!context) return offscreen
      context.scale(s.dpr, s.dpr)

      const image = new Image()
      if (icons) {
        image.src = \`data:image/svg+xml;charset=utf-8,\${encodeURIComponent(toSvgMarkup(item))}\`
        image.onload = () => {
          context.clearRect(0, 0, ICON_SIZE, ICON_SIZE)
          context.drawImage(image, 0, 0, ICON_SIZE, ICON_SIZE)
          s.loaded[index] = true
          start()
        }
      } else {
        image.crossOrigin = "anonymous"
        image.src = item as string
        image.onload = () => {
          context.clearRect(0, 0, ICON_SIZE, ICON_SIZE)
          context.beginPath()
          context.arc(ICON_SIZE / 2, ICON_SIZE / 2, ICON_SIZE / 2, 0, Math.PI * 2)
          context.closePath()
          context.clip()
          context.drawImage(image, 0, 0, ICON_SIZE, ICON_SIZE)
          s.loaded[index] = true
          start()
        }
      }
      return offscreen
    })

    start()
    return () => {
      s.disposed = true
      if (s.frame) cancelAnimationFrame(s.frame)
      s.frame = 0
    }
  }, [icons, images])

  const localPosition = (clientX: number, clientY: number) => {
    const rect = canvasRef.current!.getBoundingClientRect()
    return { x: ((clientX - rect.left) / rect.width) * SIZE, y: ((clientY - rect.top) / rect.height) * SIZE }
  }

  return (
    <div className={cn("relative inline-block", className)}>
      <canvas
        ref={canvasRef}
        width={SIZE}
        height={SIZE}
        className="aspect-square w-[400px] max-w-full rounded-lg"
        role="img"
        aria-label="Interactive 3D Icon Cloud"
        onPointerDown={(event) => {
          if (!canvasRef.current) return
          const s = scene.current
          const { x, y } = localPosition(event.clientX, event.clientY)
          const hit = s.points.find((point) => {
            const projected = project(point)
            const radius = 20 * ((projected.z + 200) / 300)
            const dx = x - (SIZE / 2 + projected.x)
            const dy = y - (SIZE / 2 + projected.y)
            return dx * dx + dy * dy < radius * radius
          })
          if (hit) {
            // Rotate the clicked icon to the front.
            const targetX = -Math.atan2(hit.y, Math.sqrt(hit.x * hit.x + hit.z * hit.z))
            const targetY = Math.atan2(hit.x, hit.z)
            const distance = Math.hypot(targetX - s.rotation.x, targetY - s.rotation.y)
            s.target = {
              x: targetX,
              y: targetY,
              startX: s.rotation.x,
              startY: s.rotation.y,
              startTime: performance.now(),
              duration: Math.min(2000, Math.max(800, distance * 1000)),
            }
          }
          s.isDragging = true
          s.lastPointer = { x: event.clientX, y: event.clientY }
          start()
        }}
        onPointerMove={(event) => {
          if (!canvasRef.current) return
          const s = scene.current
          s.mouse = localPosition(event.clientX, event.clientY)
          if (s.isDragging) {
            s.rotation = {
              x: s.rotation.x + (event.clientY - s.lastPointer.y) * 0.002,
              y: s.rotation.y + (event.clientX - s.lastPointer.x) * 0.002,
            }
            s.lastPointer = { x: event.clientX, y: event.clientY }
            start()
          }
        }}
        onPointerUp={() => {
          scene.current.isDragging = false
        }}
        onPointerLeave={() => {
          scene.current.isDragging = false
        }}
      />
      {showControl && (
        <button
          type="button"
          className="absolute end-2 top-2 inline-flex size-9 items-center justify-center rounded-md border bg-background shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50"
          aria-label={isPaused ? "Play Animation" : "Pause Animation"}
          onClick={() => setIsPaused((paused) => !paused)}
        >
          {isPaused ? <Play size={16} /> : <Pause size={16} />}
        </button>
      )}
    </div>
  )
}
`;export{e as default};