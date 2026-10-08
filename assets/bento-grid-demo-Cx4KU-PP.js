var e=`"use client"

import { Bell, Calendar, Cloud, Database, FileText, GitBranch, Mail, MessageSquare, Share2, Webhook } from "lucide-react"

import { cn } from "@/lib/utils"
import { AnimatedList } from "@/components/ui/animated-list"
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"
import { Marquee } from "@/components/ui/marquee"
import { OrbitingCircles } from "@/components/ui/orbiting-circles"

const files = [
  { name: "bitcoin.pdf", body: "Bitcoin is a cryptocurrency invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto." },
  { name: "finances.xlsx", body: "A spreadsheet or worksheet is a file made of rows and columns that help sort data, arrange data easily, and calculate numerical data." },
  { name: "logo.svg", body: "Scalable Vector Graphics is an Extensible Markup Language-based vector image format for two-dimensional graphics." },
  { name: "keys.gpg", body: "GPG keys are used to encrypt and decrypt email, files, directories, and whole disk partitions and to authenticate messages." },
  { name: "seed.txt", body: "A seed phrase is a list of words which store all the information needed to recover Bitcoin funds on-chain." },
]

const notifications = Array.from({ length: 10 }, () => [
  { name: "Payment received", time: "15m ago", icon: "💸", color: "#00C9A7" },
  { name: "User signed up", time: "10m ago", icon: "👤", color: "#FFB800" },
  { name: "New message", time: "5m ago", icon: "💬", color: "#FF3D71" },
  { name: "New event", time: "2m ago", icon: "🗞️", color: "#1E86FF" },
]).flat()

const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
// May 2022 starts on a Sunday and has 31 days.
const days = Array.from({ length: 35 }, (_, index) => (index < 31 ? index + 1 : null))

const features = [
  {
    Icon: FileText,
    name: "Save your files",
    description: "We automatically save your files as you type.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Marquee
        pauseOnHover
        duration="20s"
        className="absolute top-10 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]"
      >
        {files.map((file) => (
          <figure
            key={file.name}
            className={cn(
              "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none"
            )}
          >
            <figcaption className="text-sm font-medium dark:text-white">{file.name}</figcaption>
            <blockquote className="mt-2 text-xs">{file.body}</blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: Bell,
    name: "Notifications",
    description: "Get notified when something happens.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute end-2 top-4 h-[300px] w-full origin-top scale-75 overflow-hidden [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-90">
        <AnimatedList>
          {notifications.map((item, index) => (
            <figure
              key={index}
              className="relative mx-auto w-full max-w-[400px] overflow-hidden rounded-2xl bg-white p-4 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:bg-transparent dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-2xl" style={{ backgroundColor: item.color }}>
                  <span className="text-lg" aria-hidden="true">
                    {item.icon}
                  </span>
                </div>
                <div className="flex items-center text-lg font-medium whitespace-pre dark:text-white">
                  <span className="text-sm sm:text-lg">{item.name}</span>
                  <span className="mx-1">·</span>
                  <span className="text-xs text-gray-500">{item.time}</span>
                </div>
              </div>
            </figure>
          ))}
        </AnimatedList>
      </div>
    ),
  },
  {
    Icon: Share2,
    name: "Integrations",
    description: "Supports 100+ integrations and counting.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-x-0 -top-10 flex h-[300px] items-center justify-center [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-105">
        <OrbitingCircles iconSize={40} radius={110} className="border bg-background text-foreground shadow-sm">
          <GitBranch className="size-5" />
          <Webhook className="size-5" />
          <Mail className="size-5" />
          <Cloud className="size-5" />
        </OrbitingCircles>
        <OrbitingCircles iconSize={32} radius={55} reverse speed={1.5} className="border bg-background text-muted-foreground">
          <Database className="size-4" />
          <MessageSquare className="size-4" />
        </OrbitingCircles>
      </div>
    ),
  },
  {
    Icon: Calendar,
    name: "Calendar",
    description: "Use the calendar to filter your files by date.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div
        className="absolute end-0 top-10 origin-top scale-75 rounded-md border bg-background p-3 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-90"
        aria-hidden="true"
      >
        <p className="pb-3 text-center text-sm font-medium">May 2022</p>
        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {weekdays.map((weekday) => (
            <span key={weekday} className="size-8 leading-8 text-muted-foreground">
              {weekday}
            </span>
          ))}
          {days.map((day, index) => (
            <span
              key={index}
              className={cn(
                "size-8 rounded-md leading-8",
                day === 11 ? "bg-primary text-primary-foreground" : day ? "text-foreground" : ""
              )}
            >
              {day ?? ""}
            </span>
          ))}
        </div>
      </div>
    ),
  },
]

export default function BentoGridDemo() {
  return (
    <BentoGrid>
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  )
}
`;export{e as default};