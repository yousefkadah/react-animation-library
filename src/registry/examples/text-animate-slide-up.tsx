import { TextAnimate } from "@/components/ui/text-animate"

export default function TextAnimateSlideUp() {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <TextAnimate as="h2" animation="slideUp" by="word" className="text-4xl font-bold tracking-tighter sm:text-5xl">
        Slide up by word
      </TextAnimate>
      <TextAnimate
        animation="blurIn"
        by="word"
        delay={0.4}
        duration={0.6}
        className="max-w-sm text-balance text-muted-foreground"
      >
        Pass any string as children and pick how it is split.
      </TextAnimate>
    </div>
  )
}
