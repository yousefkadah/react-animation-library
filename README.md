# React Magic UI

[![npm version](https://img.shields.io/npm/v/@yousefkadah/react-magic-ui.svg)](https://www.npmjs.com/package/@yousefkadah/react-magic-ui)
[![npm downloads](https://img.shields.io/npm/dm/@yousefkadah/react-magic-ui.svg)](https://www.npmjs.com/package/@yousefkadah/react-magic-ui)
[![license](https://img.shields.io/github/license/yousefkadah/react-animation-library.svg)](LICENSE)

**74 free and open-source animated components for React** — built with TypeScript, Tailwind CSS v4 and [Motion](https://motion.dev).
Copy them into your app with one command, or install the package from npm.

**[Documentation & live demos →](https://yousefkadah.github.io/react-animation-library/)**

Using Vue? The same catalogue — same names, same props — is available as
**[Vue Magic UI](https://github.com/yousefkadah/vue-animation-libarary)**.

## Why

- **Own the code.** Like shadcn/ui, components are copied into your project, so you can change anything.
- **One command.** `shadcn add` drops in the source, installs npm dependencies and adds the keyframes to your CSS.
- **Next.js ready.** Client components carry `"use client"`; random values are generated after mount, so server and client renders match.
- **Themed by default.** Components use the shadcn colour tokens and work in light and dark mode.
- **Accessible motion.** Looping animations respect `prefers-reduced-motion`; split text stays readable by screen readers.

## Install a component (recommended)

You need a React 18/19 project with Tailwind CSS v4 and [shadcn/ui](https://ui.shadcn.com/docs/installation) initialised. Then:

```bash
npx shadcn@latest add https://yousefkadah.github.io/react-animation-library/r/marquee.json
```

```tsx
import { Marquee } from "@/components/ui/marquee"

export function Logos() {
  return (
    <Marquee pauseOnHover>
      <span>React</span>
      <span>Next.js</span>
      <span>Vite</span>
    </Marquee>
  )
}
```

Add the registry once to `components.json` and use short names:

```json
{
  "registries": {
    "@magic-react": "https://yousefkadah.github.io/react-animation-library/r/{name}.json"
  }
}
```

```bash
npx shadcn@latest add @magic-react/border-beam @magic-react/number-ticker
```

## Or install from npm

```bash
npm install @yousefkadah/react-magic-ui
```

```css
/* app/globals.css */
@import "tailwindcss";
@import "@yousefkadah/react-magic-ui/theme.css";
@source "../node_modules/@yousefkadah/react-magic-ui/dist";
```

```tsx
import { BorderBeam, Marquee, NumberTicker } from "@yousefkadah/react-magic-ui"
```

## Components

**Components** — [Animated Circular Progress Bar](https://yousefkadah.github.io/react-animation-library/docs/components/animated-circular-progress-bar) · [Animated List](https://yousefkadah.github.io/react-animation-library/docs/components/animated-list) · [Avatar Circles](https://yousefkadah.github.io/react-animation-library/docs/components/avatar-circles) · [Bento Grid](https://yousefkadah.github.io/react-animation-library/docs/components/bento-grid) · [Code Comparison](https://yousefkadah.github.io/react-animation-library/docs/components/code-comparison) · [Dock](https://yousefkadah.github.io/react-animation-library/docs/components/dock) · [Dotted Map](https://yousefkadah.github.io/react-animation-library/docs/components/dotted-map) · [File Tree](https://yousefkadah.github.io/react-animation-library/docs/components/file-tree) · [Globe](https://yousefkadah.github.io/react-animation-library/docs/components/globe) · [Hero Video Dialog](https://yousefkadah.github.io/react-animation-library/docs/components/hero-video-dialog) · [Icon Cloud](https://yousefkadah.github.io/react-animation-library/docs/components/icon-cloud) · [Lens](https://yousefkadah.github.io/react-animation-library/docs/components/lens) · [Marquee](https://yousefkadah.github.io/react-animation-library/docs/components/marquee) · [Orbiting Circles](https://yousefkadah.github.io/react-animation-library/docs/components/orbiting-circles) · [Pointer](https://yousefkadah.github.io/react-animation-library/docs/components/pointer) · [Progressive Blur](https://yousefkadah.github.io/react-animation-library/docs/components/progressive-blur) · [Scroll Progress](https://yousefkadah.github.io/react-animation-library/docs/components/scroll-progress) · [Smooth Cursor](https://yousefkadah.github.io/react-animation-library/docs/components/smooth-cursor) · [Terminal](https://yousefkadah.github.io/react-animation-library/docs/components/terminal)

**Special Effects** — [Animated Beam](https://yousefkadah.github.io/react-animation-library/docs/components/animated-beam) · [Backlight](https://yousefkadah.github.io/react-animation-library/docs/components/backlight) · [Border Beam](https://yousefkadah.github.io/react-animation-library/docs/components/border-beam) · [Confetti](https://yousefkadah.github.io/react-animation-library/docs/components/confetti) · [Cool Mode](https://yousefkadah.github.io/react-animation-library/docs/components/cool-mode) · [Glare Hover](https://yousefkadah.github.io/react-animation-library/docs/components/glare-hover) · [Magic Card](https://yousefkadah.github.io/react-animation-library/docs/components/magic-card) · [Meteors](https://yousefkadah.github.io/react-animation-library/docs/components/meteors) · [Neon Gradient Card](https://yousefkadah.github.io/react-animation-library/docs/components/neon-gradient-card) · [Particles](https://yousefkadah.github.io/react-animation-library/docs/components/particles) · [Pixel Image](https://yousefkadah.github.io/react-animation-library/docs/components/pixel-image) · [Shine Border](https://yousefkadah.github.io/react-animation-library/docs/components/shine-border) · [Theme Toggler](https://yousefkadah.github.io/react-animation-library/docs/components/animated-theme-toggler) · [Warp Background](https://yousefkadah.github.io/react-animation-library/docs/components/warp-background)

**Animations** — [Blur Fade](https://yousefkadah.github.io/react-animation-library/docs/components/blur-fade)

**Text Animations** — [Animated Gradient Text](https://yousefkadah.github.io/react-animation-library/docs/components/animated-gradient-text) · [Animated Shiny Text](https://yousefkadah.github.io/react-animation-library/docs/components/animated-shiny-text) · [Aurora Text](https://yousefkadah.github.io/react-animation-library/docs/components/aurora-text) · [Comic Text](https://yousefkadah.github.io/react-animation-library/docs/components/comic-text) · [Dia Text Reveal](https://yousefkadah.github.io/react-animation-library/docs/components/dia-text-reveal) · [Highlighter](https://yousefkadah.github.io/react-animation-library/docs/components/highlighter) · [Hyper Text](https://yousefkadah.github.io/react-animation-library/docs/components/hyper-text) · [Kinetic Text](https://yousefkadah.github.io/react-animation-library/docs/components/kinetic-text) · [Line Shadow Text](https://yousefkadah.github.io/react-animation-library/docs/components/line-shadow-text) · [Morphing Text](https://yousefkadah.github.io/react-animation-library/docs/components/morphing-text) · [Number Ticker](https://yousefkadah.github.io/react-animation-library/docs/components/number-ticker) · [Scroll Based Velocity](https://yousefkadah.github.io/react-animation-library/docs/components/scroll-based-velocity) · [Sparkles Text](https://yousefkadah.github.io/react-animation-library/docs/components/sparkles-text) · [Spinning Text](https://yousefkadah.github.io/react-animation-library/docs/components/spinning-text) · [Text 3D Flip](https://yousefkadah.github.io/react-animation-library/docs/components/text-3d-flip) · [Text Animate](https://yousefkadah.github.io/react-animation-library/docs/components/text-animate) · [Text Reveal](https://yousefkadah.github.io/react-animation-library/docs/components/text-reveal) · [Typing Animation](https://yousefkadah.github.io/react-animation-library/docs/components/typing-animation) · [Video Text](https://yousefkadah.github.io/react-animation-library/docs/components/video-text) · [Word Rotate](https://yousefkadah.github.io/react-animation-library/docs/components/word-rotate)

**Buttons** — [Interactive Hover Button](https://yousefkadah.github.io/react-animation-library/docs/components/interactive-hover-button) · [Pulsating Button](https://yousefkadah.github.io/react-animation-library/docs/components/pulsating-button) · [Rainbow Button](https://yousefkadah.github.io/react-animation-library/docs/components/rainbow-button) · [Ripple Button](https://yousefkadah.github.io/react-animation-library/docs/components/ripple-button) · [Shimmer Button](https://yousefkadah.github.io/react-animation-library/docs/components/shimmer-button) · [Shiny Button](https://yousefkadah.github.io/react-animation-library/docs/components/shiny-button)

**Backgrounds** — [Animated Grid Pattern](https://yousefkadah.github.io/react-animation-library/docs/components/animated-grid-pattern) · [Dot Pattern](https://yousefkadah.github.io/react-animation-library/docs/components/dot-pattern) · [Flickering Grid](https://yousefkadah.github.io/react-animation-library/docs/components/flickering-grid) · [Grid Pattern](https://yousefkadah.github.io/react-animation-library/docs/components/grid-pattern) · [Hexagon Pattern](https://yousefkadah.github.io/react-animation-library/docs/components/hexagon-pattern) · [Interactive Grid Pattern](https://yousefkadah.github.io/react-animation-library/docs/components/interactive-grid-pattern) · [Light Rays](https://yousefkadah.github.io/react-animation-library/docs/components/light-rays) · [Noise Texture](https://yousefkadah.github.io/react-animation-library/docs/components/noise-texture) · [Retro Grid](https://yousefkadah.github.io/react-animation-library/docs/components/retro-grid) · [Ripple](https://yousefkadah.github.io/react-animation-library/docs/components/ripple) · [Striped Pattern](https://yousefkadah.github.io/react-animation-library/docs/components/striped-pattern)

**Device Mocks** — [Android](https://yousefkadah.github.io/react-animation-library/docs/components/android) · [Safari](https://yousefkadah.github.io/react-animation-library/docs/components/safari) · [iPhone](https://yousefkadah.github.io/react-animation-library/docs/components/iphone)
## Development

```bash
npm install
npm run dev        # docs site at http://localhost:5174
npm test           # renders every example and fails on any React error or warning
npm run build      # registry JSON + docs site + npm package
```

Adding a component? Read [CONTRIBUTING.md](CONTRIBUTING.md).

## Credits

Component designs and APIs follow [Magic UI](https://magicui.design) by the Magic UI team (MIT).
See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## License

[MIT](LICENSE) © Yousef Kadah
