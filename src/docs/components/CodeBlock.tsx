import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { highlight, type CodeLanguage } from '../highlight'
import { CopyButton } from './CopyButton'

interface CodeBlockProps {
  code: string
  lang?: CodeLanguage
  filename?: string
  /** Collapse code taller than ~20 lines behind an "Expand" button. */
  collapsible?: boolean
  className?: string
}

export function CodeBlock({ code, lang = 'tsx', filename, collapsible = false, className }: CodeBlockProps) {
  const [html, setHtml] = useState('')
  const [expanded, setExpanded] = useState(false)
  const isLong = collapsible && code.split('\n').length > 20

  useEffect(() => {
    let cancelled = false
    setHtml('')
    highlight(code, lang).then((rendered) => {
      if (!cancelled) setHtml(rendered)
    })
    return () => {
      cancelled = true
    }
  }, [code, lang])

  return (
    <div className={cn('group/code relative overflow-hidden rounded-xl border bg-muted/30 dark:bg-muted/20', className)}>
      {filename && <div className="flex h-10 items-center border-b px-4 font-mono text-xs text-muted-foreground">{filename}</div>}
      <CopyButton value={code} className={cn('absolute end-2 z-10', filename ? 'top-1.5' : 'top-2')} />
      <div
        className={cn(
          'overflow-auto font-mono text-[13px] leading-relaxed [&_pre]:w-max [&_pre]:min-w-full [&_pre]:p-4',
          isLong && !expanded ? 'max-h-80' : 'max-h-[640px]',
        )}
      >
        {html ? (
          <div dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          <pre className="p-4 text-muted-foreground">
            <code>{code}</code>
          </pre>
        )}
      </div>
      {isLong && !expanded && (
        <div className="absolute inset-x-0 bottom-0 flex h-24 items-end justify-center bg-linear-to-t from-background/95 to-transparent pb-4">
          <button
            type="button"
            className="rounded-md border bg-background px-3 py-1.5 text-xs font-medium shadow-sm hover:bg-accent"
            onClick={() => setExpanded(true)}
          >
            Expand
          </button>
        </div>
      )}
    </div>
  )
}
