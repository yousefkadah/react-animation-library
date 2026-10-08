var e=`import { cloneElement, isValidElement, type ComponentProps, type ReactElement } from "react"

import { cn } from "@/lib/utils"

export type RainbowButtonVariant = "default" | "outline"
export type RainbowButtonSize = "default" | "sm" | "lg" | "icon"

/** The five rainbow colours. Override any of them with a class such as \`[--color-1:hotpink]\`. */
const colors =
  "[--color-1:oklch(66.2%_0.225_25.9)] [--color-2:oklch(60.4%_0.26_302)] [--color-3:oklch(69.6%_0.165_251)] [--color-4:oklch(80.2%_0.134_225)] [--color-5:oklch(90.7%_0.231_133)]"

const base = [
  colors,
  "relative cursor-pointer group transition-all animate-rainbow motion-reduce:animate-none",
  "inline-flex items-center justify-center gap-2 shrink-0",
  "rounded-sm outline-none focus-visible:ring-[3px] aria-invalid:border-destructive",
  "text-sm font-medium whitespace-nowrap",
  "disabled:pointer-events-none disabled:opacity-50",
  "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
].join(" ")

const glow =
  "before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow motion-reduce:before:animate-none before:bg-[linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))] before:bg-[length:200%] before:[filter:blur(0.75rem)]"

const variants: Record<RainbowButtonVariant, string> = {
  default: \`border-0 bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))] bg-[length:200%] text-primary-foreground [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.125rem)_solid_transparent] \${glow} dark:bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))]\`,
  outline: \`border border-input border-b-transparent bg-[linear-gradient(#ffffff,#ffffff),linear-gradient(#ffffff_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))] bg-[length:200%] text-accent-foreground [background-clip:padding-box,border-box,border-box] [background-origin:border-box] \${glow} dark:bg-[linear-gradient(#0a0a0a,#0a0a0a),linear-gradient(#0a0a0a_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))]\`,
}

const sizes: Record<RainbowButtonSize, string> = {
  default: "h-9 px-4 py-2",
  sm: "h-8 rounded-xl px-3 text-xs",
  lg: "h-11 rounded-xl px-8",
  icon: "size-9",
}

/** The rainbow button's classes, for styling another element (e.g. a link) the same way. */
export function rainbowButtonVariants({
  variant = "default",
  size = "default",
  className,
}: { variant?: RainbowButtonVariant | null; size?: RainbowButtonSize | null; className?: string } = {}): string {
  return cn(base, variants[variant ?? "default"], sizes[size ?? "default"], className)
}

export interface RainbowButtonProps extends ComponentProps<"button"> {
  /** \`default\` is solid, \`outline\` is light with a rainbow underline. */
  variant?: RainbowButtonVariant
  size?: RainbowButtonSize
  /** Render the single child element (e.g. a link) with the button's styles instead of a \`<button>\`. */
  asChild?: boolean
}

export function RainbowButton({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  children,
  ...props
}: RainbowButtonProps) {
  const classes = rainbowButtonVariants({ variant, size, className })

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{ className?: string }>
    return cloneElement(child, {
      ...props,
      "data-slot": "button",
      className: cn(classes, child.props.className),
    } as Partial<{ className?: string }>)
  }

  return (
    <button data-slot="button" className={classes} {...props}>
      {children}
    </button>
  )
}
`;export{e as default};