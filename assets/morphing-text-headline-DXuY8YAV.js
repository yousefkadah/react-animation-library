var e=`import { MorphingText } from "@/components/ui/morphing-text"

const texts = ["alive", "fluid", "playful", "polished"]

export default function MorphingTextHeadline() {
  return (
    <div className="flex w-full flex-col items-center gap-2 text-center">
      <p className="text-lg text-muted-foreground">Components that feel</p>
      <MorphingText texts={texts} className="h-14 text-5xl text-violet-600 md:h-20 lg:text-7xl dark:text-violet-400" />
    </div>
  )
}
`;export{e as default};