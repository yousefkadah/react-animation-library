import { cn } from '@/lib/utils'

interface TabListProps<T extends string> {
  tabs: readonly T[]
  value: T
  onChange: (value: T) => void
  label?: string
  size?: 'sm' | 'md'
}

export function TabList<T extends string>({ tabs, value, onChange, label, size = 'md' }: TabListProps<T>) {
  return (
    <div role="tablist" aria-label={label} className="flex items-center gap-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          role="tab"
          aria-selected={value === tab}
          className={cn(
            'relative rounded-md font-medium transition-colors',
            size === 'sm' ? 'h-7 px-2.5 text-xs' : 'h-8 px-3 text-sm',
            value === tab ? 'bg-accent text-foreground' : 'text-muted-foreground hover:text-foreground',
          )}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
