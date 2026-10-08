var e=`"use client"

import { useId, type ReactNode } from "react"

import { cn } from "@/lib/utils"

export interface BacklightProps {
  /** The video, image or SVG that casts the glow. */
  children?: ReactNode
  className?: string
  /** Blur radius (SVG \`stdDeviation\`) of the glow. */
  blur?: number
}

export function Backlight({ blur = 20, children, className }: BacklightProps) {
  // React ids contain characters such as ":" or "«" that would break the url(#…) reference.
  const id = \`backlight-\${useId().replace(/[^\\w-]/g, "")}\`

  return (
    <div className={cn(className)}>
      <svg width="0" height="0" aria-hidden="true" className="pointer-events-none absolute">
        <filter id={id} y="-50%" x="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation={blur} result="blurred" />
          <feColorMatrix type="saturate" in="blurred" values="4" />
          <feComposite in="SourceGraphic" operator="over" />
        </filter>
      </svg>

      <div style={{ filter: \`url(#\${id})\` }}>{children}</div>
    </div>
  )
}
`;export{e as default};