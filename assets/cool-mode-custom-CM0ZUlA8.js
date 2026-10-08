var e=`import { CoolMode } from "@/components/ui/cool-mode"

export default function CoolModeCustom() {
  return (
    <div className="relative justify-center">
      <CoolMode options={{ particle: "https://avatar.vercel.sh/react" }}>
        <button type="button" className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90">
          Click Me!
        </button>
      </CoolMode>
    </div>
  )
}
`;export{e as default};