var e=`import { BorderBeam } from "@/components/ui/border-beam"

export default function BorderBeamTwoBeams() {
  return (
    <div className="relative w-[350px] overflow-hidden rounded-xl border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="size-16 rounded-lg bg-linear-to-br from-orange-400 to-fuchsia-600" />
        <div>
          <h3 className="font-semibold">Midnight Drive</h3>
          <p className="text-sm text-muted-foreground">Synthwave Collective</p>
        </div>
      </div>
      <div className="mt-6 h-1.5 w-full rounded-full bg-muted">
        <div className="h-full w-1/3 rounded-full bg-primary" />
      </div>
      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
        <span>1:21</span>
        <span>3:45</span>
      </div>
      <BorderBeam duration={6} size={400} className="from-transparent via-red-500 to-transparent" />
      <BorderBeam duration={6} delay={3} size={400} borderWidth={2} className="from-transparent via-blue-500 to-transparent" />
    </div>
  )
}
`;export{e as default};