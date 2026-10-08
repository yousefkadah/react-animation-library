import { Highlighter } from "@/components/ui/highlighter"

export default function HighlighterActions() {
  return (
    <p className="max-w-md text-center text-lg leading-loose">
      You can{" "}
      <Highlighter action="box" color="#8B5CF6">
        box
      </Highlighter>{" "}
      a word,{" "}
      <Highlighter action="circle" color="#F43F5E" padding={6}>
        circle
      </Highlighter>{" "}
      it,{" "}
      <Highlighter action="strike-through" color="#EF4444">
        strike it out
      </Highlighter>
      ,{" "}
      <Highlighter action="crossed-off" color="#F97316">
        cross it off
      </Highlighter>
      ,{" "}
      <Highlighter action="underline" color="#10B981" strokeWidth={2}>
        underline
      </Highlighter>{" "}
      it or{" "}
      <Highlighter action="bracket" color="#0EA5E9" padding={4}>
        bracket
      </Highlighter>{" "}
      a whole thought.
    </p>
  )
}
