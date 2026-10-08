import type { MotionProps } from "motion/react"

import { WordRotate } from "@/components/ui/word-rotate"

const words = ["Design", "Prototype", "Ship", "Repeat"]

const blurIn: MotionProps = {
  initial: { opacity: 0, filter: "blur(10px)", scale: 0.92 },
  animate: { opacity: 1, filter: "blur(0px)", scale: 1 },
  exit: { opacity: 0, filter: "blur(10px)", scale: 1.08 },
  transition: { duration: 0.4, ease: "easeInOut" },
}

export default function WordRotateBlur() {
  return <WordRotate className="text-5xl font-semibold tracking-tighter text-foreground" words={words} motionProps={blurIn} />
}
