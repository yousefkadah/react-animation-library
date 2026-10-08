import { LightRays } from "@/components/ui/light-rays"

export default function LightRaysWarm() {
  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-lg border bg-amber-50/40 dark:bg-stone-950">
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-stone-900 md:text-5xl dark:text-amber-50">Golden hour</h2>
        <p className="max-w-sm text-sm text-stone-600 dark:text-amber-100/70">More rays, a warmer colour and a faster swing.</p>
      </div>
      <LightRays count={10} color="rgba(251, 191, 36, 0.45)" blur={28} speed={8} length="90%" />
    </div>
  )
}
