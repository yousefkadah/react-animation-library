import { FlickeringGrid } from "@/components/ui/flickering-grid"

export default function FlickeringGridDemo() {
  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-lg border bg-background">
      <FlickeringGrid
        className="absolute inset-0 z-0 size-full"
        squareSize={4}
        gridGap={6}
        color="#6B7280"
        maxOpacity={0.5}
        flickerChance={0.1}
      />
    </div>
  )
}
