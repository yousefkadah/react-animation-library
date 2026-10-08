import { Cloud, Database, FileText, Search, Settings, Sparkles, Terminal } from "lucide-react"

import { OrbitingCircles } from "@/components/ui/orbiting-circles"

export default function OrbitingCirclesIcons() {
  return (
    <div className="relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden">
      <span className="pointer-events-none bg-linear-to-b from-black to-gray-300/80 bg-clip-text text-center text-6xl leading-none font-semibold whitespace-pre-wrap text-transparent dark:from-white dark:to-slate-900/10">
        Circles
      </span>
      <OrbitingCircles iconSize={36} radius={150} className="border bg-background text-foreground shadow-sm">
        <FileText className="size-4" />
        <Settings className="size-4" />
        <Cloud className="size-4" />
        <Database className="size-4" />
      </OrbitingCircles>
      <OrbitingCircles iconSize={32} radius={90} reverse duration={15} className="border bg-background text-muted-foreground">
        <Search className="size-4" />
        <Terminal className="size-4" />
        <Sparkles className="size-4" />
      </OrbitingCircles>
    </div>
  )
}
