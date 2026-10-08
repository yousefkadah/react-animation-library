import { ProgressiveBlur } from "@/components/ui/progressive-blur"

export default function ProgressiveBlurDemo() {
  return (
    <div className="relative h-[320px] w-full max-w-md overflow-hidden rounded-xl border">
      <div className="h-full overflow-y-auto">
        <div className="flex flex-col gap-2 p-4">
          {Array.from({ length: 20 }, (_, index) => (
            <div
              key={index}
              className="flex h-20 w-full shrink-0 items-center justify-center rounded-xl border bg-card text-card-foreground"
            >
              {index}
            </div>
          ))}
        </div>
      </div>
      <ProgressiveBlur position="bottom" height="40%" />
    </div>
  )
}
