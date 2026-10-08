import { Moon, Sun } from 'lucide-react'
import { themeStore, toggleTheme, useStore } from '../state'

export function ThemeToggle() {
  const theme = useStore(themeStore)
  return (
    <button
      type="button"
      className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={toggleTheme}
    >
      {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  )
}
