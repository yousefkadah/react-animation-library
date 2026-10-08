var e=`import type { COBEOptions } from "cobe"

import { Globe } from "@/components/ui/globe"

const cities = {
  sanFrancisco: [37.7595, -122.4367],
  newYork: [40.7128, -74.006],
  london: [51.5072, -0.1276],
  telAviv: [32.0853, 34.7818],
  mumbai: [19.076, 72.8777],
  tokyo: [35.6762, 139.6503],
  saoPaulo: [-23.5505, -46.6333],
} satisfies Record<string, [number, number]>

const config: Partial<COBEOptions> = {
  dark: 1,
  diffuse: 1.2,
  mapBrightness: 6,
  baseColor: [0.3, 0.3, 0.3],
  glowColor: [0.25, 0.25, 0.3],
  markerColor: [0.1, 0.8, 1],
  arcColor: [0.1, 0.8, 1],
  arcWidth: 0.6,
  markers: Object.values(cities).map((location) => ({ location, size: 0.05 })),
  arcs: [
    { from: cities.sanFrancisco, to: cities.tokyo },
    { from: cities.newYork, to: cities.london },
    { from: cities.london, to: cities.telAviv },
    { from: cities.telAviv, to: cities.mumbai },
    { from: cities.newYork, to: cities.saoPaulo },
  ],
}

export default function GlobeArcs() {
  return (
    <div className="relative flex h-[380px] w-full max-w-lg items-start justify-center overflow-hidden rounded-lg border bg-neutral-950 pt-8">
      <span className="pointer-events-none z-10 bg-linear-to-b from-white to-neutral-500 bg-clip-text text-center text-6xl leading-none font-semibold tracking-tight text-transparent">
        Connected
      </span>
      <Globe className="top-24" config={config} />
    </div>
  )
}
`;export{e as default};