var e=`import { BorderBeam } from "@/components/ui/border-beam"

export default function BorderBeamDemo() {
  return (
    <div className="relative w-[350px] overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm">
      <div className="space-y-1.5 p-6">
        <h3 className="text-lg font-semibold">Login</h3>
        <p className="text-sm text-muted-foreground">Enter your credentials to access your account.</p>
      </div>
      <form className="grid gap-4 px-6" onSubmit={(event) => event.preventDefault()}>
        <label className="grid gap-2 text-sm font-medium">
          Email
          <input type="email" placeholder="you@example.com" className="h-9 rounded-md border bg-transparent px-3 text-sm font-normal outline-none focus-visible:ring-2 focus-visible:ring-ring/50" />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Password
          <input type="password" placeholder="Enter your password" className="h-9 rounded-md border bg-transparent px-3 text-sm font-normal outline-none focus-visible:ring-2 focus-visible:ring-ring/50" />
        </label>
      </form>
      <div className="flex justify-between p-6">
        <button className="h-9 rounded-md border px-4 text-sm font-medium hover:bg-accent">Register</button>
        <button className="h-9 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">Login</button>
      </div>
      <BorderBeam duration={8} size={100} />
    </div>
  )
}
`;export{e as default};