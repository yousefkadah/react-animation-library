var e=`import { AnimatedThemeToggler, type ThemeTransitionVariant } from "@/components/ui/animated-theme-toggler"

const variants: ThemeTransitionVariant[] = ["circle", "square", "diamond", "rectangle", "hexagon", "triangle", "star"]

export default function AnimatedThemeTogglerVariants() {
  return (
    <div className="grid grid-cols-4 gap-3 sm:grid-cols-7">
      {variants.map((variant) => (
        <div key={variant} className="flex flex-col items-center gap-2">
          <AnimatedThemeToggler
            variant={variant}
            className="inline-flex size-12 items-center justify-center rounded-full border bg-background shadow-xs transition-colors hover:bg-accent [&_svg]:size-5"
          />
          <span className="text-xs text-muted-foreground capitalize">{variant}</span>
        </div>
      ))}
    </div>
  )
}
`;export{e as default};