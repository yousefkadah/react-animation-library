import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"

export default function AnimatedThemeTogglerFromCenter() {
  return (
    <div className="flex flex-col items-center gap-3 p-6">
      <AnimatedThemeToggler
        fromCenter
        variant="star"
        duration={700}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 [&_svg]:size-4"
      />
      <p className="text-sm text-muted-foreground">A slower star reveal that grows from the centre of the screen.</p>
    </div>
  )
}
