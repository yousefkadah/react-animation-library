import { BorderBeam } from "@/components/ui/border-beam"

export default function BorderBeamReverse() {
  return (
    <div className="relative flex h-48 w-[350px] flex-col items-center justify-center overflow-hidden rounded-xl border bg-card shadow-sm">
      <p className="text-lg font-semibold">Counter-clockwise</p>
      <p className="text-sm text-muted-foreground">The beam travels in reverse.</p>
      <BorderBeam duration={4} size={300} reverse className="from-transparent via-green-500 to-transparent" />
    </div>
  )
}
