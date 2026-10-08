var e=`import { NoiseTexture } from "@/components/ui/noise-texture"

export default function NoiseTextureDemo() {
  return (
    <div className="relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-neutral-100/80 dark:bg-neutral-950">
      <NoiseTexture className="absolute inset-0 [mask-image:radial-gradient(420px_circle_at_center,white,transparent)]" />
    </div>
  )
}
`;export{e as default};