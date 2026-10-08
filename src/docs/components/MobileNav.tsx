import { X } from 'lucide-react'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router'
import { mobileNavStore, useStore } from '../state'
import { DocsNav } from './DocsNav'

export function MobileNav() {
  const open = useStore(mobileNavStore)
  const { pathname } = useLocation()
  useEffect(() => mobileNavStore.set(false), [pathname])
  if (!open) return null
  return createPortal(
    <>
      <div className="fixed inset-0 z-50 bg-black/50 md:hidden" onClick={() => mobileNavStore.set(false)} />
      <aside className="fixed inset-y-0 start-0 z-50 w-72 overflow-y-auto border-e bg-background p-4 shadow-xl md:hidden" aria-label="Navigation">
        <div className="mb-4 flex items-center justify-between">
          <Link to="/" className="font-semibold">
            Home
          </Link>
          <button
            type="button"
            className="inline-flex size-8 items-center justify-center rounded-md hover:bg-accent"
            aria-label="Close navigation"
            onClick={() => mobileNavStore.set(false)}
          >
            <X className="size-4" />
          </button>
        </div>
        <DocsNav onNavigate={() => mobileNavStore.set(false)} />
      </aside>
    </>,
    document.body,
  )
}
