var e=`import { AnimatedShinyText } from "@/components/ui/animated-shiny-text"

export default function AnimatedShinyTextHeading() {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <AnimatedShinyText shimmerWidth={240} className="text-4xl font-bold tracking-tight sm:text-5xl">
        Shimmering headline
      </AnimatedShinyText>
      <p className="max-w-sm text-balance text-sm text-muted-foreground">
        A wider <code className="font-mono text-foreground">shimmerWidth</code> gives big type a broader glare.
      </p>
    </div>
  )
}
`;export{e as default};