import { ScrollProgress } from "@/components/ui/scroll-progress"

export default function ScrollProgressDemo() {
  return (
    <div className="z-10 rounded-lg p-4">
      <ScrollProgress className="top-14" />
      <h2 className="pb-4 text-center font-bold">Note: The scroll progress is shown below the navbar of the page.</h2>
      <p className="text-center text-sm text-muted-foreground">Scroll this page to see it fill up.</p>
    </div>
  )
}
