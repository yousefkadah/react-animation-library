import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern"

export default function AnimatedGridPatternLinearGradient() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background">
      <AnimatedGridPattern
        width={30}
        height={30}
        numSquares={60}
        maxOpacity={0.15}
        duration={2}
        repeatDelay={0.5}
        className="text-sky-500 [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] dark:text-sky-400"
      />
    </div>
  )
}
