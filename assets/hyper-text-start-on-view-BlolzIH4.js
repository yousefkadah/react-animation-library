var e=`import { HyperText } from "@/components/ui/hyper-text"

const digits = "0123456789".split("")

const stats = [
  { label: "Uptime", value: "99.99%" },
  { label: "Regions", value: "32" },
  { label: "Latency", value: "14 ms" },
]

export default function HyperTextStartOnView() {
  return (
    <div className="grid w-full max-w-md grid-cols-3 gap-3">
      {stats.map((stat, index) => (
        <div key={stat.label} className="rounded-xl border bg-card p-4 text-card-foreground shadow-sm">
          <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
          <HyperText startOnView delay={index * 200} characterSet={digits} className="py-1 text-xl sm:text-2xl">
            {stat.value}
          </HyperText>
        </div>
      ))}
    </div>
  )
}
`;export{e as default};