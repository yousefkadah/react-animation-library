import { WarpBackground } from "@/components/ui/warp-background"

export default function WarpBackgroundDemo() {
  return (
    <WarpBackground>
      <div className="flex w-80 flex-col gap-2 rounded-xl border bg-card p-4 text-card-foreground shadow-sm">
        <h3 className="leading-none font-semibold">Congratulations on Your Promotion!</h3>
        <p className="text-sm text-muted-foreground">
          Your hard work and dedication have paid off. We&apos;re thrilled to see you take this next step in your career.
          Keep up the fantastic work!
        </p>
      </div>
    </WarpBackground>
  )
}
