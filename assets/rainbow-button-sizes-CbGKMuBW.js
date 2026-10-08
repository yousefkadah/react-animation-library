var e=`import { Sparkles } from "lucide-react"

import { RainbowButton } from "@/components/ui/rainbow-button"

export default function RainbowButtonSizes() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <RainbowButton size="sm">Small</RainbowButton>
      <RainbowButton>Default</RainbowButton>
      <RainbowButton size="lg">Large</RainbowButton>
      <RainbowButton size="icon" aria-label="Sparkles">
        <Sparkles />
      </RainbowButton>
      <RainbowButton asChild variant="outline" className="[--speed:4s]">
        <a href="#">Link, slower</a>
      </RainbowButton>
    </div>
  )
}
`;export{e as default};