var e=`"use client"

import { useRef } from "react"

import { TextReveal } from "@/components/ui/text-reveal"

export default function TextRevealCard() {
  const scroller = useRef<HTMLDivElement>(null)

  return (
    <div className="relative w-full max-w-2xl overflow-hidden rounded-xl border bg-card shadow-sm">
      <div ref={scroller} className="h-[320px] overflow-y-auto">
        <TextReveal container={scroller} className="h-[640px]">
          Every word fades in as you scroll, so the story unfolds at the reader's pace.
        </TextReveal>
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-linear-to-b from-card" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-card" />
    </div>
  )
}
`;export{e as default};