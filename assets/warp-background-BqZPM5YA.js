var e=`"use client"

import { useEffect, useState, type ComponentPropsWithoutRef, type CSSProperties } from "react"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

export interface WarpBackgroundProps extends ComponentPropsWithoutRef<"div"> {
  /** CSS perspective of the tunnel in pixels. */
  perspective?: number
  /** Number of beams on each of the four walls. */
  beamsPerSide?: number
  /** Size of a beam (and of a grid cell) as a percentage of the wall. */
  beamSize?: number
  /** Maximum random delay in seconds before a beam starts. */
  beamDelayMax?: number
  /** Minimum random delay in seconds before a beam starts. */
  beamDelayMin?: number
  /** Seconds a beam takes to travel the length of a wall. */
  beamDuration?: number
  /** Colour of the grid lines. */
  gridColor?: string
}

interface Beam {
  x: number
  delay: number
  hue: number
  aspectRatio: number
}

type Side = "top" | "bottom" | "left" | "right"

const grid =
  "bg-size-[var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,var(--grid-color)_0_1px,transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] transform-3d"

/** The four walls of the tunnel, each folded 90° into the screen. */
const sides: { name: Side; className: string }[] = [
  { name: "top", className: \`@container absolute z-20 h-[100cqmax] w-[100cqi] origin-[50%_0%] transform-[rotateX(-90deg)] \${grid}\` },
  { name: "bottom", className: \`@container absolute top-full h-[100cqmax] w-[100cqi] origin-[50%_0%] transform-[rotateX(-90deg)] \${grid}\` },
  {
    name: "left",
    className: \`@container absolute top-0 left-0 h-[100cqmax] w-[100cqh] origin-[0%_0%] transform-[rotate(90deg)_rotateX(-90deg)] \${grid}\`,
  },
  {
    name: "right",
    className: \`@container absolute top-0 right-0 h-[100cqmax] w-[100cqh] origin-[100%_0%] transform-[rotate(-90deg)_rotateX(-90deg)] \${grid}\`,
  },
]

const noBeams: Record<Side, Beam[]> = { top: [], bottom: [], left: [], right: [] }

function BeamLine({ beam, beamSize, duration }: { beam: Beam; beamSize: number; duration: number }) {
  return (
    <motion.div
      style={
        {
          "--x": \`\${beam.x * beamSize}%\`,
          "--width": \`\${beamSize}%\`,
          "--aspect-ratio": \`\${beam.aspectRatio}\`,
          "--background": \`linear-gradient(hsl(\${beam.hue} 80% 60%), transparent)\`,
        } as CSSProperties
      }
      className="absolute top-0 left-(--x) aspect-[1/var(--aspect-ratio)] w-(--width) [background:var(--background)]"
      initial={{ y: "100cqmax", x: "-50%" }}
      animate={{ y: "-100%", x: "-50%" }}
      transition={{ duration, delay: beam.delay, repeat: Infinity, ease: "linear" }}
    />
  )
}

export function WarpBackground({
  children,
  perspective = 100,
  className,
  beamsPerSide = 3,
  beamSize = 5,
  beamDelayMax = 3,
  beamDelayMin = 0,
  beamDuration = 3,
  gridColor = "var(--border)",
  ...props
}: WarpBackgroundProps) {
  const reducedMotion = useReducedMotion()
  // Beams are random, so they are generated after mount and stay stable between renders.
  const [beams, setBeams] = useState(noBeams)

  useEffect(() => {
    const generateBeams = (): Beam[] => {
      const cellsPerSide = Math.floor(100 / beamSize)
      const step = cellsPerSide / beamsPerSide
      return Array.from({ length: beamsPerSide }, (_, index) => ({
        x: Math.floor(index * step),
        delay: Math.random() * (beamDelayMax - beamDelayMin) + beamDelayMin,
        hue: Math.floor(Math.random() * 360),
        aspectRatio: Math.floor(Math.random() * 10) + 1,
      }))
    }
    setBeams({ top: generateBeams(), bottom: generateBeams(), left: generateBeams(), right: generateBeams() })
  }, [beamsPerSide, beamSize, beamDelayMax, beamDelayMin])

  return (
    <div className={cn("relative rounded border p-20", className)} {...props}>
      <div
        aria-hidden="true"
        style={
          {
            "--perspective": \`\${perspective}px\`,
            "--grid-color": gridColor,
            "--beam-size": \`\${beamSize}%\`,
          } as CSSProperties
        }
        className="pointer-events-none absolute top-0 left-0 size-full overflow-hidden [clip-path:inset(0)] perspective-(--perspective) transform-3d @container-[size]"
      >
        {sides.map((side) => (
          <div key={side.name} className={side.className}>
            {!reducedMotion &&
              beams[side.name].map((beam, index) => (
                <BeamLine key={\`\${side.name}-\${index}\`} beam={beam} beamSize={beamSize} duration={beamDuration} />
              ))}
          </div>
        ))}
      </div>
      <div className="relative">{children}</div>
    </div>
  )
}
`;export{e as default};