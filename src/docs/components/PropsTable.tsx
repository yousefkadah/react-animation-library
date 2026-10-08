import type { ApiDoc } from '../catalog'

export function PropsTable({ api }: { api: ApiDoc[] }) {
  return (
    <div className="flex flex-col gap-8">
      {api.map((entry) => (
        <section key={entry.name} className="flex flex-col gap-3">
          {api.length > 1 && <h3 className="font-mono text-base font-semibold">{entry.name}</h3>}
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="px-4 py-2.5 text-start font-medium">Prop</th>
                  <th className="px-4 py-2.5 text-start font-medium">Type</th>
                  <th className="px-4 py-2.5 text-start font-medium">Default</th>
                  <th className="px-4 py-2.5 text-start font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {entry.props.map((prop) => (
                  <tr key={prop.name} className="border-b last:border-0">
                    <td className="px-4 py-2.5 align-top">
                      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs whitespace-nowrap">
                        {prop.name}
                        {prop.required && <span className="text-destructive">*</span>}
                      </code>
                    </td>
                    <td className="px-4 py-2.5 align-top font-mono text-xs text-muted-foreground">{prop.type}</td>
                    <td className="px-4 py-2.5 align-top font-mono text-xs whitespace-nowrap text-muted-foreground">{prop.default ?? '—'}</td>
                    <td className="px-4 py-2.5 align-top text-muted-foreground">{prop.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  )
}
