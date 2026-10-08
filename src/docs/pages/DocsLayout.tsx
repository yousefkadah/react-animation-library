import { Outlet } from 'react-router'
import { DocsNav } from '../components/DocsNav'

export default function DocsLayout() {
  return (
    <div className="mx-auto flex w-full max-w-screen-2xl px-4 sm:px-6">
      <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-60 shrink-0 overflow-y-auto py-8 pe-4 [scrollbar-width:thin] md:block lg:w-64">
        <DocsNav />
      </aside>
      <div className="min-w-0 flex-1 md:ps-6 lg:ps-10">
        <Outlet />
      </div>
    </div>
  )
}
