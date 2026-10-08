var e=`import { Marquee } from "@/components/ui/marquee"

const logos = ["React", "Next.js", "Vite", "Remix", "Vitest", "Zustand", "Tailwind", "Motion"]

export default function MarqueeLogos() {
  return (
    <div className="relative w-full overflow-hidden py-6">
      <p className="mb-6 text-center text-sm font-medium text-muted-foreground">Trusted by teams building with</p>
      <Marquee pauseOnHover gap="3rem" duration="25s">
        {logos.map((logo) => (
          <span key={logo} className="text-2xl font-semibold tracking-tight text-foreground/60 transition-colors hover:text-foreground">
            {logo}
          </span>
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-linear-to-r from-background" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-linear-to-l from-background" />
    </div>
  )
}
`;export{e as default};