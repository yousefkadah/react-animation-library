import { Bell, Calendar, FileText, Globe, TextCursorInput } from "lucide-react"

import { cn } from "@/lib/utils"
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"

const features = [
  {
    Icon: FileText,
    name: "Save your files",
    description: "We automatically save your files as you type.",
    glow: "from-sky-400/40 to-indigo-500/40",
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: TextCursorInput,
    name: "Full text search",
    description: "Search through all your files in one place.",
    glow: "from-emerald-400/40 to-teal-500/40",
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: Globe,
    name: "Multilingual",
    description: "Supports 100+ languages and counting.",
    glow: "from-amber-400/40 to-orange-500/40",
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: Calendar,
    name: "Calendar",
    description: "Use the calendar to filter your files by date.",
    glow: "from-fuchsia-400/40 to-pink-500/40",
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: Bell,
    name: "Notifications",
    description: "Get notified when someone shares a file or mentions you in a comment.",
    glow: "from-violet-400/40 to-purple-500/40",
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
]

export default function BentoGridVertical() {
  return (
    <BentoGrid className="lg:grid-rows-3">
      {features.map(({ glow, ...feature }) => (
        <BentoCard
          key={feature.name}
          {...feature}
          href="#"
          cta="Learn more"
          background={
            <div
              className={cn(
                "absolute -end-20 -top-20 size-64 rounded-full bg-radial blur-3xl transition-transform duration-500 group-hover:scale-125",
                glow
              )}
              aria-hidden="true"
            />
          }
        />
      ))}
    </BentoGrid>
  )
}
