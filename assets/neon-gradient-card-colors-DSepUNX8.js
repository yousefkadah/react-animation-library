var e=`import { NeonGradientCard } from "@/components/ui/neon-gradient-card"

export default function NeonGradientCardColors() {
  return (
    <NeonGradientCard
      borderSize={3}
      borderRadius={28}
      neonColors={{ firstColor: "#f97316", secondColor: "#8b5cf6" }}
      className="w-full max-w-xs"
    >
      <div className="flex flex-col gap-3">
        <span className="w-fit rounded-full bg-orange-500/10 px-2.5 py-0.5 text-xs font-medium text-orange-600 dark:text-orange-400">
          Launch week
        </span>
        <h3 className="text-xl font-semibold tracking-tight">Ship your next idea tonight</h3>
        <p className="text-sm text-muted-foreground">
          Copy a component, tweak two props and watch it glow. Every colour is a prop away.
        </p>
        <button className="mt-2 h-9 w-full rounded-lg bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Get started
        </button>
      </div>
    </NeonGradientCard>
  )
}
`;export{e as default};