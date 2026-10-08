import { CircleCheck, Info, TriangleAlert } from "lucide-react"

import { cn } from "@/lib/utils"
import { GlareHover } from "@/components/ui/glare-hover"

const alert = "grid w-full grid-cols-[1rem_1fr] items-start gap-x-3 gap-y-0.5 rounded-lg border bg-background px-4 py-3 text-sm"

export default function GlareHoverAlerts() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <GlareHover className="w-full rounded-lg" background="transparent" color="#60a5fa" opacity={0.25} duration={550}>
        <div role="alert" className={alert}>
          <Info className="mt-0.5 size-4" aria-hidden="true" />
          <p className="font-medium">Action required</p>
          <p className="col-start-2 text-muted-foreground">Your plan expires in 3 days. Renew to keep access.</p>
        </div>
      </GlareHover>

      <GlareHover className="w-full rounded-lg" background="transparent" color="#ff6070" opacity={0.25} duration={550}>
        <div role="alert" className={cn(alert, "text-red-600 dark:text-red-400")}>
          <TriangleAlert className="mt-0.5 size-4" aria-hidden="true" />
          <p className="font-medium">Payment declined</p>
          <p className="col-start-2 opacity-90">Check your card details and try again.</p>
        </div>
      </GlareHover>

      <GlareHover className="w-full rounded-lg" background="transparent" color="#60ff70" opacity={0.25} duration={550}>
        <div role="alert" className={cn(alert, "text-emerald-600 dark:text-emerald-400")}>
          <CircleCheck className="mt-0.5 size-4" aria-hidden="true" />
          <p className="font-medium">Subscription confirmed</p>
          <p className="col-start-2 opacity-90">You have full Pro access until April 5, 2027.</p>
        </div>
      </GlareHover>
    </div>
  )
}
