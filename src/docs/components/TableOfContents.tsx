import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export function TableOfContents({ items }: { items: { id: string; title: string; depth?: number }[] }) {
  const [active, setActive] = useState<string>()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length) setActive(visible[0].target.id)
      },
      { rootMargin: '0px 0px -70% 0px' },
    )
    const frame = requestAnimationFrame(() => {
      for (const item of items) {
        const element = document.getElementById(item.id)
        if (element) observer.observe(element)
      }
    })
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [items])

  return (
    <nav className="flex flex-col gap-2 text-sm" aria-label="On this page">
      <p className="font-medium">On This Page</p>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={(event) => {
            event.preventDefault()
            document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
            history.replaceState(null, '', `#${item.id}`)
          }}
          className={cn(
            'transition-colors hover:text-foreground',
            (item.depth ?? 2) > 2 && 'ps-3',
            active === item.id ? 'font-medium text-foreground' : 'text-muted-foreground',
          )}
        >
          {item.title}
        </a>
      ))}
    </nav>
  )
}
