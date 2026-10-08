import { Gauge, Lock, Palette, Zap } from "lucide-react"

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"

const features = [
  {
    Icon: Zap,
    name: "Fast by default",
    description: "Pure CSS where it can be, Motion where it must.",
    cta: "Benchmarks",
    glow: "bg-linear-to-br from-yellow-300/30",
  },
  {
    Icon: Palette,
    name: "Themeable",
    description: "Every colour comes from your shadcn tokens.",
    cta: "Theming",
    glow: "bg-linear-to-bl from-pink-300/30",
  },
  {
    Icon: Lock,
    name: "Accessible",
    description: "Reduced motion and screen readers are first-class.",
    cta: "Accessibility",
    glow: "bg-linear-to-tr from-emerald-300/30",
  },
  {
    Icon: Gauge,
    name: "Tiny",
    description: "Copy only what you use — no runtime to install.",
    cta: "Install",
    glow: "bg-linear-to-tl from-sky-300/30",
  },
]

export default function BentoGridCompact() {
  return (
    <BentoGrid className="max-w-2xl auto-rows-[14rem] grid-cols-2">
      {features.map(({ glow, ...feature }) => (
        <BentoCard
          key={feature.name}
          {...feature}
          href="#"
          className="col-span-2 sm:col-span-1"
          background={<div className={`absolute inset-0 via-transparent to-transparent ${glow}`} aria-hidden="true" />}
        />
      ))}
    </BentoGrid>
  )
}
