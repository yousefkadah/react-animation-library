var e=`import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern"

export default function InteractiveGridPatternSmall() {
  return (
    <div className="relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
      <InteractiveGridPattern
        width={20}
        height={20}
        squares={[80, 80]}
        squaresClassName="hover:fill-blue-500"
        className="[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]"
      />
    </div>
  )
}
`;export{e as default};