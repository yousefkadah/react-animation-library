import { ArrowUpRight } from "lucide-react"

import { SpinningText } from "@/components/ui/spinning-text"

export default function SpinningTextBadge() {
  return (
    <a
      href="#"
      onClick={(event) => event.preventDefault()}
      className="group relative flex size-36 items-center justify-center rounded-full border bg-card text-card-foreground shadow-sm transition-colors hover:bg-accent"
    >
      <SpinningText duration={14} radius={8} className="absolute inset-0 text-xs font-semibold tracking-[0.2em] uppercase">
        get in touch • get in touch •
      </SpinningText>
      <span className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:rotate-45">
        <ArrowUpRight className="size-5" />
      </span>
    </a>
  )
}
