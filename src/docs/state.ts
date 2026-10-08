import { useSyncExternalStore } from 'react'

/** A tiny observable value — enough global state for the docs site. */
function createStore<T>(initial: T) {
  let value = initial
  const listeners = new Set<() => void>()
  return {
    get: () => value,
    set(next: T) {
      if (Object.is(next, value)) return
      value = next
      listeners.forEach((listener) => listener())
    },
    subscribe(listener: () => void) {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
  }
}

export type Store<T> = ReturnType<typeof createStore<T>>

export function useStore<T>(store: Store<T>): T {
  return useSyncExternalStore(store.subscribe, store.get, store.get)
}

const initialTheme =
  typeof document !== 'undefined' && document.documentElement.classList.contains('dark') ? 'dark' : 'light'

export const themeStore = createStore<'light' | 'dark'>(initialTheme)
themeStore.subscribe(() => {
  const value = themeStore.get()
  document.documentElement.classList.toggle('dark', value === 'dark')
  try {
    localStorage.setItem('theme', value)
  } catch {
    // Storage can be unavailable (private mode); the toggle still works for this visit.
  }
})

/** Components such as AnimatedThemeToggler flip the class directly — keep the header icon in sync. */
if (typeof MutationObserver !== 'undefined' && typeof document !== 'undefined') {
  new MutationObserver(() => {
    themeStore.set(document.documentElement.classList.contains('dark') ? 'dark' : 'light')
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
}

export function toggleTheme() {
  themeStore.set(themeStore.get() === 'dark' ? 'light' : 'dark')
}

export const commandMenuStore = createStore(false)
export const mobileNavStore = createStore(false)
