"use client"

import { useId, type ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

/** Device artwork bounds; `width`/`height` only change the rendered size. */
const DEVICE_WIDTH = 380
const DEVICE_HEIGHT = 830
const SCREEN = { x: 9.25, y: 14.25, width: 359.5, height: 799.5, radius: 33.75 }

export interface AndroidProps extends ComponentPropsWithoutRef<"svg"> {
  /** Width of the SVG in pixels. The device scales to fit and stays centred. */
  width?: number
  /** Height of the SVG in pixels. */
  height?: number
  /** Image shown on the screen. */
  src?: string
  /** Video shown on the screen (autoplays muted and loops). Takes precedence over `src`. */
  videoSrc?: string
}

export function Android({ width = 433, height = 882, src, videoSrc, className, ...props }: AndroidProps) {
  const clipId = `${useId()}-screen`

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${DEVICE_WIDTH} ${DEVICE_HEIGHT}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={cn(className)}
    >
      <defs>
        <clipPath id={clipId}>
          <rect x={SCREEN.x} y={SCREEN.y} width={SCREEN.width} height={SCREEN.height} rx={SCREEN.radius} ry={SCREEN.radius} />
        </clipPath>
      </defs>

      {/* side buttons */}
      <path d="M376 153H378C379.105 153 380 153.895 380 155V249C380 250.105 379.105 251 378 251H376V153Z" className="fill-neutral-200 dark:fill-neutral-700" />
      <path d="M376 301H378C379.105 301 380 301.895 380 303V351C380 352.105 379.105 353 378 353H376V301Z" className="fill-neutral-200 dark:fill-neutral-700" />

      {/* body */}
      <path
        d="M0 42C0 18.8041 18.804 0 42 0H336C359.196 0 378 18.804 378 42V788C378 811.196 359.196 830 336 830H42C18.804 830 0 811.196 0 788V42Z"
        className="fill-neutral-200 dark:fill-neutral-700"
      />
      <path
        d="M2 43C2 22.0132 19.0132 5 40 5H338C358.987 5 376 22.0132 376 43V787C376 807.987 358.987 825 338 825H40C19.0132 825 2 807.987 2 787V43Z"
        className="fill-white dark:fill-neutral-800"
      />

      {/* screen */}
      <path
        d="M9.25 48C9.25 29.3604 24.3604 14.25 43 14.25H335C353.64 14.25 368.75 29.3604 368.75 48V780C368.75 798.64 353.64 813.75 335 813.75H43C24.3604 813.75 9.25 798.64 9.25 780V48Z"
        className="fill-neutral-200 stroke-neutral-200 stroke-[0.5] dark:fill-neutral-700 dark:stroke-neutral-700"
      />
      {src && !videoSrc && (
        <image
          href={src}
          x={SCREEN.x}
          y={SCREEN.y}
          width={SCREEN.width}
          height={SCREEN.height}
          preserveAspectRatio="xMidYMid slice"
          clipPath={`url(#${clipId})`}
        />
      )}
      {videoSrc && (
        <foreignObject x={SCREEN.x} y={SCREEN.y} width={SCREEN.width} height={SCREEN.height} clipPath={`url(#${clipId})`}>
          <video
            className="block size-full object-cover"
            style={{ borderRadius: SCREEN.radius }}
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
        </foreignObject>
      )}

      {/* punch-hole camera, drawn over the screen (a dark lens over media, like a real display) */}
      {src || videoSrc ? (
        <circle cx="189" cy="28" r="6" className="fill-neutral-950" />
      ) : (
        <>
          <circle cx="189" cy="28" r="9" className="fill-white dark:fill-neutral-800" />
          <circle cx="189" cy="28" r="4" className="fill-neutral-200 dark:fill-neutral-700" />
        </>
      )}
    </svg>
  )
}
