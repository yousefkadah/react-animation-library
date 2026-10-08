var e=`import type { Variants } from "motion/react"

import { TextAnimate } from "@/components/ui/text-animate"

const variants: Variants = {
  hidden: { opacity: 0, y: 30, rotate: 45, scale: 0.5 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      y: { type: "spring", damping: 12, stiffness: 200, mass: 0.8 },
      rotate: { type: "spring", damping: 8, stiffness: 150 },
      scale: { type: "spring", damping: 10, stiffness: 300 },
    },
  }),
  exit: (i: number) => ({
    opacity: 0,
    y: 30,
    rotate: 45,
    scale: 0.5,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
}

export default function TextAnimateCustomVariants() {
  return (
    <TextAnimate variants={variants} by="character" className="text-5xl font-bold tracking-tight">
      Wavy Motion!
    </TextAnimate>
  )
}
`;export{e as default};