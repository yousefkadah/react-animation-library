import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

export interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode
  className?: string
}

export interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  /** Card title. */
  name: string
  className?: string
  /** Decorative content behind the text. Position it `absolute`. */
  background?: ReactNode
  /** Icon component, e.g. one from `lucide-react`. */
  Icon?: ElementType
  description: string
  /** Where the call-to-action link points. */
  href: string
  /** Call-to-action label. */
  cta: string
}

export function BentoGrid({ children, className, ...props }: BentoGridProps) {
  return (
    <div className={cn("grid w-full auto-rows-[22rem] grid-cols-3 gap-4", className)} {...props}>
      {children}
    </div>
  )
}

function CtaLink({ href, cta }: { href: string; cta: string }) {
  return (
    <a
      href={href}
      className="pointer-events-auto inline-flex items-center text-sm font-medium text-primary underline-offset-4 hover:underline"
    >
      {cta}
      <ArrowRight className="ms-2 size-4 rtl:rotate-180" aria-hidden="true" />
    </a>
  )
}

export function BentoCard({ name, className, background, Icon, description, href, cta, ...props }: BentoCardProps) {
  return (
    <div
      className={cn(
        "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
        // light styles
        "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-background dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]",
        className
      )}
      {...props}
    >
      <div>{background}</div>
      <div className="p-4">
        <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 transition-all duration-300 lg:group-focus-within:-translate-y-10 lg:group-hover:-translate-y-10">
          {Icon && (
            <Icon
              className="size-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75 dark:text-neutral-300"
              aria-hidden="true"
            />
          )}
          <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">{name}</h3>
          <p className="max-w-lg text-neutral-400">{description}</p>
        </div>

        <div className="pointer-events-none flex w-full translate-y-0 transform-gpu flex-row items-center transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:hidden">
          <CtaLink href={href} cta={cta} />
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 hidden w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 lg:flex">
        <CtaLink href={href} cta={cta} />
      </div>

      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/3 dark:group-hover:bg-neutral-800/10" />
    </div>
  )
}
