import { StripedPattern } from "@/components/ui/striped-pattern"

export default function StripedPatternDemo() {
  return (
    <div className="relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
      <StripedPattern className="[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]" />
    </div>
  )
}
