var e=`import { TypingAnimation } from "@/components/ui/typing-animation"

export default function TypingAnimationSpeed() {
  return (
    <TypingAnimation
      words={["Fast typing", "Slow delete"]}
      typeSpeed={50}
      deleteSpeed={150}
      pauseDelay={2000}
      loop
      className="font-mono text-3xl font-semibold sm:text-4xl"
    />
  )
}
`;export{e as default};