import type { HighlighterCore } from 'shiki/core'

export type CodeLanguage = 'vue' | 'tsx' | 'ts' | 'bash' | 'css' | 'json'

let highlighter: Promise<HighlighterCore> | undefined

function getHighlighter(): Promise<HighlighterCore> {
  highlighter ??= (async () => {
    const [{ createHighlighterCore }, { createJavaScriptRegexEngine }] = await Promise.all([
      import('shiki/core'),
      import('shiki/engine/javascript'),
    ])
    return createHighlighterCore({
      themes: [import('shiki/themes/github-light-default.mjs'), import('shiki/themes/github-dark-default.mjs')],
      langs: [
        import('shiki/langs/vue.mjs'),
        import('shiki/langs/tsx.mjs'),
        import('shiki/langs/typescript.mjs'),
        import('shiki/langs/bash.mjs'),
        import('shiki/langs/css.mjs'),
        import('shiki/langs/json.mjs'),
      ],
      engine: createJavaScriptRegexEngine(),
    })
  })()
  return highlighter
}

const cache = new Map<string, string>()

export async function highlight(code: string, lang: CodeLanguage): Promise<string> {
  const key = `${lang}\u0000${code}`
  const cached = cache.get(key)
  if (cached) return cached
  const shiki = await getHighlighter()
  const html = shiki.codeToHtml(code, {
    lang: lang === 'ts' ? 'typescript' : lang,
    themes: { light: 'github-light-default', dark: 'github-dark-default' },
    defaultColor: false,
  })
  cache.set(key, html)
  return html
}
