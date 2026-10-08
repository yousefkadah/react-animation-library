var e=`"use client"

import { useEffect, useRef, useState, type ComponentPropsWithoutRef, type MouseEvent } from "react"
import { flushSync } from "react-dom"
import { Moon, Sun } from "lucide-react"

import { cn } from "@/lib/utils"

export type ThemeTransitionVariant = "circle" | "square" | "triangle" | "diamond" | "hexagon" | "rectangle" | "star"

function collapsedPolygon(point: string, vertexCount: number): string {
  return \`polygon(\${Array.from({ length: vertexCount }, () => point).join(", ")})\`
}

/**
 * Start and end clip-paths for the reveal, centred on (cx, cy).
 *
 * Every coordinate is a percentage of the snapshot box rather than pixels: Chrome renders px
 * clip-paths on \`::view-transition-new(root)\` unscaled on fractional display scales (e.g. Windows at
 * 150%) for the first transition after load, which puts the shape in the wrong place.
 */
function getThemeTransitionClipPaths(
  variant: ThemeTransitionVariant,
  cx: number,
  cy: number,
  maxRadius: number,
  viewportWidth: number,
  viewportHeight: number,
): [string, string] {
  const toX = (x: number) => \`\${(x / viewportWidth) * 100}%\`
  const toY = (y: number) => \`\${(y / viewportHeight) * 100}%\`
  const point = (x: number, y: number) => \`\${toX(x)} \${toY(y)}\`
  // circle() percentage radii resolve against hypot(w, h) / sqrt(2) of the reference box.
  const toRadius = (r: number) => \`\${(r / (Math.hypot(viewportWidth, viewportHeight) / Math.SQRT2)) * 100}%\`
  const center = point(cx, cy)

  switch (variant) {
    case "square": {
      const halfSide = Math.max(Math.max(cx, viewportWidth - cx), Math.max(cy, viewportHeight - cy)) * 1.05
      const end = [
        point(cx - halfSide, cy - halfSide),
        point(cx + halfSide, cy - halfSide),
        point(cx + halfSide, cy + halfSide),
        point(cx - halfSide, cy + halfSide),
      ]
      return [collapsedPolygon(center, 4), \`polygon(\${end.join(", ")})\`]
    }
    case "triangle": {
      const size = maxRadius * 2.2
      const dx = (Math.sqrt(3) / 2) * size
      const end = [point(cx, cy - size), point(cx + dx, cy + 0.5 * size), point(cx - dx, cy + 0.5 * size)]
      return [collapsedPolygon(center, 3), \`polygon(\${end.join(", ")})\`]
    }
    case "diamond": {
      // Slightly larger than the circle radius so the corners still cover the viewport.
      const radius = maxRadius * Math.SQRT2
      const end = [point(cx, cy - radius), point(cx + radius, cy), point(cx, cy + radius), point(cx - radius, cy)]
      return [collapsedPolygon(center, 4), \`polygon(\${end.join(", ")})\`]
    }
    case "hexagon": {
      const radius = maxRadius * Math.SQRT2
      const end = Array.from({ length: 6 }, (_, index) => {
        const angle = -Math.PI / 2 + (index * Math.PI) / 3
        return point(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle))
      })
      return [collapsedPolygon(center, 6), \`polygon(\${end.join(", ")})\`]
    }
    case "rectangle": {
      const halfWidth = Math.max(cx, viewportWidth - cx)
      const halfHeight = Math.max(cy, viewportHeight - cy)
      const end = [
        point(cx - halfWidth, cy - halfHeight),
        point(cx + halfWidth, cy - halfHeight),
        point(cx + halfWidth, cy + halfHeight),
        point(cx - halfWidth, cy + halfHeight),
      ]
      return [collapsedPolygon(center, 4), \`polygon(\${end.join(", ")})\`]
    }
    case "star": {
      // A small overscan so the last frames never leave a 1px seam.
      const radius = maxRadius * Math.SQRT2 * 1.03
      const innerRatio = 0.42
      const star = (outer: number) => {
        const vertices: string[] = []
        for (let index = 0; index < 5; index++) {
          const outerAngle = -Math.PI / 2 + (index * 2 * Math.PI) / 5
          vertices.push(point(cx + outer * Math.cos(outerAngle), cy + outer * Math.sin(outerAngle)))
          const innerAngle = outerAngle + Math.PI / 5
          vertices.push(point(cx + outer * innerRatio * Math.cos(innerAngle), cy + outer * innerRatio * Math.sin(innerAngle)))
        }
        return \`polygon(\${vertices.join(", ")})\`
      }
      return [star(Math.max(2, radius * 0.025)), star(radius)]
    }
    default:
      return [\`circle(0% at \${center})\`, \`circle(\${toRadius(maxRadius)} at \${center})\`]
  }
}

export interface AnimatedThemeTogglerProps extends ComponentPropsWithoutRef<"button"> {
  /** Length of the reveal in milliseconds. */
  duration?: number
  /** Shape of the reveal. */
  variant?: ThemeTransitionVariant
  /** Grow the reveal from the centre of the viewport instead of from the button. */
  fromCenter?: boolean
  /**
   * Controlled theme. When set, the parent owns persistence (e.g. \`next-themes\`) and the component
   * does not write to localStorage; pair it with \`onThemeChange\`.
   */
  theme?: "light" | "dark"
  /** Called on every toggle with the new theme. */
  onThemeChange?: (theme: "light" | "dark") => void
}

const STYLE_ID = "animated-theme-toggler-vt"

/**
 * Replaces the browser's default cross-fade for the duration of one transition and pins the new
 * snapshot to its collapsed shape until the reveal animation takes over.
 */
function injectTransitionStyle(clipFrom: string) {
  const style = document.createElement("style")
  style.id = STYLE_ID
  style.textContent = [
    "::view-transition-old(root),::view-transition-new(root){animation:none;mix-blend-mode:normal}",
    \`::view-transition-new(root){clip-path:\${clipFrom}}\`,
  ].join("")
  document.head.appendChild(style)
  return style
}

export function AnimatedThemeToggler({
  className,
  duration = 400,
  variant = "circle",
  fromCenter = false,
  theme,
  onThemeChange,
  onClick,
  ...props
}: AnimatedThemeTogglerProps) {
  const isControlled = theme !== undefined
  const [internalIsDark, setInternalIsDark] = useState(false)
  const isDark = isControlled ? theme === "dark" : internalIsDark
  const buttonRef = useRef<HTMLButtonElement>(null)
  const isTransitioning = useRef(false)
  const activeAnimation = useRef<Animation | null>(null)

  // Follow the <html> class, whoever changes it.
  useEffect(() => {
    const sync = () => setInternalIsDark(document.documentElement.classList.contains("dark"))
    sync()
    const observer = new MutationObserver(sync)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    return () => {
      activeAnimation.current?.cancel()
      activeAnimation.current = null
      if (isTransitioning.current) document.getElementById(STYLE_ID)?.remove()
    }
  }, [])

  const applyTheme = () => {
    const nextTheme = isDark ? "light" : "dark"
    // Toggle synchronously so the view transition snapshots the new theme.
    document.documentElement.classList.toggle("dark", nextTheme === "dark")
    if (!isControlled) {
      setInternalIsDark(nextTheme === "dark")
      try {
        localStorage.setItem("theme", nextTheme)
      } catch {
        // Storage can be unavailable (private mode); the toggle still works for this visit.
      }
    }
    onThemeChange?.(nextTheme)
  }

  const toggleTheme = () => {
    const button = buttonRef.current
    if (!button || isTransitioning.current) return

    if (typeof document.startViewTransition !== "function" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      applyTheme()
      return
    }

    // innerWidth/innerHeight include classic scrollbars, matching the snapshot box.
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    let x = viewportWidth / 2
    let y = viewportHeight / 2
    if (!fromCenter) {
      const { top, left, width, height } = button.getBoundingClientRect()
      x = left + width / 2
      y = top + height / 2
    }
    const maxRadius = Math.hypot(Math.max(x, viewportWidth - x), Math.max(y, viewportHeight - y))
    const clipPath = getThemeTransitionClipPaths(variant, x, y, maxRadius, viewportWidth, viewportHeight)

    isTransitioning.current = true
    const style = injectTransitionStyle(clipPath[0])
    const transition = document.startViewTransition(() => {
      flushSync(applyTheme)
    })

    transition.ready
      .then(() => {
        activeAnimation.current = document.documentElement.animate(
          { clipPath },
          {
            duration,
            // Linear avoids easing overshoot fighting the star's polygon interpolation.
            easing: variant === "star" ? "linear" : "ease-in-out",
            fill: "forwards",
            pseudoElement: "::view-transition-new(root)",
          }
        )
      })
      .catch(() => {})

    transition.finished
      .finally(() => {
        isTransitioning.current = false
        style.remove()
        activeAnimation.current?.cancel()
        activeAnimation.current = null
      })
      .catch(() => {})
  }

  return (
    <button
      type="button"
      ref={buttonRef}
      className={cn(className)}
      {...props}
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        if (!event.defaultPrevented) toggleTheme()
      }}
    >
      {isDark ? <Sun /> : <Moon />}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
`;export{e as default};