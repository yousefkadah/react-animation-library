import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router'
import { categories, findComponent, neighbours } from '../catalog'
import { CodeBlock } from '../components/CodeBlock'
import { ComponentInstallation } from '../components/ComponentInstallation'
import { ComponentPreview } from '../components/ComponentPreview'
import { DocsPageHeader } from '../components/DocsPageHeader'
import { PropsTable } from '../components/PropsTable'
import { TableOfContents } from '../components/TableOfContents'
import { site } from '../site'
import NotFoundPage from './NotFoundPage'

const sectionHeading = 'mt-12 mb-4 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight'

export default function ComponentPage() {
  const slug = useParams().slug ?? ''
  const component = findComponent(slug)
  const siblings = neighbours(slug)
  const category = categories.find((entry) => entry.id === component?.category)
  const extraExamples = component?.examples.slice(1) ?? []

  const toc = useMemo(() => {
    if (!component) return []
    return [
      { id: 'installation', title: 'Installation' },
      ...(component.usage ? [{ id: 'usage', title: 'Usage' }] : []),
      ...(component.examples.length > 1
        ? [{ id: 'examples', title: 'Examples' }, ...component.examples.slice(1).map((example) => ({ id: example.name, title: example.title, depth: 3 }))]
        : []),
      ...(component.api?.length ? [{ id: 'props', title: 'Props' }] : []),
      ...(component.credit ? [{ id: 'credits', title: 'Credits' }] : []),
    ]
  }, [component])

  useEffect(() => {
    document.title = component ? `${component.title} — ${site.name}` : site.name
  }, [component])

  if (!component) return <NotFoundPage />

  return (
    <div className="flex gap-10 py-8 lg:py-10">
      <article key={component.name} className="min-w-0 flex-1">
        <DocsPageHeader
          title={component.title}
          description={component.description}
          crumbs={[{ title: 'Docs', to: '/docs' }, { title: 'Components', to: '/docs/components' }, { title: component.title }]}
        />
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-md border px-2 py-0.5 text-muted-foreground">{category?.title}</span>
          <a
            href={`${site.registryUrl}/${component.name}.json`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-muted-foreground hover:text-foreground"
          >
            Registry JSON <ExternalLink className="size-3" />
          </a>
        </div>

        <ComponentPreview name={component.examples[0].name} />

        <h2 id="installation" className={sectionHeading}>
          Installation
        </h2>
        <ComponentInstallation component={component} />

        {component.usage && (
          <>
            <h2 id="usage" className={sectionHeading}>
              Usage
            </h2>
            <CodeBlock code={component.usage} lang="tsx" />
          </>
        )}

        {extraExamples.length > 0 && (
          <>
            <h2 id="examples" className="mt-12 mb-2 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
              Examples
            </h2>
            {extraExamples.map((example) => (
              <section key={example.name} className="mt-8">
                <h3 id={example.name} className="scroll-m-20 text-lg font-semibold tracking-tight">
                  {example.title}
                </h3>
                {example.description && <p className="mt-1 text-sm text-muted-foreground">{example.description}</p>}
                <ComponentPreview name={example.name} />
              </section>
            ))}
          </>
        )}

        {component.api?.length ? (
          <>
            <h2 id="props" className={sectionHeading}>
              Props
            </h2>
            <PropsTable api={component.api} />
          </>
        ) : null}

        {component.credit && (
          <>
            <h2 id="credits" className={sectionHeading}>
              Credits
            </h2>
            <p className="text-muted-foreground">{component.credit}</p>
          </>
        )}

        <nav className="mt-16 flex items-center justify-between gap-4 border-t pt-6" aria-label="Pagination">
          {siblings.previous ? (
            <Link to={`/docs/components/${siblings.previous.name}`} className="inline-flex h-9 items-center gap-1 rounded-md border px-3 text-sm font-medium hover:bg-accent">
              <ChevronLeft className="size-4" /> {siblings.previous.title}
            </Link>
          ) : (
            <span />
          )}
          {siblings.next && (
            <Link to={`/docs/components/${siblings.next.name}`} className="inline-flex h-9 items-center gap-1 rounded-md border px-3 text-sm font-medium hover:bg-accent">
              {siblings.next.title} <ChevronRight className="size-4" />
            </Link>
          )}
        </nav>
      </article>
      <aside className="sticky top-20 hidden h-fit w-52 shrink-0 xl:block">
        <TableOfContents items={toc} />
      </aside>
    </div>
  )
}
