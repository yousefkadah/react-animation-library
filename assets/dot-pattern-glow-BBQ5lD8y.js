var e=`import { DotPattern } from "@/components/ui/dot-pattern"

export default function DotPatternGlow() {
  return (
    <div className="relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
      <DotPattern
        glow
        width={20}
        height={20}
        cx={2}
        cy={2}
        cr={2}
        className="text-neutral-500 [mask-image:radial-gradient(300px_circle_at_center,white,transparent)] dark:text-neutral-300"
      />
    </div>
  )
}
`;export{e as default};