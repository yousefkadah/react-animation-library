import { Link, useLocation } from 'react-router'
import { cn } from '@/lib/utils'
import { groupedComponents } from '../catalog'

const gettingStarted = [
  { title: 'Introduction', to: '/docs' },
  { title: 'Installation', to: '/docs/installation' },
  { title: 'All components', to: '/docs/components' },
]

function linkClass(active: boolean) {
  return cn(
    'group flex h-8 w-full items-center rounded-md px-2 text-sm transition-colors',
    active ? 'bg-accent font-medium text-foreground' : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground',
  )
}

export function DocsNav({ onNavigate }: { onNavigate?: () => void }) {
  const { pathname } = useLocation()
  return (
    <nav className="flex flex-col gap-6 pb-10" aria-label="Documentation">
      <div>
        <h4 className="mb-1 px-2 text-sm font-semibold">Getting Started</h4>
        {gettingStarted.map((item) => (
          <Link key={item.to} to={item.to} className={linkClass(pathname === item.to)} onClick={onNavigate}>
            {item.title}
          </Link>
        ))}
      </div>
      {groupedComponents.map((group) => (
        <div key={group.id}>
          <h4 className="mb-1 px-2 text-sm font-semibold">{group.title}</h4>
          {group.items.map((item) => {
            const to = `/docs/components/${item.name}`
            return (
              <Link key={item.name} to={to} className={linkClass(pathname === to)} onClick={onNavigate}>
                {item.title}
                {item.isNew && (
                  <span className="ms-2 rounded-md bg-brand/15 px-1.5 py-0.5 text-[10px] leading-none font-medium text-brand">New</span>
                )}
              </Link>
            )
          })}
        </div>
      ))}
    </nav>
  )
}
