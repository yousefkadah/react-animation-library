var e=`import { Meteors } from "@/components/ui/meteors"

export default function MeteorsDemo() {
  return (
    <div className="relative flex h-[350px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border">
      <Meteors number={30} />
      <span className="pointer-events-none bg-linear-to-b from-black to-gray-300/80 bg-clip-text text-center text-7xl leading-none font-semibold whitespace-pre-wrap text-transparent sm:text-8xl dark:from-white dark:to-slate-900/10">
        Meteors
      </span>
    </div>
  )
}
`;export{e as default};