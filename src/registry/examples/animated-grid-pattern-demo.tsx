import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern"

export default function AnimatedGridPatternDemo() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-20">
      <p className="z-10 text-center text-4xl font-medium tracking-tighter whitespace-pre-wrap sm:text-5xl">Animated Grid Pattern</p>
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className="inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />
    </div>
  )
}
