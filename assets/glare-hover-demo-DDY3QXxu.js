var e=`import { Check } from "lucide-react"

import { GlareHover } from "@/components/ui/glare-hover"

const features = ["Unlimited projects", "Team collaboration", "Advanced analytics"]

export default function GlareHoverDemo() {
  return (
    <GlareHover className="rounded-xl" background="transparent" color="#a78bfa" opacity={0.4} duration={600}>
      <div className="flex w-[340px] flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm">
        <div className="space-y-1.5 px-6">
          <div className="flex items-center justify-between">
            <h3 className="leading-none font-semibold">Pro</h3>
            <span className="rounded-md bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">Popular</span>
          </div>
          <p className="text-sm text-muted-foreground">For teams that need more.</p>
          <div className="flex items-baseline gap-1 pt-2">
            <span className="text-4xl font-semibold tracking-tight">$49</span>
            <span className="text-sm text-muted-foreground">/mo</span>
          </div>
        </div>
        <ul className="flex flex-col gap-2.5 px-6">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm">
              <Check className="size-4" aria-hidden="true" />
              {feature}
            </li>
          ))}
          <li className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="mx-1.5 size-1 rounded-full bg-current opacity-40" aria-hidden="true" />
            SSO (coming soon)
          </li>
        </ul>
        <div className="px-6">
          <button className="h-9 w-full rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Get started
          </button>
        </div>
      </div>
    </GlareHover>
  )
}
`;export{e as default};