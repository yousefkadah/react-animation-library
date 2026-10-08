import { ScrollVelocityRow } from "@/components/ui/scroll-based-velocity"

const tags = ["React", "Next.js", "Tailwind CSS", "Motion", "TypeScript", "Vite", "shadcn/ui"]

export default function ScrollBasedVelocityTags() {
  return (
    <div className="relative flex w-full flex-col gap-3 overflow-hidden py-4">
      {/* A standalone row tracks the page's scroll velocity on its own. */}
      <ScrollVelocityRow baseVelocity={4}>
        {tags.map((tag) => (
          <span key={tag} className="mx-1.5 rounded-full border bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
            {tag}
          </span>
        ))}
      </ScrollVelocityRow>
      {/* Constant speed: ignores scrolling entirely. */}
      <ScrollVelocityRow baseVelocity={4} direction={-1} scrollReactivity={false}>
        {[...tags].reverse().map((tag) => (
          <span key={tag} className="mx-1.5 rounded-full border border-dashed px-4 py-1.5 text-sm font-medium text-muted-foreground">
            {tag}
          </span>
        ))}
      </ScrollVelocityRow>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-linear-to-r from-background" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-linear-to-l from-background" />
    </div>
  )
}
