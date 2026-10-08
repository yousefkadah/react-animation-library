var e=`"use client"

import { useEffect, useState, type CSSProperties } from "react"
import { FileIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export interface CodeComparisonHighlightOptions {
  language: string
  lightTheme: string
  darkTheme: string
}

/**
 * Turns code into highlighted HTML shaped like Shiki's output
 * (\`<pre><code><span class="line">…</span></code></pre>\`), e.g. Shiki's \`codeToHtml\`.
 */
export type CodeComparisonHighlighter = (code: string, options: CodeComparisonHighlightOptions) => string | Promise<string>

export interface CodeComparisonProps {
  className?: string
  /** Code shown on the "before" side. */
  beforeCode: string
  /** Code shown on the "after" side. */
  afterCode: string
  /** Language of both snippets, passed to \`highlighter\`. */
  language: string
  /** File name shown above both snippets. */
  filename: string
  /** Theme for light mode, passed to \`highlighter\`. */
  lightTheme?: string
  /** Theme for dark mode, passed to \`highlighter\`. */
  darkTheme?: string
  /** Background of lines marked \`// [!code highlight]\`. */
  highlightColor?: string
  /** Optional syntax highlighter. Without one, code is rendered as plain text with the diff notations applied. */
  highlighter?: CodeComparisonHighlighter
}

const NOTATION = /\\s*(?:\\/\\/|#|--|<!--|\\/\\*|\\{\\/\\*)\\s*\\[!code (highlight|hl|\\+\\+|--|focus)\\]\\s*(?:-->|\\*\\/\\}|\\*\\/)?\\s*$/
const NOTATION_CLASSES: Record<string, string> = {
  highlight: "highlighted",
  hl: "highlighted",
  "++": "diff add",
  "--": "diff remove",
  focus: "focused",
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

/** Plain-text fallback with Shiki's markup and its \`[!code …]\` notations (highlight, ++, --, focus). */
function plainHtml(code: string) {
  const lines = code.split("\\n").map((line) => {
    const match = line.match(NOTATION)
    if (!match || match.index === undefined) return \`<span class="line">\${escapeHtml(line)}</span>\`
    return \`<span class="line \${NOTATION_CLASSES[match[1]]}">\${escapeHtml(line.slice(0, match.index))}</span>\`
  })
  return \`<pre><code>\${lines.join("\\n")}</code></pre>\`
}

const FOCUSED = /class="[^"]*\\bfocused\\b/

const codeClasses = cn(
  "h-full w-full overflow-auto bg-background font-mono text-xs text-foreground",
  "[&>pre]:h-full [&>pre]:w-max [&>pre]:min-w-full [&>pre]:py-2",
  "[&>pre>code]:inline-block! [&>pre>code]:w-full!",
  "[&>pre>code>span]:inline-block! [&>pre>code>span]:w-full [&>pre>code>span]:px-4 [&>pre>code>span]:py-0.5",
  "[&>pre>code>.highlighted]:inline-block [&>pre>code>.highlighted]:w-full [&>pre>code>.highlighted]:bg-(--highlight-color)!",
  "group-hover/left:[&>pre>code>:not(.focused)]:opacity-100! group-hover/left:[&>pre>code>:not(.focused)]:blur-none!",
  "group-hover/right:[&>pre>code>:not(.focused)]:opacity-100! group-hover/right:[&>pre>code>:not(.focused)]:blur-none!",
  "[&>pre>code>.add]:bg-[rgba(16,185,129,.16)] [&>pre>code>.remove]:bg-[rgba(244,63,94,.16)]",
  "group-hover/left:[&>pre>code>:not(.focused)]:transition-all group-hover/left:[&>pre>code>:not(.focused)]:duration-300",
  "group-hover/right:[&>pre>code>:not(.focused)]:transition-all group-hover/right:[&>pre>code>:not(.focused)]:duration-300",
  // Shiki dual-theme output (\`themes: { light, dark }\`): follow the page's colour scheme.
  "[&_.shiki-themes]:bg-transparent! [&_.shiki-themes_span]:text-(--shiki-light) dark:[&_.shiki-themes_span]:text-(--shiki-dark)!"
)

const focusClasses = "[&>div>pre>code>:not(.focused)]:opacity-50! [&>div>pre>code>:not(.focused)]:blur-[0.095rem]!"
const focusTransition = "[&>div>pre>code>:not(.focused)]:transition-all [&>div>pre>code>:not(.focused)]:duration-300"

export function CodeComparison({
  className,
  beforeCode,
  afterCode,
  language,
  filename,
  lightTheme = "github-light",
  darkTheme = "github-dark",
  highlightColor = "rgba(101, 117, 133, 0.16)",
  highlighter,
}: CodeComparisonProps) {
  const [highlighted, setHighlighted] = useState<{ before: string; after: string } | null>(null)

  useEffect(() => {
    setHighlighted(null)
    if (!highlighter) return
    let cancelled = false
    const options = { language, lightTheme, darkTheme }
    Promise.all([highlighter(beforeCode, options), highlighter(afterCode, options)])
      .then(([before, after]) => {
        if (!cancelled) setHighlighted({ before, after })
      })
      .catch((error: unknown) => {
        if (!cancelled) console.error("[CodeComparison] Highlighting failed; showing plain code.", error)
      })
    return () => {
      cancelled = true
    }
  }, [highlighter, beforeCode, afterCode, language, lightTheme, darkTheme])

  const beforeHtml = highlighted?.before ?? plainHtml(beforeCode)
  const afterHtml = highlighted?.after ?? plainHtml(afterCode)
  const hasLeftFocus = FOCUSED.test(beforeHtml)
  const hasRightFocus = FOCUSED.test(afterHtml)
  const codeStyle = { "--highlight-color": highlightColor } as CSSProperties

  return (
    <div className={cn("mx-auto w-full max-w-5xl", className)}>
      <div className="group relative w-full overflow-hidden rounded-md border border-border">
        <div className="relative grid md:grid-cols-2">
          <div className={cn("leftside group/left border-primary/20 md:border-e", hasLeftFocus && focusClasses, focusTransition)}>
            <div className="flex items-center border-b border-primary/20 bg-accent p-2 text-sm text-foreground">
              <FileIcon className="me-2 size-4" aria-hidden="true" />
              {filename}
              <span className="ms-auto hidden md:block">before</span>
            </div>
            <div style={codeStyle} className={codeClasses} dangerouslySetInnerHTML={{ __html: beforeHtml }} />
          </div>
          <div
            className={cn(
              "rightside group/right border-t border-primary/20 md:border-t-0",
              hasRightFocus && focusClasses,
              focusTransition
            )}
          >
            <div className="flex items-center border-b border-primary/20 bg-accent p-2 text-sm text-foreground">
              <FileIcon className="me-2 size-4" aria-hidden="true" />
              {filename}
              <span className="ms-auto hidden md:block">after</span>
            </div>
            <div style={codeStyle} className={codeClasses} dangerouslySetInnerHTML={{ __html: afterHtml }} />
          </div>
        </div>
        <div
          className="absolute top-1/2 left-1/2 hidden size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md border border-primary/20 bg-accent text-xs text-foreground md:flex"
          aria-hidden="true"
        >
          VS
        </div>
      </div>
    </div>
  )
}
`;export{e as default};