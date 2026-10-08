import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"

export default function InteractiveHoverButtonCustom() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <InteractiveHoverButton className="px-8 py-3 text-lg">Get started</InteractiveHoverButton>
      {/* The fill and its text follow --primary / --primary-foreground, so a scoped override recolours them. */}
      <InteractiveHoverButton className="border-emerald-500/40 [--primary-foreground:#ffffff] [--primary:#10b981]">
        Book a demo
      </InteractiveHoverButton>
    </div>
  )
}
