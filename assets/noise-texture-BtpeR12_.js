var e=`"use client"

import { useId, type ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

export interface NoiseTextureProps extends ComponentPropsWithoutRef<"svg"> {
  /** \`baseFrequency\` of the turbulence; higher values give finer grain. */
  frequency?: number
  /** \`numOctaves\` of the turbulence; more octaves add detail at smaller scales. */
  octaves?: number
  /** Linear slope applied to each channel after desaturating; controls the contrast of the grain. */
  slope?: number
  /** Opacity of the noise layer. */
  noiseOpacity?: number
}

export function NoiseTexture({
  className,
  frequency = 0.4,
  octaves = 6,
  slope = 0.15,
  noiseOpacity = 0.6,
  ...props
}: NoiseTextureProps) {
  const filterId = useId()

  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={cn(
        "pointer-events-none absolute inset-0 z-0 size-full opacity-50 select-none dark:opacity-[0.75]",
        className
      )}
    >
      <filter id={filterId}>
        <feTurbulence type="fractalNoise" baseFrequency={frequency} numOctaves={octaves} stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncR type="linear" slope={slope} />
          <feFuncG type="linear" slope={slope} />
          <feFuncB type="linear" slope={slope} />
        </feComponentTransfer>
      </filter>
      <rect width="100%" height="100%" filter={\`url(#\${filterId})\`} opacity={noiseOpacity} />
    </svg>
  )
}
`;export{e as default};