import { TypingAnimation } from "@/components/ui/typing-animation"

const cursors = [
  { style: "line", label: "Line cursor (default)" },
  { style: "block", label: "Block cursor (VS Code style)" },
  { style: "underscore", label: "Underscore cursor" },
] as const

export default function TypingAnimationCursorStyles() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      {cursors.map((cursor) => (
        <div key={cursor.style}>
          <p className="text-sm text-muted-foreground">{cursor.label}</p>
          <TypingAnimation
            words={[cursor.label.split(" (")[0]]}
            cursorStyle={cursor.style}
            loop
            className="text-3xl leading-tight font-bold"
          />
        </div>
      ))}
    </div>
  )
}
