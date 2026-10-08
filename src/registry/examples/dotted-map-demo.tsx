import { DottedMap, type DottedMapMarker } from "@/components/ui/dotted-map"

type CityMarker = DottedMapMarker & { label: string }

const markers: CityMarker[] = [
  { lat: 37.5665, lng: 126.978, size: 2.8, label: "Seoul" },
  { lat: 40.7128, lng: -74.006, size: 2.8, label: "NYC" },
]

export default function DottedMapDemo() {
  return (
    <div className="relative h-[320px] w-full overflow-hidden rounded-lg border">
      <div className="absolute inset-0 bg-radial from-transparent to-background to-200%" />
      <DottedMap<CityMarker>
        markers={markers}
        renderMarkerOverlay={({ marker, x, y, r }) => (
          <g className="pointer-events-none">
            <circle cx={x} cy={y} r={r * 0.45} fill="white" />
            <rect
              x={x + r * 1.6}
              y={y - r * 0.75}
              width={marker.label.length * r * 0.56 + r * 1.4}
              height={r * 1.5}
              rx={r * 0.75}
              fill="rgba(0,0,0,0.55)"
            />
            <text x={x + r * 2.3} y={y + r * 0.32} fontSize={r * 0.9} fill="white">
              {marker.label}
            </text>
          </g>
        )}
      />
    </div>
  )
}
