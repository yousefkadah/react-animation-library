var e=`import { AvatarCircles } from "@/components/ui/avatar-circles"

const avatars = ["sarah", "evan", "anthony", "daniel"].map((name) => ({
  imageUrl: \`https://avatar.vercel.sh/\${name}\`,
  profileUrl: "#",
}))

export default function AvatarCirclesSizes() {
  return (
    <div className="flex flex-col items-center gap-6">
      <AvatarCircles numPeople={8} avatarUrls={avatars} className="-space-x-2 [&_img]:size-7 [&_span]:size-7 [&_span]:text-[10px]" />
      <AvatarCircles numPeople={12} avatarUrls={avatars} />
      <AvatarCircles numPeople={36} avatarUrls={avatars} className="-space-x-6 [&_img]:size-14 [&_span]:size-14 [&_span]:text-sm" />
    </div>
  )
}
`;export{e as default};