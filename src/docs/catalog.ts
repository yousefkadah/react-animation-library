import type { ComponentType } from 'react'

export interface PropDoc {
  name: string
  type: string
  default?: string
  required?: boolean
  description: string
}

export interface ApiDoc {
  name: string
  props: PropDoc[]
}

export interface ExampleDoc {
  name: string
  title: string
  description?: string
}

export interface ComponentMeta {
  name: string
  title: string
  description: string
  category: CategoryId
  exports: string[]
  dependencies?: string[]
  registryDependencies?: string[]
  cssVars?: { theme?: Record<string, string> }
  css?: Record<string, unknown>
  usage?: string
  examples: ExampleDoc[]
  api?: ApiDoc[]
  credit?: string
  isNew?: boolean
}

export const categories = [
  { id: 'components', title: 'Components' },
  { id: 'special-effects', title: 'Special Effects' },
  { id: 'animations', title: 'Animations' },
  { id: 'text-animations', title: 'Text Animations' },
  { id: 'buttons', title: 'Buttons' },
  { id: 'backgrounds', title: 'Backgrounds' },
  { id: 'device-mocks', title: 'Device Mocks' },
] as const

export type CategoryId = (typeof categories)[number]['id']

const metaSources = import.meta.glob<string>('../registry/meta/*.json', {
  eager: true,
  query: '?raw',
  import: 'default',
})

/** Parsed leniently so one half-written meta file doesn't take the whole site down. */
function parseMeta(path: string, source: string): ComponentMeta | null {
  try {
    const meta = JSON.parse(source) as ComponentMeta
    return meta.name && meta.title && meta.category && meta.examples?.length ? meta : null
  } catch (error) {
    console.warn(`[catalog] skipping ${path}:`, error)
    return null
  }
}

export const components: ComponentMeta[] = Object.entries(metaSources)
  .map(([path, source]) => parseMeta(path, source))
  .filter((meta): meta is ComponentMeta => meta !== null)
  .sort((a, b) => a.title.localeCompare(b.title))

/** Components in sidebar order: grouped by category, alphabetical inside each group. */
export const orderedComponents: ComponentMeta[] = categories.flatMap((category) =>
  components.filter((component) => component.category === category.id),
)

export const groupedComponents = categories
  .map((category) => ({
    ...category,
    items: components.filter((component) => component.category === category.id),
  }))
  .filter((group) => group.items.length > 0)

export function findComponent(slug: string): ComponentMeta | undefined {
  return components.find((component) => component.name === slug)
}

export function neighbours(slug: string) {
  const index = orderedComponents.findIndex((component) => component.name === slug)
  return {
    previous: index > 0 ? orderedComponents[index - 1] : undefined,
    next: index >= 0 && index < orderedComponents.length - 1 ? orderedComponents[index + 1] : undefined,
  }
}

const exampleModules = import.meta.glob<{ default: ComponentType }>('../registry/examples/*.tsx')
const exampleSources = import.meta.glob<string>('../registry/examples/*.tsx', { query: '?raw', import: 'default' })
const componentSources = import.meta.glob<string>('../registry/ui/*.tsx', { query: '?raw', import: 'default' })

export function exampleLoader(name: string): (() => Promise<{ default: ComponentType }>) | undefined {
  return exampleModules[`../registry/examples/${name}.tsx`]
}

export function loadExampleSource(name: string): Promise<string> {
  const loader = exampleSources[`../registry/examples/${name}.tsx`]
  return loader ? loader() : Promise.resolve('')
}

export async function loadComponentFiles(slug: string): Promise<{ path: string; code: string }[]> {
  const loader = componentSources[`../registry/ui/${slug}.tsx`]
  return loader ? [{ path: `components/ui/${slug}.tsx`, code: await loader() }] : []
}

export function exampleNames(): string[] {
  return Object.keys(exampleModules).map((path) => path.replace('../registry/examples/', '').replace('.tsx', ''))
}

/** Renders the meta.css object back into CSS text for the manual-install instructions. */
export function renderCss(meta: ComponentMeta): string {
  const lines: string[] = []
  const theme = meta.cssVars?.theme
  if (theme && Object.keys(theme).length) {
    lines.push('@theme inline {')
    for (const [key, value] of Object.entries(theme)) lines.push(`  --${key}: ${value};`)
    lines.push('}')
  }
  const render = (selector: string, body: unknown, depth: number) => {
    const pad = '  '.repeat(depth)
    if (typeof body === 'string') {
      lines.push(`${pad}${selector}: ${body};`)
      return
    }
    lines.push(`${pad}${selector} {`)
    for (const [key, value] of Object.entries(body as Record<string, unknown>)) render(key, value, depth + 1)
    lines.push(`${pad}}`)
  }
  for (const [selector, body] of Object.entries(meta.css ?? {})) {
    if (lines.length) lines.push('')
    render(selector, body, 0)
  }
  return lines.join('\n')
}
