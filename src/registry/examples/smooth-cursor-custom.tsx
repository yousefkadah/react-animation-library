"use client"

import { useState } from "react"

import { SmoothCursor } from "@/components/ui/smooth-cursor"

const springConfig = { damping: 30, stiffness: 300, mass: 0.6, restDelta: 0.001 }

export default function SmoothCursorCustom() {
  const [enabled, setEnabled] = useState(false)

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <p className="max-w-xs text-sm text-muted-foreground">
        Pass any element as <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">cursor</code>. The most recently
        mounted SmoothCursor wins, so this one takes over while it&apos;s on.
      </p>
      <button
        type="button"
        className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        aria-pressed={enabled}
        onClick={() => setEnabled((value) => !value)}
      >
        {enabled ? "Use the default cursor" : "Try a custom cursor"}
      </button>
      {enabled && (
        <SmoothCursor
          springConfig={springConfig}
          cursor={
            <div className="flex size-8 items-center justify-center rounded-full border-2 border-violet-500 bg-violet-500/15 backdrop-blur-sm">
              <div className="size-2 -translate-y-1 rounded-full bg-violet-500" />
            </div>
          }
        />
      )}
    </div>
  )
}
