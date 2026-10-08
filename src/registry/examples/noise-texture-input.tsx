import { NoiseTexture } from "@/components/ui/noise-texture"

export default function NoiseTextureInput() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <label htmlFor="noise-input-demo" className="text-sm font-medium text-muted-foreground">
        Search with texture
      </label>
      <div className="relative overflow-hidden rounded-lg border bg-muted/30">
        <NoiseTexture noiseOpacity={0.45} />
        <input
          id="noise-input-demo"
          type="search"
          placeholder="Try typing…"
          className="relative z-10 h-10 w-full bg-transparent px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        />
      </div>
    </div>
  )
}
