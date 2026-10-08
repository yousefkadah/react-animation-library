var e=`import { Star } from "lucide-react"

import { AvatarCircles } from "@/components/ui/avatar-circles"

const avatars = ["ava", "liam", "noah", "emma", "mia"].map((name) => ({
  imageUrl: \`https://avatar.vercel.sh/\${name}\`,
  profileUrl: "#",
}))

export default function AvatarCirclesSocialProof() {
  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
      <AvatarCircles numPeople={2400} avatarUrls={avatars} className="[&_span]:w-auto [&_span]:px-2" />
      <div className="flex flex-col items-center sm:items-start">
        <div className="flex gap-0.5 text-amber-500" aria-label="Rated 5 out of 5">
          {Array.from({ length: 5 }, (_, index) => (
            <Star key={index} className="size-4 fill-current" aria-hidden="true" />
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          Loved by <span className="font-semibold text-foreground">2,400+</span> developers
        </p>
      </div>
    </div>
  )
}
`;export{e as default};