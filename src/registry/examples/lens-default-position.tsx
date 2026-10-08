import { Lens } from "@/components/ui/lens"

export default function LensDefaultPosition() {
  return (
    <div className="relative flex w-full max-w-md flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground">
      <div className="px-6">
        <Lens defaultPosition={{ x: 260, y: 150 }}>
          <img
            src="https://images.unsplash.com/photo-1736606355698-5efdb410fe93?q=80&w=1200&auto=format&fit=crop"
            alt="Camp destination"
            width={500}
            height={375}
            className="aspect-[4/3] w-full object-cover"
          />
        </Lens>
      </div>
      <div className="space-y-1.5 px-6">
        <h3 className="text-2xl leading-none font-semibold">Your next camp</h3>
        <p className="text-sm text-muted-foreground">See our latest and best camp destinations all across the five continents of the globe.</p>
      </div>
      <div className="flex items-center gap-4 px-6">
        <button type="button" className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          Let&apos;s go
        </button>
        <button type="button" className="inline-flex h-9 items-center justify-center rounded-md bg-secondary px-4 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80">
          Another time
        </button>
      </div>
    </div>
  )
}
