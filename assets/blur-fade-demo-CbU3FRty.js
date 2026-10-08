var e=`import { BlurFade } from "@/components/ui/blur-fade"

const images = Array.from({ length: 9 }, (_, index) => {
  const landscape = index % 2 === 0
  return \`https://picsum.photos/seed/\${index + 1}/\${landscape ? 800 : 600}/\${landscape ? 600 : 800}\`
})

export default function BlurFadeDemo() {
  return (
    <section className="w-full columns-2 gap-4 sm:columns-3">
      {images.map((image, index) => (
        <BlurFade key={image} delay={0.25 + index * 0.05} inView>
          <img className="mb-4 size-full rounded-lg object-contain" src={image} alt={\`Random stock image \${index + 1}\`} />
        </BlurFade>
      ))}
    </section>
  )
}
`;export{e as default};