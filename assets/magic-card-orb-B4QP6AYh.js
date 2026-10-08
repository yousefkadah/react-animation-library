var e=`import { MagicCard } from "@/components/ui/magic-card"

export default function MagicCardOrb() {
  return (
    <div className="w-full max-w-sm rounded-xl">
      {/* Soft pastels in light mode, a vivid orb in dark mode. */}
      <MagicCard
        mode="orb"
        glowFrom="var(--orb-from)"
        glowTo="var(--orb-to)"
        className="[--orb-from:#E9D5FF] [--orb-to:#FBCFE8] dark:[--orb-from:#ee4f27] dark:[--orb-to:#6b21ef]"
      >
        <div className="flex items-center gap-3 border-b p-4">
          <img
            src="https://avatar.vercel.sh/ada"
            alt=""
            width={40}
            height={40}
            className="size-10 rounded-full border-2 border-background"
          />
          <div className="flex-1">
            <h3 className="leading-none font-semibold">Ada Park</h3>
            <p className="mt-1 text-sm text-muted-foreground">Frontend Developer</p>
          </div>
        </div>
        <div className="space-y-2 p-4">
          <p className="text-sm font-medium">Frontend developer focused on interactive UI &amp; performance</p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Passionate about visual presentation, currently exploring motion and micro-interactions.
          </p>
        </div>
        <div className="border-t p-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57L9 21.07c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22l-.01 3.29c0 .31.2.69.82.57A12 12 0 0 0 12 .3"
              />
            </svg>
            View on GitHub
          </a>
        </div>
      </MagicCard>
    </div>
  )
}
`;export{e as default};