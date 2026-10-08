var e=`import { NoiseTexture } from "@/components/ui/noise-texture"

export default function NoiseTextureCard() {
  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-xl border bg-card/80 text-card-foreground shadow-sm">
      <NoiseTexture noiseOpacity={0.45} />
      <div className="relative z-10 space-y-1.5 p-6 pb-4">
        <h3 className="text-xl font-semibold">The weekly digest</h3>
        <p className="text-sm text-muted-foreground">
          One email on Sundays: new components, tips and changelog highlights. No spam, unsubscribe anytime.
        </p>
      </div>
      <form className="relative z-10 space-y-4 px-6 pb-6" onSubmit={(event) => event.preventDefault()}>
        <label className="grid gap-2 text-sm font-medium">
          Email
          <input
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            className="h-9 rounded-md border bg-background/60 px-3 text-sm font-normal outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          />
        </label>
        <button
          type="submit"
          className="h-9 w-full rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}
`;export{e as default};