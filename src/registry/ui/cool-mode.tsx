"use client"

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react"

export interface CoolModeOptions {
  /** `circle` (default), an image URL (`http…` or `/…`), or any text / emoji. */
  particle?: string
  /** Particle size in pixels. Random per particle when unset. */
  size?: number
  /** Most particles alive at once. */
  particleCount?: number
  /** Horizontal speed. Random per particle when unset. */
  speedHorz?: number
  /** Initial upward speed. Random per particle when unset. */
  speedUp?: number
}

interface Particle {
  element: HTMLElement
  left: number
  top: number
  size: number
  direction: number
  speedHorz: number
  speedUp: number
  spinSpeed: number
  spinVal: number
}

const SVG_NS = "http://www.w3.org/2000/svg"
const CONTAINER_ID = "_coolMode_effect"
const SIZES = [15, 20, 25, 35, 45]
const DEFAULT_LIMIT = 45
const GENERATION_DELAY = 30

let instanceCount = 0

function getContainer() {
  const existing = document.getElementById(CONTAINER_ID)
  if (existing) return existing
  const container = document.createElement("div")
  container.id = CONTAINER_ID
  container.setAttribute("aria-hidden", "true")
  container.setAttribute(
    "style",
    "overflow:hidden; position:fixed; height:100%; top:0; left:0; right:0; bottom:0; pointer-events:none; z-index:2147483647",
  )
  document.body.appendChild(container)
  return container
}

/**
 * Sprays particles from the pointer while `element` is pressed. Returns a cleanup function; the
 * particles already in flight finish their arc before the shared overlay is removed.
 */
function applyParticleEffect(element: HTMLElement, options: CoolModeOptions = {}): () => void {
  instanceCount++
  const particleType = options.particle || "circle"
  const limit = options.particleCount ?? DEFAULT_LIMIT
  const container = getContainer()

  let particles: Particle[] = []
  let autoAddParticle = false
  let stopping = false
  let mouseX = 0
  let mouseY = 0
  let lastParticleTime = 0
  let frame = 0

  function appendCircle(particle: HTMLElement, size: number) {
    const svg = document.createElementNS(SVG_NS, "svg")
    const circle = document.createElementNS(SVG_NS, "circle")
    circle.setAttributeNS(null, "cx", String(size / 2))
    circle.setAttributeNS(null, "cy", String(size / 2))
    circle.setAttributeNS(null, "r", String(size / 2))
    circle.setAttributeNS(null, "fill", `hsl(${Math.random() * 360}, 70%, 50%)`)
    svg.appendChild(circle)
    svg.setAttribute("width", String(size))
    svg.setAttribute("height", String(size))
    particle.appendChild(svg)
  }

  function appendImage(particle: HTMLElement, src: string, size: number) {
    const image = document.createElement("img")
    image.src = src
    image.width = size
    image.height = size
    image.alt = ""
    image.style.borderRadius = "50%"
    particle.appendChild(image)
  }

  function appendText(particle: HTMLElement, text: string, size: number) {
    const multiplier = 3
    const content = document.createElement("div")
    content.textContent = text
    Object.assign(content.style, {
      fontSize: `${size * multiplier}px`,
      lineHeight: "1",
      textAlign: "center",
      width: `${size}px`,
      height: `${size}px`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transform: `scale(${multiplier})`,
      transformOrigin: "center",
    })
    particle.appendChild(content)
  }

  function generateParticle() {
    const size = options.size || SIZES[Math.floor(Math.random() * SIZES.length)]
    const speedHorz = options.speedHorz || Math.random() * 10
    const speedUp = options.speedUp || Math.random() * 25
    const spinVal = Math.random() * 360
    const spinSpeed = Math.random() * 35 * (Math.random() <= 0.5 ? -1 : 1)
    const top = mouseY - size / 2
    const left = mouseX - size / 2
    const direction = Math.random() <= 0.5 ? -1 : 1

    const particle = document.createElement("div")
    if (particleType === "circle") appendCircle(particle, size)
    else if (particleType.startsWith("http") || particleType.startsWith("/")) appendImage(particle, particleType, size)
    else appendText(particle, particleType, size)

    particle.style.position = "absolute"
    particle.style.transform = `translate3d(${left}px, ${top}px, 0px) rotate(${spinVal}deg)`
    container.appendChild(particle)
    particles.push({ element: particle, left, top, size, direction, speedHorz, speedUp, spinSpeed, spinVal })
  }

  function refreshParticles() {
    const floor = Math.max(window.innerHeight, document.body.clientHeight)
    particles = particles.filter((particle) => {
      particle.left -= particle.speedHorz * particle.direction
      particle.top -= particle.speedUp
      particle.speedUp = Math.min(particle.size, particle.speedUp - 1)
      particle.spinVal += particle.spinSpeed
      if (particle.top >= floor + particle.size) {
        particle.element.remove()
        return false
      }
      particle.element.setAttribute(
        "style",
        `position:absolute;will-change:transform;top:${particle.top}px;left:${particle.left}px;transform:rotate(${particle.spinVal}deg)`,
      )
      return true
    })
  }

  function finalize() {
    if (--instanceCount === 0) container.remove()
  }

  /** Runs only while particles are spawning or in flight. */
  function loop() {
    const now = performance.now()
    if (autoAddParticle && particles.length < limit && now - lastParticleTime > GENERATION_DELAY) {
      generateParticle()
      lastParticleTime = now
    }
    refreshParticles()
    if (particles.length === 0 && !autoAddParticle) {
      frame = 0
      if (stopping) finalize()
      return
    }
    frame = requestAnimationFrame(loop)
  }

  function ensureLoop() {
    if (!frame) frame = requestAnimationFrame(loop)
  }

  // Pointer events cover mouse, pen and touch (Magic UI"s touch-or-mouse switch broke mouse input
  // on touchscreen laptops).
  const updatePosition = (event: PointerEvent) => {
    mouseX = event.clientX
    mouseY = event.clientY
  }
  const onPress = (event: PointerEvent) => {
    updatePosition(event)
    autoAddParticle = true
    ensureLoop()
  }
  const stopAdding = () => {
    autoAddParticle = false
  }

  element.addEventListener("pointermove", updatePosition, { passive: true })
  element.addEventListener("pointerdown", onPress, { passive: true })
  element.addEventListener("pointerup", stopAdding, { passive: true })
  element.addEventListener("pointercancel", stopAdding, { passive: true })
  element.addEventListener("pointerleave", stopAdding, { passive: true })

  return () => {
    element.removeEventListener("pointermove", updatePosition)
    element.removeEventListener("pointerdown", onPress)
    element.removeEventListener("pointerup", stopAdding)
    element.removeEventListener("pointercancel", stopAdding)
    element.removeEventListener("pointerleave", stopAdding)
    autoAddParticle = false
    stopping = true
    // Let particles in flight finish their arc; finalize right away when there are none.
    if (!frame) finalize()
  }
}

export interface CoolModeProps extends ComponentPropsWithoutRef<"span"> {
  /** Particle settings. Changing them restarts the effect. */
  options?: CoolModeOptions
}

export function CoolMode({ children, options, ...props }: CoolModeProps) {
  const ref = useRef<HTMLSpanElement>(null)
  // Restart only when the options' content changes, not on every new object identity.
  const optionsKey = JSON.stringify(options ?? {})

  useEffect(() => {
    if (!ref.current) return
    return applyParticleEffect(ref.current, JSON.parse(optionsKey) as CoolModeOptions)
  }, [optionsKey])

  return (
    <span ref={ref} {...props}>
      {children}
    </span>
  )
}
