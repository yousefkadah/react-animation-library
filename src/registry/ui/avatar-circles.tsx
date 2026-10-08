import { cn } from "@/lib/utils"

export interface AvatarCircleItem {
  imageUrl: string
  profileUrl: string
}

export interface AvatarCirclesProps {
  className?: string
  /** Number shown in the last circle, e.g. `99` renders “+99”. Hidden when 0 or omitted. */
  numPeople?: number
  avatarUrls: AvatarCircleItem[]
}

export function AvatarCircles({ numPeople, className, avatarUrls }: AvatarCirclesProps) {
  return (
    <div className={cn("z-10 flex -space-x-4 rtl:space-x-reverse", className)}>
      {avatarUrls.map((url, index) => (
        <a
          key={index}
          href={url.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full transition-transform hover:z-10 hover:-translate-y-0.5 focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <img
            className="size-10 rounded-full border-2 border-background bg-muted"
            src={url.imageUrl}
            width={40}
            height={40}
            alt={`Avatar ${index + 1}`}
          />
        </a>
      ))}
      {(numPeople ?? 0) > 0 && (
        <span
          className="flex size-10 items-center justify-center rounded-full border-2 border-background bg-foreground text-center text-xs font-medium text-background"
          aria-label={`${numPeople} more`}
        >
          +{numPeople}
        </span>
      )}
    </div>
  )
}
