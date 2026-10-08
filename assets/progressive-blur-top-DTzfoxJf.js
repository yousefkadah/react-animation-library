var e=`import { ProgressiveBlur } from "@/components/ui/progressive-blur"

const messages = [
  "Shipped the new onboarding flow",
  "Fixed the flaky checkout test",
  "Dark mode is live for everyone",
  "Cut bundle size by 18%",
  "Added keyboard shortcuts to search",
  "Moved image uploads to the edge",
  "Rewrote the billing emails",
  "Launched the public changelog",
  "Improved table virtualisation",
  "Localised the app into Hebrew",
]

export default function ProgressiveBlurTop() {
  return (
    <div className="relative h-[320px] w-full max-w-md overflow-hidden rounded-xl border bg-background">
      <ul className="h-full space-y-3 overflow-y-auto px-4 py-16">
        {messages.map((message, index) => (
          <li key={message} className="flex items-center gap-3 rounded-lg border bg-card p-3 text-sm">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
              {index + 1}
            </span>
            {message}
          </li>
        ))}
      </ul>
      <ProgressiveBlur position="top" height="25%" />
      <ProgressiveBlur position="bottom" height="25%" />
    </div>
  )
}
`;export{e as default};