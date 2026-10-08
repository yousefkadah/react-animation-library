import { AnimatedSpan, Terminal, TerminalTypingAnimation } from "@/components/ui/terminal"

export default function TerminalDelays() {
  return (
    // With `sequence` off, every line runs on its own `delay` (in milliseconds).
    <Terminal sequence={false}>
      <TerminalTypingAnimation delay={0}>$ ls</TerminalTypingAnimation>
      <AnimatedSpan delay={800} className="text-blue-500">
        Documents Downloads Pictures
      </AnimatedSpan>
      <TerminalTypingAnimation delay={1600}>$ cd Documents</TerminalTypingAnimation>
      <TerminalTypingAnimation delay={2400}>$ pwd</TerminalTypingAnimation>
      <AnimatedSpan delay={3200} className="text-green-500">
        /home/user/Documents
      </AnimatedSpan>
    </Terminal>
  )
}
