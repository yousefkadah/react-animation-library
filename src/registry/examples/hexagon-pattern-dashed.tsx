import { HexagonPattern } from "@/components/ui/hexagon-pattern"

export default function HexagonPatternDashed() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-20">
      <HexagonPattern radius={40} x={-1} y={-1} strokeDasharray="4 2" />
    </div>
  )
}
