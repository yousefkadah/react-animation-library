import { HexagonPattern } from "@/components/ui/hexagon-pattern"

const hexagons: Array<[number, number]> = [
  [1, 1],
  [4, 4],
  [2, 2],
  [3, 4],
  [5, 4],
  [8, 2],
  [6, 3],
  [8, 5],
  [10, 10],
]

export default function HexagonPatternDemo() {
  return (
    <div className="relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
      <HexagonPattern
        hexagons={hexagons}
        className="inset-0 skew-y-6 [mask-image:radial-gradient(420px_circle_at_center,white,transparent)]"
      />
    </div>
  )
}
