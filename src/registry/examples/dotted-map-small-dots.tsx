import { DottedMap } from "@/components/ui/dotted-map"

export default function DottedMapSmallDots() {
  return (
    <div className="relative h-[320px] w-full overflow-hidden rounded-lg border">
      <DottedMap dotRadius={0.1} />
    </div>
  )
}
