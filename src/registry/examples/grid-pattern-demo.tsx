import { GridPattern } from "@/components/ui/grid-pattern"

const squares: Array<[number, number]> = [
  [4, 4],
  [5, 1],
  [8, 2],
  [5, 3],
  [5, 5],
  [10, 10],
  [12, 15],
  [15, 10],
  [10, 15],
  [6, 7],
  [11, 6],
  [13, 9],
]

export default function GridPatternDemo() {
  return (
    <div className="relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
      <GridPattern
        squares={squares}
        className="inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 [mask-image:radial-gradient(400px_circle_at_center,white,transparent)]"
      />
    </div>
  )
}
