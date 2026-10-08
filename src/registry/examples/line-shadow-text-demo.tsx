import { LineShadowText } from "@/components/ui/line-shadow-text"

export default function LineShadowTextDemo() {
  return (
    <h1 className="text-5xl leading-none font-semibold tracking-tighter text-balance sm:text-6xl md:text-7xl lg:text-8xl">
      Ship{" "}
      <LineShadowText className="italic" shadowColor="var(--foreground)">
        Fast
      </LineShadowText>
    </h1>
  )
}
