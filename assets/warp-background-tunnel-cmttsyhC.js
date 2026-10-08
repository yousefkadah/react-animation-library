var e=`import { WarpBackground } from "@/components/ui/warp-background"

export default function WarpBackgroundTunnel() {
  return (
    <WarpBackground perspective={60} beamsPerSide={5} beamSize={4} beamDuration={2} className="rounded-2xl p-16">
      <div className="flex flex-col items-center gap-1 rounded-full border bg-background/80 px-6 py-3 text-center backdrop-blur">
        <span className="text-sm font-semibold">Hyperdrive engaged</span>
        <span className="text-xs text-muted-foreground">More beams, a deeper tunnel, faster travel</span>
      </div>
    </WarpBackground>
  )
}
`;export{e as default};