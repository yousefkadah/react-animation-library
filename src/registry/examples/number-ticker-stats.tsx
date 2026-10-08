import { NumberTicker } from "@/components/ui/number-ticker"

const stats = [
  { label: "Downloads", value: 1284503, prefix: "", suffix: "" },
  { label: "Uptime", value: 99.98, decimalPlaces: 2, prefix: "", suffix: "%" },
  { label: "Revenue", value: 48250.5, decimalPlaces: 2, prefix: "", suffix: " €", locale: "de-DE" },
]

export default function NumberTickerStats() {
  return (
    <div className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map((stat, index) => (
        <div key={stat.label} className="rounded-xl border bg-card p-5 text-card-foreground shadow-sm">
          <p className="text-sm text-muted-foreground">{stat.label}</p>
          <p className="mt-1 text-3xl font-semibold tracking-tight">
            {stat.prefix}
            <NumberTicker
              value={stat.value}
              decimalPlaces={stat.decimalPlaces ?? 0}
              locale={stat.locale}
              delay={index * 0.15}
              className="tracking-tight"
            />
            {stat.suffix}
          </p>
        </div>
      ))}
      <div className="rounded-xl border border-dashed p-5 sm:col-span-3">
        <p className="text-sm text-muted-foreground">Seats left — counts down</p>
        <NumberTicker value={250} startValue={12} direction="down" className="mt-1 text-3xl font-semibold tracking-tight" />
      </div>
    </div>
  )
}
