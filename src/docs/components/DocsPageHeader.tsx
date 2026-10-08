import { ChevronRight } from 'lucide-react'
import { Fragment } from 'react'
import { Link } from 'react-router'

export function DocsPageHeader({
  title,
  description,
  crumbs,
}: {
  title: string
  description?: string
  crumbs?: { title: string; to?: string }[]
}) {
  return (
    <div className="flex flex-col gap-2">
      {crumbs?.length ? (
        <nav className="flex items-center gap-1 text-sm text-muted-foreground" aria-label="Breadcrumb">
          {crumbs.map((crumb, index) => (
            <Fragment key={crumb.title}>
              {index > 0 && <ChevronRight className="size-3.5" />}
              {crumb.to ? (
                <Link to={crumb.to} className="hover:text-foreground">
                  {crumb.title}
                </Link>
              ) : (
                <span className="text-foreground">{crumb.title}</span>
              )}
            </Fragment>
          ))}
        </nav>
      ) : null}
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      {description && <p className="text-lg text-balance text-muted-foreground">{description}</p>}
    </div>
  )
}
