var e=`import { BlurFade } from "@/components/ui/blur-fade"

export default function BlurFadeText() {
  return (
    <section>
      <BlurFade delay={0.25} inView>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Hello World 👋</h2>
      </BlurFade>
      <BlurFade delay={0.5} inView>
        <span className="text-xl tracking-tighter text-pretty sm:text-3xl xl:text-4xl/none">Nice to meet you</span>
      </BlurFade>
    </section>
  )
}
`;export{e as default};