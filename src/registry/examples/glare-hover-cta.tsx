import { GlareHover } from "@/components/ui/glare-hover"

export default function GlareHoverCta() {
  return (
    <GlareHover className="w-full max-w-md rounded-xl" background="transparent" color="#505050" duration={700}>
      <div className="flex w-full flex-col gap-6 rounded-xl border bg-card py-6 text-center text-card-foreground shadow-sm">
        <div className="space-y-2 px-6">
          <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
            14-day free trial · No card required
          </p>
          <h3 className="text-2xl font-semibold tracking-tight">Ready to get started?</h3>
          <p className="mx-auto max-w-sm text-sm text-muted-foreground">
            Join 4,000+ teams already using our platform to ship faster.
          </p>
        </div>
        <div className="flex justify-center gap-2 px-6">
          <button className="h-9 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Start free trial
          </button>
          <button className="h-9 rounded-md border bg-background px-4 text-sm font-medium hover:bg-accent">View demo</button>
        </div>
      </div>
    </GlareHover>
  )
}
