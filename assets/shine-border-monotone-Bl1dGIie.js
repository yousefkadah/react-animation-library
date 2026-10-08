var e=`import { ShineBorder } from "@/components/ui/shine-border"

export default function ShineBorderMonotone() {
  return (
    <div className="relative w-full max-w-[350px] overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm">
      {/* var(--foreground) is black in light mode and white in dark mode */}
      <ShineBorder shineColor="var(--foreground)" />
      <LoginForm />
    </div>
  )
}

function LoginForm() {
  return (
    <>
      <div className="space-y-1.5 p-6">
        <h3 className="text-lg leading-none font-semibold">Login</h3>
        <p className="text-sm text-muted-foreground">Enter your credentials to access your account</p>
      </div>
      <form className="grid gap-4 px-6" onSubmit={(event) => event.preventDefault()}>
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
      <div className="p-6">
        <button className="h-9 w-full rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Sign In
        </button>
      </div>
    </>
  )
}
`;export{e as default};