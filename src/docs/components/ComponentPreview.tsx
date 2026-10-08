import { RotateCcw } from 'lucide-react'
import { Component, lazy, Suspense, useEffect, useMemo, useState, type ComponentType, type ErrorInfo, type ReactNode } from 'react'
import { exampleLoader, loadExampleSource } from '../catalog'
import { CodeBlock } from './CodeBlock'
import { TabList } from './TabList'

class PreviewBoundary extends Component<{ children: ReactNode; resetKey: unknown }, { error: Error | null }> {
  state = { error: null as Error | null }
  static getDerivedStateFromError(error: Error) {
    return { error }
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack)
  }
  componentDidUpdate(previous: { resetKey: unknown }) {
    if (previous.resetKey !== this.props.resetKey && this.state.error) this.setState({ error: null })
  }
  render() {
    if (this.state.error) return <p className="text-sm text-destructive">Preview failed: {this.state.error.message}</p>
    return this.props.children
  }
}

const lazyCache = new Map<string, ComponentType>()
function lazyExample(name: string): ComponentType {
  let cached = lazyCache.get(name)
  if (!cached) {
    const loader = exampleLoader(name)
    cached = lazy(loader ?? (() => Promise.reject(new Error(`Unknown example "${name}"`))))
    lazyCache.set(name, cached)
  }
  return cached
}

export function ComponentPreview({ name, minHeight = '350px' }: { name: string; minHeight?: string }) {
  const [tab, setTab] = useState<'Preview' | 'Code'>('Preview')
  const [replayKey, setReplayKey] = useState(0)
  const [source, setSource] = useState('')
  const Example = useMemo(() => lazyExample(name), [name])

  useEffect(() => setSource(''), [name])
  useEffect(() => {
    if (tab === 'Code' && !source) loadExampleSource(name).then(setSource)
  }, [tab, source, name])

  return (
    <div className="group/preview relative my-4 flex flex-col gap-2">
      <TabList value={tab} onChange={setTab} tabs={['Preview', 'Code'] as const} label="Preview mode" />
      <div className={tab === 'Preview' ? 'relative overflow-hidden rounded-xl border bg-background' : 'hidden'}>
        <button
          type="button"
          className="absolute end-3 top-3 z-20 inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label="Replay animation"
          title="Replay"
          onClick={() => setReplayKey((key) => key + 1)}
        >
          <RotateCcw className="size-4" />
        </button>
        <div className="flex w-full items-center justify-center p-6 sm:p-10" style={{ minHeight }}>
          <PreviewBoundary resetKey={`${name}-${replayKey}`}>
            <Suspense fallback={<div className="size-6 animate-spin rounded-full border-2 border-muted border-t-foreground" />}>
              <Example key={replayKey} />
            </Suspense>
          </PreviewBoundary>
        </div>
      </div>
      {tab === 'Code' &&
        (source ? (
          <CodeBlock code={source} lang="tsx" collapsible />
        ) : (
          <div className="h-40 animate-pulse rounded-xl border bg-muted/40" />
        ))}
    </div>
  )
}
