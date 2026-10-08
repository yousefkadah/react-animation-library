# Contributing

Every component lives in the **registry** (`src/registry`). The docs site, the shadcn-vue
registry JSON, the npm entry and the animation theme are all generated from it.

```
src/registry/
  ui/<slug>.tsx           # the component(s) — one file per slug, named exports
  meta/<slug>.json        # docs + registry metadata (see below)
  examples/
    <slug>-demo.tsx       # first example = the hero preview on the docs page (default export)
    <slug>-<variant>.tsx  # further examples
```

Run `npm run dev` for the docs site. `scripts/build-registry.mjs` runs first and validates every
meta file; it regenerates `registry.json`, `src/index.ts`, `src/styles/theme.generated.css`
and `public/llms.txt` — never edit those by hand.

## Component rules

- Function components with named exports and an exported `XProps` interface (extend
  `ComponentPropsWithoutRef<"div">` etc. when the component renders a native element, and spread
  the rest onto it). Default values in the parameter list.
- Accept `className` and merge it on the root (or the element the user will most want to style)
  with `cn()` from `@/lib/utils`.
- Add `"use client"` as the first line when the file uses hooks, browser APIs or `motion/react`
  (Next.js App Router).
- **Tailwind v4 utilities only** — no CSS files, no `<style>` tags. Keyframes go in the meta file
  (`cssVars.theme` for the `animate-*` utility, `css` for the `@keyframes`); use names that won't
  collide. Tailwind v4 syntax: `bg-linear-to-r`, `from-(--my-var)`, `border-(length:--w)`, `[mask-image:…]`.
- Colours: use the shadcn tokens (`bg-background`, `text-foreground`, `text-muted-foreground`,
  `border-border`, `bg-primary`, …) so components theme automatically; hard-code a colour only when it
  *is* the effect (and expose it as a prop). Check light **and** dark (`dark:` variant).
- Motion: `import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from "motion/react"`.
  CSS keyframes are preferred for simple infinite loops (cheaper, no JS).
- Allowed dependencies: `motion`, `lucide-react`, `cobe`, `canvas-confetti`, `rough-notation`.
  Ask before adding anything else.
- SSR-safe: never touch `window`/`document` during render — use `useEffect`. Clean up listeners,
  `requestAnimationFrame`s, observers and timers in the effect cleanup. Random values (positions,
  delays) are generated in an effect, not during render, to avoid hydration mismatches.
- Respect reduced motion for anything that loops forever (`motion-reduce:` variants or
  `useReducedMotion()`).
- Accessibility: decorative layers get `aria-hidden` and `pointer-events-none`; text that is split
  into animated spans keeps the full string available to assistive tech (`sr-only` copy or `aria-label`).
- API parity: same component names, prop names and defaults as [Magic UI](https://magicui.design/docs/components)
  **and** as the Vue library ([Vue Magic UI](https://github.com/yousefkadah/vue-animation-libarary)).

## `meta.json`

```json
{
  "name": "border-beam",
  "title": "Border Beam",
  "description": "One sentence, shown under the title and in search.",
  "category": "special-effects",
  "exports": ["BorderBeam"],
  "dependencies": ["motion-v"],
  "registryDependencies": [],
  "cssVars": { "theme": { "animate-x": "x 3s linear infinite" } },
  "css": { "@keyframes x": { "to": { "transform": "rotate(360deg)" } } },
  "usage": "import { BorderBeam } from \"@/components/ui/border-beam\"\n\n…",
  "examples": [{ "name": "border-beam-demo", "title": "Login card" }],
  "api": [
    {
      "name": "BorderBeam",
      "props": [{ "name": "size", "type": "number", "default": "50", "description": "…" }]
    }
  ]
}
```

Categories: `components`, `special-effects`, `animations`, `text-animations`, `buttons`,
`backgrounds`, `device-mocks`. `registryDependencies` lists other slugs from this registry.

## Examples

- Import components the way a user would: `import { Marquee } from "@/components/ui/marquee"`, and
  `export default` the demo component.
- They render centred in a ~350px-tall preview box — make them look good there, in light and dark.
- Self-contained: no network calls besides images (`picsum.photos`, `avatar.vercel.sh`,
  `images.unsplash.com`).

## Checks

```bash
node scripts/build-registry.mjs --check <slug>   # validates one component's meta file
node scripts/build-registry.mjs --strict         # validates everything + regenerates artifacts
npx tsc --noEmit                  # types
npx vitest run -t "<slug>"        # every example renders with no React errors or warnings
```
