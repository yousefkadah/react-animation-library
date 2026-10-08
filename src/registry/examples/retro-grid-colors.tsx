import { RetroGrid } from "@/components/ui/retro-grid"

export default function RetroGridColors() {
  return (
    <div className="relative flex h-[400px] w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border bg-background">
      <p className="z-10 text-sm font-medium tracking-[0.3em] text-muted-foreground uppercase">Now playing</p>
      <p className="z-10 text-5xl font-bold tracking-tighter text-fuchsia-600 dark:text-fuchsia-400">Neon Nights</p>
      <RetroGrid angle={75} cellSize={40} opacity={0.7} lightLineColor="#c026d3" darkLineColor="#e879f9" />
    </div>
  )
}
