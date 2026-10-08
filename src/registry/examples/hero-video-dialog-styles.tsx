"use client"

import { useState } from "react"

import { HeroVideoDialog, type HeroVideoAnimationStyle } from "@/components/ui/hero-video-dialog"

const styles: HeroVideoAnimationStyle[] = [
  "from-center",
  "from-bottom",
  "from-top",
  "from-left",
  "from-right",
  "fade",
  "top-in-bottom-out",
  "left-in-right-out",
]

export default function HeroVideoDialogStyles() {
  const [selected, setSelected] = useState<HeroVideoAnimationStyle>("from-left")

  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <div className="flex flex-wrap justify-center gap-1.5" role="radiogroup" aria-label="Animation style">
        {styles.map((style) => (
          <button
            key={style}
            type="button"
            role="radio"
            aria-checked={selected === style}
            className="rounded-full border px-3 py-1 font-mono text-xs transition-colors hover:bg-accent aria-checked:border-primary aria-checked:bg-primary aria-checked:text-primary-foreground"
            onClick={() => setSelected(style)}
          >
            {style}
          </button>
        ))}
      </div>
      <HeroVideoDialog
        animationStyle={selected}
        videoSrc="https://www.youtube.com/embed/8pDqJVdNa44"
        thumbnailSrc="https://i.ytimg.com/vi/8pDqJVdNa44/maxresdefault.jpg"
        thumbnailAlt="React.js: The Documentary"
      />
    </div>
  )
}
