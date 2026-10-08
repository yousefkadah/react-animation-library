var e=`import { SparklesText } from "@/components/ui/sparkles-text"

const colors = { first: "#FBBF24", second: "#F97316" }

export default function SparklesTextColors() {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">Limited release</p>
      <SparklesText as="h2" sparklesCount={16} colors={colors} className="text-5xl sm:text-6xl">
        Golden Hour
      </SparklesText>
    </div>
  )
}
`;export{e as default};