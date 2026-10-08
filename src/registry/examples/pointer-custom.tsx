import { Pointer } from "@/components/ui/pointer"

export default function PointerCustom() {
  return (
    <div className="relative flex h-64 w-full max-w-lg flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border bg-background">
      <p className="text-2xl font-semibold tracking-tight">Hover me</p>
      <p className="text-sm text-muted-foreground">The cursor is replaced only inside this card.</p>
      <Pointer transition={{ type: "spring", stiffness: 400, damping: 20 }}>
        <div className="flex items-center gap-1.5">
          <span className="size-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/30" />
          <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-xs font-medium text-white shadow-sm">You</span>
        </div>
      </Pointer>
    </div>
  )
}
