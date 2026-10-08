var e=`"use client"

import { useRef } from "react"
import { ChevronsDown } from "lucide-react"

import { TextReveal } from "@/components/ui/text-reveal"

export default function TextRevealDemo() {
  const scroller = useRef<HTMLDivElement>(null)

  return (
    <div className="relative w-full">
      {/* The preview box is short, so TextReveal tracks this scroll area instead of the page. */}
      <div ref={scroller} className="h-[350px] w-full overflow-y-auto">
        <TextReveal container={scroller} className="h-[700px]">
          React Magic UI will change the way you design.
        </TextReveal>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-2 flex items-center justify-center gap-1 text-xs text-muted-foreground">
        Scroll
        <ChevronsDown className="size-3.5 animate-bounce motion-reduce:animate-none" />
      </div>
    </div>
  )
}
`;export{e as default};