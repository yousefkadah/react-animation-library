var e=`import { AvatarCircles } from "@/components/ui/avatar-circles"

const avatars = ["jack", "jill", "john", "jane", "jenny", "james"].map((name) => ({
  imageUrl: \`https://avatar.vercel.sh/\${name}\`,
  profileUrl: "#",
}))

export default function AvatarCirclesDemo() {
  return <AvatarCircles numPeople={99} avatarUrls={avatars} />
}
`;export{e as default};