var e=`import { ShinyButton } from "@/components/ui/shiny-button"

export default function ShinyButtonCustom() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <ShinyButton className="rounded-full px-8">Rounded</ShinyButton>
      {/* The shine is drawn with --primary, so a scoped override tints it. */}
      <ShinyButton className="border-violet-500/30 bg-violet-500/5 [--primary:#8b5cf6]">Violet shine</ShinyButton>
    </div>
  )
}
`;export{e as default};