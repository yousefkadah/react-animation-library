import { Menu, Search } from 'lucide-react'
import { Link, useLocation } from 'react-router'
import { cn } from '@/lib/utils'
import { site } from '../site'
import { commandMenuStore, mobileNavStore } from '../state'
import { GithubIcon, SiteLogo } from './icons'
import { ThemeToggle } from './ThemeToggle'

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

export function SiteHeader() {
  const { pathname } = useLocation()
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-screen-2xl items-center gap-4 px-4 sm:px-6">
        <button
          type="button"
          className="-ms-2 inline-flex size-9 items-center justify-center rounded-md hover:bg-accent md:hidden"
          aria-label="Open navigation"
          onClick={() => mobileNavStore.set(true)}
        >
          <Menu className="size-5" />
        </button>

        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <SiteLogo className="size-6" />
          <span className="hidden sm:inline">{site.name}</span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm md:flex">
          <Link
            to="/docs"
            className={cn(
              'transition-colors hover:text-foreground',
              pathname === '/docs' || pathname === '/docs/installation' ? 'text-foreground' : 'text-muted-foreground',
            )}
          >
            Docs
          </Link>
          <Link
            to="/docs/components"
            className={cn(
              'transition-colors hover:text-foreground',
              pathname.startsWith('/docs/components') ? 'text-foreground' : 'text-muted-foreground',
            )}
          >
            Components
          </Link>
          <a href={site.sibling.url} className="text-muted-foreground transition-colors hover:text-foreground">
            {site.sibling.name}
          </a>
        </nav>

        <div className="ms-auto flex items-center gap-1">
          <button
            type="button"
            className="me-1 inline-flex h-9 items-center gap-2 rounded-md border bg-muted/40 px-3 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground sm:w-56 lg:w-64"
            onClick={() => commandMenuStore.set(true)}
          >
            <Search className="size-4" />
            <span className="hidden sm:inline">Search components...</span>
            <kbd className="pointer-events-none ms-auto hidden h-5 items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium sm:inline-flex">
              {isMac ? '⌘' : 'Ctrl'} K
            </kbd>
          </button>
          <a
            href={site.repository}
            target="_blank"
            rel="noreferrer"
            className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="GitHub repository"
          >
            <GithubIcon className="size-4" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
