var e=`import { Highlighter } from "@/components/ui/highlighter"

export default function HighlighterInView() {
  return (
    <article className="max-w-md space-y-3 text-left">
      <h3 className="text-xl font-semibold tracking-tight">Release notes</h3>
      <p className="leading-relaxed text-muted-foreground">
        This release makes the editor{" "}
        <Highlighter isView action="highlight" color="#FDE68A" animationDuration={900} className="text-foreground dark:text-black">
          twice as fast on large documents
        </Highlighter>{" "}
        and adds{" "}
        <Highlighter isView action="underline" color="#22C55E" iterations={3}>
          offline support
        </Highlighter>{" "}
        for every workspace. Annotations with <code className="rounded bg-muted px-1 text-sm">isView</code> wait until they
        scroll into view.
      </p>
    </article>
  )
}
`;export{e as default};