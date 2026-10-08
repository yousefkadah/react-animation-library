import { TextAnimate } from "@/components/ui/text-animate"

export default function TextAnimateDemo() {
  return (
    <TextAnimate animation="blurInUp" by="character" once className="text-4xl font-semibold tracking-tight sm:text-5xl">
      Blur in by character
    </TextAnimate>
  )
}
