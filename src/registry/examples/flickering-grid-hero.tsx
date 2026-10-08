import { FlickeringGrid } from "@/components/ui/flickering-grid"

export default function FlickeringGridHero() {
  return (
    <div className="relative flex h-[400px] w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-lg border bg-background px-6 text-center">
      <FlickeringGrid
        className="absolute inset-0 z-0 size-full [mask-image:linear-gradient(to_bottom,white,transparent_85%)]"
        squareSize={6}
        gridGap={4}
        color="rgb(139, 92, 246)"
        maxOpacity={0.35}
        flickerChance={0.2}
      />
      <h2 className="relative z-10 text-4xl font-bold tracking-tighter sm:text-5xl">Always on.</h2>
      <p className="relative z-10 max-w-sm text-sm text-muted-foreground sm:text-base">
        A canvas grid that only animates while it&apos;s on screen, so it never costs a frame it doesn&apos;t show.
      </p>
    </div>
  )
}
