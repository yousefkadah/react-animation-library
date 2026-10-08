import { DottedMap, type DottedMapMarker } from "@/components/ui/dotted-map"

const markers: DottedMapMarker[] = [
  { lat: 37.5665, lng: 126.978, size: 0.3 },
  { lat: 40.7128, lng: -74.006, size: 0.3, pulse: false },
  { lat: 51.5072, lng: -0.1276, size: 0.3 },
  { lat: -33.8688, lng: 151.2093, size: 0.3 },
]

export default function DottedMapPulse() {
  return (
    <div className="relative h-[320px] w-full overflow-hidden rounded-lg border">
      <div className="absolute inset-0 bg-radial from-transparent to-background to-200%" />
      <DottedMap markers={markers} pulse />
    </div>
  )
}
