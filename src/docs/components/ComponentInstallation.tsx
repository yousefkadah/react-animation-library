import { useEffect, useState, type ReactNode } from 'react'
import { loadComponentFiles, renderCss, type ComponentMeta } from '../catalog'
import { installCommand, packageManagers, runCommand, site, type PackageManager } from '../site'
import { CodeBlock } from './CodeBlock'
import { TabList } from './TabList'

const stepClass =
  'relative [counter-increment:step] before:absolute before:-start-[2.6rem] before:flex before:size-7 before:items-center before:justify-center before:rounded-full before:border before:bg-background before:font-mono before:text-xs before:content-[counter(step)]'

export function CommandTabs({ manager, onManager, children }: { manager: PackageManager; onManager: (value: PackageManager) => void; children: ReactNode }) {
  return (
    <div className="rounded-xl border">
      <div className="flex items-center border-b px-2 py-1.5">
        <TabList value={manager} onChange={onManager} tabs={packageManagers} label="Package manager" size="sm" />
      </div>
      <div className="[&>div]:rounded-none [&>div]:border-0">{children}</div>
    </div>
  )
}

export function ComponentInstallation({ component }: { component: ComponentMeta }) {
  const [mode, setMode] = useState<'CLI' | 'Manual' | 'npm'>('CLI')
  const [manager, setManager] = useState<PackageManager>('pnpm')
  const [files, setFiles] = useState<{ path: string; code: string }[]>([])

  useEffect(() => {
    loadComponentFiles(component.name).then(setFiles)
  }, [component.name])

  const dependencies = ['clsx', 'tailwind-merge', ...(component.dependencies ?? [])]
  const css = renderCss(component)
  const npmCss = `@import "tailwindcss";
@import "${site.npmPackage}/theme.css";

/* Let Tailwind see the classes used inside the package */
@source "../node_modules/${site.npmPackage}/dist";`

  return (
    <div className="flex flex-col gap-3">
      <TabList value={mode} onChange={setMode} tabs={['CLI', 'Manual', 'npm'] as const} label="Installation method" />

      {mode === 'CLI' && (
        <CommandTabs manager={manager} onManager={setManager}>
          <CodeBlock code={runCommand(manager, `${site.cli} add ${site.registryUrl}/${component.name}.json`)} lang="bash" />
        </CommandTabs>
      )}

      {mode === 'Manual' && (
        <ol className="relative ms-3 flex flex-col gap-8 border-s ps-7 [counter-reset:step]">
          <li className={stepClass}>
            <h4 className="mb-3 font-medium">Install the following dependencies:</h4>
            <CommandTabs manager={manager} onManager={setManager}>
              <CodeBlock code={installCommand(manager, dependencies)} lang="bash" />
            </CommandTabs>
          </li>
          <li className={stepClass}>
            <h4 className="mb-3 font-medium">
              Make sure you have the <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">cn</code> helper:
            </h4>
            <CodeBlock
              filename="lib/utils.ts"
              lang="ts"
              code={`import { type ClassValue, clsx } from "clsx"\nimport { twMerge } from "tailwind-merge"\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs))\n}`}
            />
          </li>
          <li className={stepClass}>
            <h4 className="mb-3 font-medium">Copy and paste the following code into your project:</h4>
            <div className="flex flex-col gap-3">
              {files.map((file) => (
                <CodeBlock key={file.path} filename={file.path} code={file.code} lang="tsx" collapsible />
              ))}
            </div>
          </li>
          {css && (
            <li className={stepClass}>
              <h4 className="mb-3 font-medium">Add the animation to your global CSS:</h4>
              <CodeBlock filename="app/globals.css" code={css} lang="css" collapsible />
            </li>
          )}
          <li className={stepClass}>
            <h4 className="font-medium">Update the import paths to match your project setup.</h4>
          </li>
        </ol>
      )}

      {mode === 'npm' && (
        <div className="flex flex-col gap-3">
          <CommandTabs manager={manager} onManager={setManager}>
            <CodeBlock code={installCommand(manager, [site.npmPackage])} lang="bash" />
          </CommandTabs>
          <CodeBlock filename="app/globals.css" code={npmCss} lang="css" />
          <CodeBlock code={`import { ${component.exports.join(', ')} } from "${site.npmPackage}"`} lang="ts" />
        </div>
      )}
    </div>
  )
}
