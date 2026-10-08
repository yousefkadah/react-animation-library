import { Text3DFlip } from "@/components/ui/text-3d-flip"

export default function Text3DFlipColors() {
  return (
    <div className="flex flex-col items-center gap-3">
      <Text3DFlip
        as="h2"
        className="text-4xl font-bold tracking-tight sm:text-6xl"
        textClassName="bg-background text-foreground"
        flipTextClassName="bg-background text-violet-600 dark:text-violet-400"
        rotateDirection="right"
        staggerFrom="last"
      >
        Hover to flip
      </Text3DFlip>
      <p className="text-sm text-muted-foreground">Rotates right, staggered from the last letter.</p>
    </div>
  )
}
