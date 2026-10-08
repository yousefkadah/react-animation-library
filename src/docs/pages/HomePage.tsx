import { ArrowRight, ChevronRight } from 'lucide-react'
import { lazy, Suspense, type ComponentType } from 'react'
import { Link } from 'react-router'
import { cn } from '@/lib/utils'
import { components, exampleLoader, exampleNames, findComponent } from '../catalog'
import { CodeBlock } from '../components/CodeBlock'
import { runCommand, site } from '../site'

/** Live demos shown on the landing page, in order. Missing ones are skipped. */
const featuredExamples = [
  { example: 'globe-demo', span: 'md:col-span-2 md:row-span-2', zoom: 0.85 },
  { example: 'animated-beam-multiple-outputs', span: 'md:col-span-2', zoom: 0.7 },
  { example: 'border-beam-demo', span: '', zoom: 0.6 },
  { example: 'shimmer-button-demo', span: '', zoom: 0.9 },
  { example: 'animated-list-demo', span: 'md:row-span-2', zoom: 0.75 },
  { example: 'number-ticker-demo', span: '', zoom: 0.8 },
  { example: 'hyper-text-demo', span: '', zoom: 0.7 },
  { example: 'confetti-demo', span: '', zoom: 0.55 },
  { example: 'dock-demo', span: 'md:col-span-2', zoom: 0.7 },
  { example: 'blur-fade-text', span: '', zoom: 0.6 },
  { example: 'marquee-demo', span: 'md:col-span-2', zoom: 0.75 },
  { example: 'flickering-grid-demo', span: 'md:col-span-2', zoom: 1 },
]

const available = new Set(exampleNames())
const featured = featuredExamples
  .filter((entry) => available.has(entry.example))
  .map((entry) => {
    const slug = components.find((component) => component.examples.some((example) => example.name === entry.example))?.name ?? ''
    return {
      ...entry,
      component: findComponent(slug),
      View: lazy(exampleLoader(entry.example)!) as ComponentType,
    }
  })

const heroMarquee = components.slice(0, 24)

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] bg-[radial-gradient(ellipse_at_top,var(--color-brand)_0%,transparent_60%)] opacity-[0.12]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)] bg-[size:48px_48px] opacity-40"
      />

      <section className="mx-auto flex max-w-5xl flex-col items-center px-4 pt-20 pb-16 text-center sm:pt-28">
        <Link to="/docs/components" className="group inline-flex items-center gap-2 rounded-full border bg-background/60 px-4 py-1.5 text-sm backdrop-blur transition-colors hover:bg-accent">
          <span>✨</span>
          <span className="h-4 w-px bg-border" />
          <span className="bg-[linear-gradient(110deg,var(--color-muted-foreground)_35%,var(--color-foreground)_50%,var(--color-muted-foreground)_65%)] bg-[length:200%_100%] bg-clip-text text-transparent motion-safe:animate-[home-shine_3s_linear_infinite]">
            {components.length} components · v1 is here
          </span>
          <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>

        <h1 className="mt-8 text-5xl leading-[1.05] font-semibold tracking-tighter text-balance sm:text-7xl">
          UI library for <span className="bg-linear-to-br from-foreground via-foreground/80 to-brand bg-clip-text text-transparent">Design Engineers</span>
          <span className="block text-3xl font-medium tracking-tight text-muted-foreground sm:text-5xl">who build with {site.framework}</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-balance text-muted-foreground">
          {components.length}+ free and open-source animated components built with {site.framework}, TypeScript, Tailwind CSS and Motion. Copy them into
          your app with one command.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/docs/components"
            className="group inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
          >
            Browse Components
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link to="/docs/installation" className="inline-flex h-11 items-center justify-center rounded-lg border bg-background px-6 text-sm font-medium hover:bg-accent">
            Get Started
          </Link>
        </div>
        <div className="mt-8 w-full max-w-xl text-start">
          <CodeBlock code={runCommand('npm', `${site.cli} add ${site.registryUrl}/marquee.json`)} lang="bash" />
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Using Vue?{' '}
          <a href={site.sibling.url} className="font-medium text-foreground underline underline-offset-4">
            {site.sibling.name}
          </a>{' '}
          has the same components.
        </p>
      </section>

      <section className="relative mx-auto max-w-6xl overflow-hidden px-4 pb-6">
        <div className="flex w-max gap-3 hover:[animation-play-state:paused] motion-safe:animate-[home-marquee_60s_linear_infinite]">
          {[...heroMarquee, ...heroMarquee].map((item, index) => (
            <Link
              key={`${item.name}-${index}`}
              to={`/docs/components/${item.name}`}
              className="shrink-0 rounded-full border bg-background/70 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur hover:text-foreground"
            >
              {item.title}
            </Link>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-background" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-background" />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-10 flex flex-col items-center gap-2 text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Live, not screenshots</h2>
          <p className="max-w-xl text-muted-foreground">Every tile below is a real component running on this page.</p>
        </div>
        <div className="grid auto-rows-[260px] gap-4 md:grid-flow-dense md:grid-cols-4">
          {featured.map(({ example, span, zoom, component, View }) => (
            <div key={example} className={cn('group relative flex flex-col overflow-hidden rounded-2xl border bg-card transition-shadow hover:shadow-xl', span)}>
              <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden p-4">
                <div className="flex w-full items-center justify-center" style={{ zoom }}>
                  <Suspense fallback={null}>
                    <View />
                  </Suspense>
                </div>
              </div>
              <Link to={`/docs/components/${component?.name}`} className="flex items-center justify-between border-t bg-background/80 px-4 py-2.5 text-sm backdrop-blur">
                <span className="font-medium">{component?.title}</span>
                <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Own the code</h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Components are copied into your project, not hidden in node_modules. Tweak a duration, swap a colour, rewrite the whole thing — it's yours.
          Prefer a package? It's on npm too.
        </p>
        <div className="mt-8 grid gap-4 text-start sm:grid-cols-3">
          {[
            ['Copy & paste', 'One CLI command adds the source, npm deps and keyframes.'],
            ['Typed props', 'Every prop documented with its type and default.'],
            ['Reduced motion', 'Looping animations respect prefers-reduced-motion.'],
          ].map(([title, body]) => (
            <div key={title} className="rounded-xl border bg-card p-5">
              <p className="font-medium">{title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
