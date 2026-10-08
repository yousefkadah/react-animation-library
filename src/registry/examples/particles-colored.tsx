import { Particles } from "@/components/ui/particles"

export default function ParticlesColored() {
  return (
    <div className="relative flex h-[320px] w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border bg-background">
      <h3 className="z-10 bg-linear-to-br from-violet-500 to-fuchsia-500 bg-clip-text text-5xl font-semibold tracking-tight text-transparent">
        Stay curious
      </h3>
      <p className="z-10 text-sm text-muted-foreground">Move your pointer — the particles lean toward it.</p>
      <Particles className="absolute inset-0" quantity={160} staticity={30} ease={60} size={0.6} color="#a855f7" />
    </div>
  )
}
