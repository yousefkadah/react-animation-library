import { MagicCard } from "@/components/ui/magic-card"

export default function MagicCardDemo() {
  return (
    <div className="w-full max-w-sm rounded-xl">
      {/* The spotlight colour is a CSS variable, so it can differ between light and dark mode. */}
      <MagicCard gradientColor="var(--spotlight)" className="[--spotlight:#D9D9D955] dark:[--spotlight:#262626]">
        <div className="space-y-1.5 border-b p-4">
          <h3 className="leading-none font-semibold">Login</h3>
          <p className="text-sm text-muted-foreground">Enter your credentials to access your account</p>
        </div>
        <form className="grid gap-4 p-4" onSubmit={(event) => event.preventDefault()}>
          <label className="grid gap-2 text-sm font-medium">
            Email
            <input
              type="email"
              placeholder="name@example.com"
              className="h-9 rounded-md border bg-transparent px-3 text-sm font-normal outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Password
            <input
              type="password"
              className="h-9 rounded-md border bg-transparent px-3 text-sm font-normal outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            />
          </label>
        </form>
        <div className="border-t p-4">
          <button className="h-9 w-full rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Sign In
          </button>
        </div>
      </MagicCard>
    </div>
  )
}
