var e=`import { DotPattern } from "@/components/ui/dot-pattern"

export default function DotPatternLinearGradient() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-20">
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className="[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
      />
    </div>
  )
}
`;export{e as default};