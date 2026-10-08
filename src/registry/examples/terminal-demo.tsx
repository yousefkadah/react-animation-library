import { AnimatedSpan, Terminal, TerminalTypingAnimation } from "@/components/ui/terminal"

export default function TerminalDemo() {
  return (
    <Terminal>
      <TerminalTypingAnimation>&gt; npx shadcn@latest init</TerminalTypingAnimation>

      <AnimatedSpan className="text-green-500">✔ Preflight checks.</AnimatedSpan>
      <AnimatedSpan className="text-green-500">✔ Verifying framework. Found Next.js.</AnimatedSpan>
      <AnimatedSpan className="text-green-500">✔ Validating Tailwind CSS.</AnimatedSpan>
      <AnimatedSpan className="text-green-500">✔ Validating import alias.</AnimatedSpan>
      <AnimatedSpan className="text-green-500">✔ Writing components.json.</AnimatedSpan>
      <AnimatedSpan className="text-green-500">✔ Checking registry.</AnimatedSpan>
      <AnimatedSpan className="text-green-500">✔ Updating app/globals.css</AnimatedSpan>
      <AnimatedSpan className="text-green-500">✔ Installing dependencies.</AnimatedSpan>

      <AnimatedSpan className="text-blue-500">
        <span>ℹ Updated 1 file:</span>
        <span className="pl-2">- lib/utils.ts</span>
      </AnimatedSpan>

      <TerminalTypingAnimation className="text-muted-foreground">Success! Project initialization completed.</TerminalTypingAnimation>
      <TerminalTypingAnimation className="text-muted-foreground">You may now add components.</TerminalTypingAnimation>
    </Terminal>
  )
}
