import { PixelImage } from "@/components/ui/pixel-image"

export default function PixelImageGrid() {
  return (
    <PixelImage
      src="https://picsum.photos/seed/react-magic-ui/800/800"
      alt="Random stock photo"
      grid="8x8"
      grayscaleAnimation={false}
      pixelFadeInDuration={600}
      maxAnimationDelay={1600}
      className="size-64 md:size-80"
    />
  )
}
