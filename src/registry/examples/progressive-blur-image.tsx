import { ProgressiveBlur } from "@/components/ui/progressive-blur"

export default function ProgressiveBlurImage() {
  return (
    <figure className="relative h-[320px] w-full max-w-sm overflow-hidden rounded-2xl border shadow-sm">
      <img
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop"
        alt="Mountain peaks above a sea of clouds"
        className="size-full object-cover"
      />
      <ProgressiveBlur position="bottom" height="50%" blurLevels={[0.5, 1, 2, 4, 8, 16, 24, 32]} />
      <figcaption className="absolute inset-x-0 bottom-0 z-20 p-5 text-white">
        <p className="text-lg font-semibold">Above the clouds</p>
        <p className="text-sm text-white/80">Sunrise over the peaks</p>
      </figcaption>
    </figure>
  )
}
