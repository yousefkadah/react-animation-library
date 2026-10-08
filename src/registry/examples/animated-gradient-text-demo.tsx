import type { CSSProperties } from "react"
import { ChevronRight } from "lucide-react"

import { AnimatedGradientText } from "@/components/ui/animated-gradient-text"

/** Cuts the gradient down to a 1px ring (the padding box minus the content box). */
const ringMask: CSSProperties = {
  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
  WebkitMaskComposite: "destination-out",
  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
  maskComposite: "subtract",
}

export default function AnimatedGradientTextDemo() {
  return (
    <div className="group relative mx-auto flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f]">
      <span
        className="animate-gradient absolute inset-0 block size-full rounded-[inherit] bg-linear-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-size-[300%_100%] p-px motion-reduce:animate-none"
        style={ringMask}
      />
      🎉 <hr className="mx-2 h-4 w-px shrink-0 border-0 bg-neutral-500" />
      <AnimatedGradientText className="text-sm font-medium">Introducing React Magic UI</AnimatedGradientText>
      <ChevronRight className="ms-1 size-4 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
    </div>
  )
}
