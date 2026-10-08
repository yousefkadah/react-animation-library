import { ScrollVelocityContainer, ScrollVelocityRow } from "@/components/ui/scroll-based-velocity"

const rowA = [10, 11, 12, 13, 14].map((id) => `https://picsum.photos/seed/velocity-${id}/480/320`)
const rowB = [20, 21, 22, 23, 24].map((id) => `https://picsum.photos/seed/velocity-${id}/480/320`)

function Images({ sources }: { sources: string[] }) {
  return sources.map((src) => (
    <img
      key={src}
      src={src}
      alt=""
      width={240}
      height={160}
      loading="lazy"
      decoding="async"
      className="mx-2 inline-block h-28 w-44 rounded-lg object-cover shadow-sm sm:h-36 sm:w-56"
    />
  ))
}

export default function ScrollBasedVelocityImages() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-4">
      <ScrollVelocityContainer className="w-full">
        <ScrollVelocityRow baseVelocity={6} direction={1} className="py-2">
          <Images sources={rowA} />
        </ScrollVelocityRow>
        <ScrollVelocityRow baseVelocity={6} direction={-1} className="py-2">
          <Images sources={rowB} />
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-background" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-background" />
    </div>
  )
}
