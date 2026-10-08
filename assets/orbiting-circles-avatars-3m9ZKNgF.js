var e=`import { OrbitingCircles } from "@/components/ui/orbiting-circles"

const outer = ["jack", "jill", "john", "jane", "jenny", "james"]
const inner = ["jade", "jules", "joe"]

export default function OrbitingCirclesAvatars() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden">
      <div className="z-10 flex size-16 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-lg">
        Team
      </div>
      <OrbitingCircles iconSize={44} radius={150} duration={30}>
        {outer.map((name) => (
          <img
            key={name}
            src={\`https://avatar.vercel.sh/\${name}\`}
            alt={name}
            className="size-full rounded-full border-2 border-background shadow-md"
          />
        ))}
      </OrbitingCircles>
      <OrbitingCircles iconSize={36} radius={85} duration={20} reverse>
        {inner.map((name) => (
          <img
            key={name}
            src={\`https://avatar.vercel.sh/\${name}\`}
            alt={name}
            className="size-full rounded-full border-2 border-background shadow-md"
          />
        ))}
      </OrbitingCircles>
    </div>
  )
}
`;export{e as default};