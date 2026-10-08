import { NoiseTexture } from "@/components/ui/noise-texture"

export default function NoiseTextureButton() {
  return (
    <button
      type="button"
      className="group/button relative h-10 cursor-pointer overflow-hidden rounded-md bg-secondary px-8 text-sm font-medium text-secondary-foreground transition-transform active:scale-[0.98]"
    >
      <span className="relative z-10">Subscribe</span>
      <NoiseTexture noiseOpacity={0.45} className="transition-opacity group-hover/button:opacity-100" />
    </button>
  )
}
