import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { components } from '../catalog'
import { DocsPageHeader } from '../components/DocsPageHeader'
import { site } from '../site'

export default function IntroductionPage() {
  return (
    <article className="mx-auto max-w-3xl py-8 lg:py-10">
      <DocsPageHeader
        title="Introduction"
        description={`${components.length}+ free and open-source animated components for ${site.framework}, built with Tailwind CSS and Motion.`}
        crumbs={[{ title: 'Docs', to: '/docs' }, { title: 'Introduction' }]}
      />
      <div className="mt-8 flex flex-col gap-5 leading-7 text-foreground/90 [&_h2]:mt-6 [&_h2]:scroll-m-20 [&_h2]:border-b [&_h2]:pb-2 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight">
        <p>
          {site.name} is a collection of polished, animated components you can drop into any {site.framework} project. It follows the
          design-engineering style popularised by{' '}
          <a href="https://magicui.design" className="font-medium underline underline-offset-4" target="_blank" rel="noreferrer">
            Magic UI
          </a>{' '}
          — with the same component names and props — and ships an identical catalogue for Vue.
        </p>
        <h2>Not a traditional component library</h2>
        <p>
          Like shadcn/ui, the primary way to use it is to <strong>copy the source into your project</strong> — with the CLI or by hand — so you
          own the code and can change anything. Prefer a dependency? Every component is also published on npm as{' '}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">{site.npmPackage}</code>.
        </p>
        <h2>Built on</h2>
        <ul className="ms-6 list-disc [&>li]:mt-2">
          <li>
            <strong>React 19</strong> (18 works too) with TypeScript — every file is marked <code className="font-mono text-sm">"use client"</code> where needed for the Next.js App Router.
          </li>
          <li>
            <strong>Tailwind CSS v4</strong> — every style is a utility class you can override with <code className="font-mono text-sm">className</code>.
          </li>
          <li>
            <strong>Motion</strong> (<code className="font-mono text-sm">motion/react</code>) for springs, gestures and scroll-linked animation.
          </li>
          <li>
            <strong>The shadcn registry format</strong>, so <code className="font-mono text-sm">{site.cli} add</code> installs a component, its dependencies and its keyframes in one step.
          </li>
        </ul>
        <h2>Also for Vue</h2>
        <p>
          The same catalogue is available as{' '}
          <a href={site.sibling.url} className="font-medium underline underline-offset-4">
            {site.sibling.name}
          </a>
          , with matching names and props.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link to="/docs/installation" className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Installation <ArrowRight className="size-4" />
          </Link>
          <Link to="/docs/components" className="inline-flex h-10 items-center rounded-md border px-5 text-sm font-medium hover:bg-accent">
            Browse components
          </Link>
        </div>
      </div>
    </article>
  )
}
