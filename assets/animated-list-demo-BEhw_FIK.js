var e=`"use client"

import { AnimatedList } from "@/components/ui/animated-list"
import { cn } from "@/lib/utils"

interface Item {
  name: string
  description: string
  icon: string
  color: string
  time: string
}

const base: Item[] = [
  { name: "Payment received", description: "Magic UI", time: "15m ago", icon: "💸", color: "#00C9A7" },
  { name: "User signed up", description: "Magic UI", time: "10m ago", icon: "👤", color: "#FFB800" },
  { name: "New message", description: "Magic UI", time: "5m ago", icon: "💬", color: "#FF3D71" },
  { name: "New event", description: "Magic UI", time: "2m ago", icon: "🗞️", color: "#1E86FF" },
]

const notifications = Array.from({ length: 10 }, () => base).flat()

function Notification({ name, description, icon, color, time }: Item) {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        "transform-gpu dark:bg-transparent dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)]"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-2xl" style={{ backgroundColor: color }}>
          <span className="text-lg" aria-hidden="true">
            {icon}
          </span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <div className="flex flex-row items-center text-lg font-medium whitespace-pre dark:text-white">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </div>
          <p className="text-sm font-normal dark:text-white/60">{description}</p>
        </div>
      </div>
    </figure>
  )
}

export default function AnimatedListDemo() {
  return (
    <div className="relative flex h-[400px] w-full flex-col overflow-hidden p-2">
      <AnimatedList>
        {notifications.map((item, index) => (
          <Notification {...item} key={index} />
        ))}
      </AnimatedList>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-background" />
    </div>
  )
}
`;export{e as default};