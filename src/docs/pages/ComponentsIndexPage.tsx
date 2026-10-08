import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { components, groupedComponents } from '../catalog'
import { DocsPageHeader } from '../components/DocsPageHeader'

export default function ComponentsIndexPage() {
  return (
    <article className="py-8 lg:py-10 xl:pe-6">
      <DocsPageHeader
        title="Components"
        description={`${components.length} animated components, ready to copy and paste.`}
        crumbs={[{ title: 'Docs', to: '/docs' }, { title: 'Components' }]}
      />
      {groupedComponents.map((group) => (
        <section key={group.id} className="mt-10">
          <h2 id={group.id} className="mb-4 scroll-m-20 text-xl font-semibold tracking-tight">
            {group.title}
            <span className="ms-1 text-sm font-normal text-muted-foreground">{group.items.length}</span>
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {group.items.map((item) => (
              <Link
                key={item.name}
                to={`/docs/components/${item.name}`}
                className="group flex flex-col gap-1.5 rounded-xl border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md"
              >
                <span className="flex items-center justify-between font-medium">
                  {item.title}
                  <ArrowRight className="size-4 -translate-x-1 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </span>
                <span className="line-clamp-2 text-sm text-muted-foreground">{item.description}</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </article>
  )
}
