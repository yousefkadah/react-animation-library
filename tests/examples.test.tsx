import { act, cleanup, render } from '@testing-library/react'
import type { ComponentType } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

/**
 * Smoke test: every example (and therefore every component) renders, and unmounts
 * without throwing or logging a React error/warning.
 * Run one component's examples with: npx vitest run -t "border-beam"
 */
const examples = import.meta.glob<{ default: ComponentType }>('../src/registry/examples/*.tsx')
const metaSources = import.meta.glob<string>('../src/registry/meta/*.json', {
  eager: true,
  query: '?raw',
  import: 'default',
})

type Meta = { name: string; examples: { name: string }[] }
const metas: Record<string, Meta> = {}
for (const [path, source] of Object.entries(metaSources)) {
  const slug = path.split('/').at(-1)!.replace('.json', '')
  try {
    metas[path] = JSON.parse(source) as Meta
  } catch {
    metas[path] = { name: slug, examples: [{ name: `${slug} (meta is invalid JSON)` }] }
  }
}

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('registry', () => {
  it('every example file is listed in a meta file', () => {
    const listed = new Set(Object.values(metas).flatMap((meta) => meta.examples.map((example) => example.name)))
    const files = Object.keys(examples).map((path) => path.split('/').pop()!.replace('.tsx', ''))
    expect(files.filter((file) => !listed.has(file))).toEqual([])
  })
})

for (const meta of Object.values(metas)) {
  describe(meta.name, () => {
    for (const example of meta.examples) {
      it(`${example.name} renders without errors`, async () => {
        const problems: unknown[][] = []
        vi.spyOn(console, 'error').mockImplementation((...args) => problems.push(args))
        vi.spyOn(console, 'warn').mockImplementation((...args) => problems.push(args))
        const loader = examples[`../src/registry/examples/${example.name}.tsx`]
        expect(loader, `missing example file ${example.name}.tsx`).toBeTypeOf('function')
        const { default: Example } = await loader()
        let view: ReturnType<typeof render> | undefined
        await act(async () => {
          view = render(<Example />)
          await new Promise((resolve) => setTimeout(resolve, 50))
        })
        expect(problems.map((args) => args.map(String).join(' '))).toEqual([])
        expect(view!.container.innerHTML.length).toBeGreaterThan(0)
        view!.unmount()
      })
    }
  })
}
