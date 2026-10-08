import { Outlet, ScrollRestoration } from 'react-router'
import { CommandMenu } from './docs/components/CommandMenu'
import { MobileNav } from './docs/components/MobileNav'
import { SiteFooter } from './docs/components/SiteFooter'
import { SiteHeader } from './docs/components/SiteHeader'

export default function App() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <CommandMenu />
      <MobileNav />
      <ScrollRestoration />
    </div>
  )
}
