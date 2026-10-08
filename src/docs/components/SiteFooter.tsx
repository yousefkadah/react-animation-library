import { site } from '../site'

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:px-6">
        <p>
          Built by{' '}
          <a href="https://github.com/yousefkadah" className="font-medium underline underline-offset-4">
            Yousef Kadah
          </a>
          . Source on{' '}
          <a href={site.repository} className="font-medium underline underline-offset-4">
            GitHub
          </a>
          .
        </p>
        <p>
          Inspired by{' '}
          <a href="https://magicui.design" className="font-medium underline underline-offset-4">
            Magic UI
          </a>{' '}
          (MIT).
        </p>
      </div>
    </footer>
  )
}
