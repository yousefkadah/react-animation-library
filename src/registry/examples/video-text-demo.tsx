import { VideoText } from "@/components/ui/video-text"

export default function VideoTextDemo() {
  return (
    <div className="relative h-[200px] w-full overflow-hidden">
      <VideoText src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm">BLOOM</VideoText>
    </div>
  )
}
