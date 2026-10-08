#!/usr/bin/env node
/**
 * Single source of truth → every generated artifact.
 *
 * Reads src/registry/meta/<slug>.json (component: src/registry/ui/<slug>.tsx) and writes:
 *   - registry.json                    (input for `shadcn build`, which emits public/r/*.json)
 *   - src/index.ts                     (npm entry: re-exports every component)
 *   - src/styles/theme.generated.css   (keyframes + animate-* utilities, shipped as dist/theme.css)
 *   - public/llms.txt                  (machine-readable component index)
 *
 * Fails loudly on a malformed meta file, a missing example, or a duplicate export name.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const CONFIG = {
  framework: 'react',
  name: 'react-magic-ui',
  title: 'React Magic UI',
  homepage: 'https://yousefkadah.github.io/react-animation-library',
  schema: 'https://ui.shadcn.com/schema/registry.json',
  itemSchema: 'https://ui.shadcn.com/schema/registry-item.json',
  exampleExtension: '.tsx',
}

const CATEGORIES = [
  'components',
  'special-effects',
  'animations',
  'text-animations',
  'buttons',
  'backgrounds',
  'device-mocks',
]

const args = process.argv.slice(2)
/** `--strict`: any invalid component fails the run (CI, build, publish). */
const strict = args.includes('--strict')
/** `--check a,b`: validate only these slugs, write nothing, exit non-zero on their errors. */
const checkIndex = args.indexOf('--check')
const checkOnly = checkIndex >= 0 ? (args[checkIndex + 1] ?? '').split(',').filter(Boolean) : null

const root = process.cwd()
const uiDir = join(root, 'src/registry/ui')
const examplesDir = join(root, 'src/registry/examples')
const errors = []
const invalidSlugs = new Set()
const fail = (slug, message) => {
  errors.push(`${slug}: ${message}`)
  if (slug) invalidSlugs.add(slug)
}

const metaDir = join(root, 'src/registry/meta')
const allSlugs = readdirSync(metaDir)
  .filter((file) => file.endsWith('.json'))
  .map((file) => file.replace(/\.json$/, ''))
  .sort()
const slugs = checkOnly ? allSlugs.filter((slug) => checkOnly.includes(slug)) : allSlugs

let metas = slugs.map((slug) => {
  const metaPath = join(metaDir, `${slug}.json`)
  let meta
  try {
    meta = JSON.parse(readFileSync(metaPath, 'utf8'))
  } catch (error) {
    fail(slug, `meta.json is not valid JSON (${error.message})`)
    return null
  }
  if (meta.name !== slug) fail(slug, `meta.name must equal the folder name`)
  for (const field of ['title', 'description', 'category']) {
    if (!meta[field]) fail(slug, `meta.${field} is required`)
  }
  if (!CATEGORIES.includes(meta.category)) {
    fail(slug, `unknown category "${meta.category}" (use one of ${CATEGORIES.join(', ')})`)
  }
  if (!Array.isArray(meta.exports) || meta.exports.length === 0) {
    fail(slug, `meta.exports must list the exported component names`)
  }
  if (!Array.isArray(meta.examples) || meta.examples.length === 0) {
    fail(slug, `meta.examples needs at least one example`)
  }
  for (const example of meta.examples ?? []) {
    const file = join(examplesDir, `${example.name}${CONFIG.exampleExtension}`)
    if (!existsSync(file)) fail(slug, `example file ${example.name}${CONFIG.exampleExtension} not found`)
  }
  if (!existsSync(join(uiDir, `${slug}.tsx`))) fail(slug, `component file src/registry/ui/${slug}.tsx not found`)
  return meta
}).filter(Boolean)

const exportOwners = new Map()
const themeOwners = new Map()
const cssOwners = new Map()
for (const meta of metas) {
  for (const name of meta.exports ?? []) {
    if (exportOwners.has(name)) fail(meta.name, `export "${name}" is also declared by ${exportOwners.get(name)}`)
    exportOwners.set(name, meta.name)
  }
  for (const [key, value] of Object.entries(meta.cssVars?.theme ?? {})) {
    const owner = themeOwners.get(key)
    if (owner && owner.value !== value) fail(meta.name, `--${key} is also defined (differently) by ${owner.slug}`)
    else themeOwners.set(key, { slug: meta.name, value })
  }
  for (const [selector, body] of Object.entries(meta.css ?? {})) {
    const owner = cssOwners.get(selector)
    const serialized = JSON.stringify(body)
    if (owner && owner.value !== serialized) fail(meta.name, `"${selector}" is also defined (differently) by ${owner.slug} — rename it`)
    else cssOwners.set(selector, { slug: meta.name, value: serialized })
  }
  for (const dep of meta.registryDependencies ?? []) {
    if (!allSlugs.includes(dep)) fail(meta.name, `registryDependency "${dep}" is not a component in this registry`)
  }
}

if (checkOnly) {
  if (checkOnly.some((slug) => !allSlugs.includes(slug))) errors.push(`unknown slug in --check: ${checkOnly.join(', ')}`)
  if (errors.length) {
    console.error(`\n✖ Invalid:\n  - ${errors.join('\n  - ')}\n`)
    process.exit(1)
  }
  console.log(`✔ ${checkOnly.join(', ')} valid`)
  process.exit(0)
}

if (errors.length) {
  console[strict ? 'error' : 'warn'](`\n${strict ? '✖' : '⚠'} Registry problems${strict ? '' : ' (skipped these components)'}:\n  - ${errors.join('\n  - ')}\n`)
  if (strict) process.exit(1)
  metas = metas.filter((meta) => !invalidSlugs.has(meta.name))
}

const itemUrl = (name) => `${CONFIG.homepage}/r/${name}.json`

const items = []
for (const meta of metas) {
  items.push(clean({
    name: meta.name,
    type: 'registry:ui',
    title: meta.title,
    description: meta.description,
    dependencies: meta.dependencies,
    registryDependencies: ['utils', ...(meta.registryDependencies ?? []).map(itemUrl)],
    files: [{ path: `src/registry/ui/${meta.name}.tsx`, type: 'registry:ui' }],
    cssVars: meta.cssVars,
    css: meta.css,
    categories: [meta.category],
  }))
  for (const example of meta.examples) {
    items.push({
      name: example.name,
      type: 'registry:example',
      title: `${meta.title} — ${example.title}`,
      registryDependencies: [itemUrl(meta.name)],
      files: [{ path: `src/registry/examples/${example.name}${CONFIG.exampleExtension}`, type: 'registry:example' }],
    })
  }
}

writeJson('registry.json', {
  $schema: CONFIG.schema,
  name: CONFIG.name,
  homepage: CONFIG.homepage,
  items,
})

// npm entry
const banner = '// Generated by scripts/build-registry.mjs — do not edit by hand.\n'
writeFileSync(
  join(root, 'src/index.ts'),
  `${banner}export { cn } from './lib/utils'\n${metas.map((meta) => `export * from './registry/ui/${meta.name}'`).join('\n')}\n`,
)

// Theme: one @theme block with every animate-* utility and its keyframes.
const themeLines = []
const keyframeBlocks = []
const seenKeyframes = new Set()
for (const meta of metas) {
  for (const [key, value] of Object.entries(meta.cssVars?.theme ?? {})) {
    themeLines.push(`  --${key}: ${value};`)
  }
  for (const [selector, body] of Object.entries(meta.css ?? {})) {
    if (seenKeyframes.has(selector)) continue
    seenKeyframes.add(selector)
    keyframeBlocks.push(renderCss(selector, body, 1))
  }
}
writeFileSync(
  join(root, 'src/styles/theme.generated.css'),
  `/* Generated by scripts/build-registry.mjs — do not edit by hand.\n * Import once in your Tailwind entry CSS: @import "@yousefkadah/${CONFIG.name}/theme.css"; */\n@theme inline {\n${[...new Set(themeLines)].join('\n')}\n${keyframeBlocks.join('\n')}\n}\n`,
)

// llms.txt
const byCategory = CATEGORIES.map((category) => ({
  category,
  items: metas.filter((meta) => meta.category === category),
})).filter((group) => group.items.length)
writeFileSync(
  join(root, 'public/llms.txt'),
  `# ${CONFIG.title}\n\n> Animated, copy-paste components for ${CONFIG.framework === 'vue' ? 'Vue 3' : 'React'} built with Tailwind CSS and Motion.\n\n` +
    byCategory
      .map(({ category, items: list }) =>
        `## ${category}\n\n${list.map((meta) => `- [${meta.title}](${CONFIG.homepage}/docs/components/${meta.name}): ${meta.description} Registry: ${itemUrl(meta.name)}`).join('\n')}`,
      )
      .join('\n\n') + '\n',
)

console.log(`✔ Registry: ${metas.length} components, ${items.length - metas.length} examples`)

function writeJson(path, value) {
  writeFileSync(join(root, path), `${JSON.stringify(value, null, 2)}\n`)
}

function clean(object) {
  return Object.fromEntries(
    Object.entries(object).filter(([, value]) => value !== undefined && !(Array.isArray(value) && value.length === 0)),
  )
}

function renderCss(selector, body, depth) {
  const pad = '  '.repeat(depth)
  if (typeof body === 'string') return `${pad}${selector}: ${body};`
  const inner = Object.entries(body).map(([key, value]) => renderCss(key, value, depth + 1)).join('\n')
  return `${pad}${selector} {\n${inner}\n${pad}}`
}
