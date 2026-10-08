import { BookOpen, CornerDownLeft, FileCode2, Moon, Search, Sun } from 'lucide-react'
import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router'
import { cn } from '@/lib/utils'
import { categories, components } from '../catalog'
import { commandMenuStore, themeStore, toggleTheme, useStore } from '../state'

interface CommandItem {
  id: string
  title: string
  group: string
  keywords: string
  run: () => void
}

export function CommandMenu() {
  const open = useStore(commandMenuStore)
  const theme = useStore(themeStore)
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const input = useRef<HTMLInputElement>(null)
  const list = useRef<HTMLDivElement>(null)

  const items = useMemo<CommandItem[]>(
    () => [
      { id: 'intro', title: 'Introduction', group: 'Docs', keywords: 'docs getting started', run: () => navigate('/docs') },
      { id: 'install', title: 'Installation', group: 'Docs', keywords: 'setup tailwind cli npm', run: () => navigate('/docs/installation') },
      { id: 'all', title: 'All components', group: 'Docs', keywords: 'gallery index', run: () => navigate('/docs/components') },
      ...components.map((component) => ({
        id: component.name,
        title: component.title,
        group: categories.find((category) => category.id === component.category)?.title ?? 'Components',
        keywords: `${component.name} ${component.description}`,
        run: () => navigate(`/docs/components/${component.name}`),
      })),
      {
        id: 'theme',
        title: theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
        group: 'Theme',
        keywords: 'dark light mode',
        run: toggleTheme,
      },
    ],
    [navigate, theme],
  )

  const filtered = useMemo(() => {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean)
    if (!terms.length) return items
    return items.filter((item) => {
      const haystack = `${item.title} ${item.keywords}`.toLowerCase()
      return terms.every((term) => haystack.includes(term))
    })
  }, [items, query])

  const grouped = useMemo(() => {
    const groups = new Map<string, { item: CommandItem; index: number }[]>()
    filtered.forEach((item, index) => {
      if (!groups.has(item.group)) groups.set(item.group, [])
      groups.get(item.group)!.push({ item, index })
    })
    return [...groups.entries()]
  }, [filtered])

  useEffect(() => setActiveIndex(0), [query])
  useEffect(() => {
    if (!open) return
    setQuery('')
    setActiveIndex(0)
    requestAnimationFrame(() => input.current?.focus())
  }, [open])

  useEffect(() => {
    function onKeydown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        commandMenuStore.set(!commandMenuStore.get())
      } else if (event.key === '/' && !commandMenuStore.get() && !(event.target as HTMLElement)?.closest('input, textarea, [contenteditable]')) {
        event.preventDefault()
        commandMenuStore.set(true)
      }
    }
    window.addEventListener('keydown', onKeydown)
    return () => window.removeEventListener('keydown', onKeydown)
  }, [])

  useEffect(() => {
    list.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  function select(item: CommandItem | undefined) {
    if (!item) return
    commandMenuStore.set(false)
    item.run()
  }

  function onKeyDown(event: ReactKeyboardEvent) {
    const count = filtered.length
    if (event.key === 'ArrowDown' && count) {
      event.preventDefault()
      setActiveIndex((index) => (index + 1) % count)
    } else if (event.key === 'ArrowUp' && count) {
      event.preventDefault()
      setActiveIndex((index) => (index - 1 + count) % count)
    } else if (event.key === 'Enter') {
      event.preventDefault()
      select(filtered[activeIndex])
    } else if (event.key === 'Escape') {
      event.preventDefault()
      commandMenuStore.set(false)
    }
  }

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-black/50 px-4 pt-[12vh] backdrop-blur-[2px]"
      onMouseDown={(event) => event.target === event.currentTarget && commandMenuStore.set(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search components"
        className="w-full max-w-xl overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow-2xl"
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-2 border-b px-4">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            ref={input}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            placeholder="Search components..."
            className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            aria-label="Search"
          />
          <kbd className="rounded border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground">ESC</kbd>
        </div>
        <div ref={list} className="max-h-[min(60vh,420px)] overflow-y-auto p-2">
          {!filtered.length && <p className="py-10 text-center text-sm text-muted-foreground">No results for “{query}”.</p>}
          {grouped.map(([group, entries]) => (
            <div key={group} className="mb-2 last:mb-0">
              <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">{group}</div>
              {entries.map(({ item, index }) => {
                const Icon = item.group === 'Docs' ? BookOpen : item.group === 'Theme' ? (theme === 'dark' ? Sun : Moon) : FileCode2
                return (
                  <button
                    key={item.id}
                    type="button"
                    data-active={index === activeIndex}
                    className={cn(
                      'flex h-9 w-full items-center gap-2 rounded-md px-2 text-start text-sm',
                      index === activeIndex && 'bg-accent text-accent-foreground',
                    )}
                    onMouseMove={() => setActiveIndex(index)}
                    onClick={() => select(item)}
                  >
                    <Icon className="size-4 text-muted-foreground" />
                    {item.title}
                    {index === activeIndex && <CornerDownLeft className="ms-auto size-3.5 text-muted-foreground" />}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  )
}
