import { VideoText } from "@/components/ui/video-text"

export default function VideoTextTypography() {
  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-2">
      <div className="relative h-[180px] w-full overflow-hidden">
        <VideoText
          as="h2"
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
          fontSize={24}
          fontWeight={900}
          fontFamily="Georgia, 'Times New Roman', serif"
        >
          Spring
        </VideoText>
      </div>
      <p className="text-sm text-muted-foreground">Any font, weight or size: the mask is plain SVG text.</p>
    </div>
  )
}
