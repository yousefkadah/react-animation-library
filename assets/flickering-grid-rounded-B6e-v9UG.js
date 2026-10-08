var e=`import { FlickeringGrid } from "@/components/ui/flickering-grid"

export default function FlickeringGridRounded() {
  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-lg border bg-background">
      <FlickeringGrid
        className="absolute inset-0 z-0 size-full [mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
        squareSize={4}
        gridGap={6}
        color="#60A5FA"
        maxOpacity={0.5}
        flickerChance={0.1}
      />
    </div>
  )
}
`;export{e as default};