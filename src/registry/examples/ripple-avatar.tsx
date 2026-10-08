import { Ripple } from "@/components/ui/ripple"

export default function RippleAvatar() {
  return (
    <div className="relative flex h-[400px] w-full flex-col items-center justify-center gap-6 overflow-hidden rounded-lg border bg-background">
      <div className="relative size-24">
        <Ripple mainCircleSize={130} mainCircleOpacity={0.2} numCircles={6} className="[mask-image:none]" />
        <img
          src="https://avatar.vercel.sh/jane"
          alt="Jane Cooper"
          width={96}
          height={96}
          className="relative z-10 size-24 rounded-full border-4 border-background shadow-lg"
        />
      </div>
      <div className="z-10 text-center">
        <p className="text-lg font-semibold">Jane Cooper</p>
        <p className="text-sm text-muted-foreground">Calling…</p>
      </div>
    </div>
  )
}
