#!/usr/bin/env node
/**
 * Bootstraps src/registry/meta/<slug>.json from the Vue library's meta.json so both
 * libraries document the same component the same way. Run, then hand-edit `usage`
 * (and anything React-specific). Usage:
 *   node scripts/meta-from-vue.mjs <path-to-vue-repo> <slug> [<slug> ...]
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const [vueRoot, ...slugs] = process.argv.slice(2)
if (!vueRoot || !slugs.length) {
  console.error('usage: node scripts/meta-from-vue.mjs <path-to-vue-repo> <slug> [<slug> ...]')
  process.exit(1)
}

const vueDep = { 'motion-v': 'motion', '@lucide/vue': 'lucide-react', '@vueuse/core': null }

for (const slug of slugs) {
  const source = join(vueRoot, 'src/registry/ui', slug, 'meta.json')
  const target = join('src/registry/meta', `${slug}.json`)
  if (!existsSync(source)) {
    console.error(`✖ ${slug}: ${source} not found`)
    continue
  }
  if (existsSync(target)) {
    console.error(`• ${slug}: ${target} already exists — skipped`)
    continue
  }
  const meta = JSON.parse(readFileSync(source, 'utf8'))
  meta.dependencies = (meta.dependencies ?? [])
    .map((dep) => (dep in vueDep ? vueDep[dep] : dep))
    .filter(Boolean)
  meta.usage = `import { ${meta.exports.join(', ')} } from "@/components/ui/${slug}"\n\n// TODO: React usage`
  meta.api = (meta.api ?? []).map((entry) => {
    const props = entry.props.map((prop) => (prop.name === 'class' ? { ...prop, name: 'className' } : prop))
    for (const slot of entry.slots ?? []) {
      const name = slot.name === 'default' ? 'children' : slot.name
      if (!props.some((prop) => prop.name === name)) {
        props.push({ name, type: 'React.ReactNode', description: slot.description })
      }
    }
    for (const emit of entry.emits ?? []) {
      const name = `on${emit.name.replace(/(^|[-:])(\w)/g, (_, __, c) => c.toUpperCase())}`
      if (!props.some((prop) => prop.name === name)) {
        props.push({ name, type: `(${emit.payload && emit.payload !== 'void' ? `value: ${emit.payload}` : ''}) => void`, description: emit.description })
      }
    }
    return { name: entry.name, props }
  })
  writeFileSync(target, `${JSON.stringify(meta, null, 2)}\n`)
  console.log(`✔ ${slug}: wrote ${target}`)
}
