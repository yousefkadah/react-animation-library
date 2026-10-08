import { HeroVideoDialog } from "@/components/ui/hero-video-dialog"

export default function HeroVideoDialogTopInBottomOut() {
  return (
    <div className="relative w-full max-w-xl">
      <HeroVideoDialog
        animationStyle="top-in-bottom-out"
        videoSrc="https://www.youtube.com/embed/8pDqJVdNa44"
        thumbnailSrc="https://i.ytimg.com/vi/8pDqJVdNa44/maxresdefault.jpg"
        thumbnailAlt="React.js: The Documentary"
      />
    </div>
  )
}
