var e=`import { Marquee } from "@/components/ui/marquee"

const reviews = [
  { name: "Jack", username: "@jack", body: "I've never seen anything like this before. It's amazing.", img: "https://avatar.vercel.sh/jack" },
  { name: "Jill", username: "@jill", body: "I don't know what to say. I'm speechless.", img: "https://avatar.vercel.sh/jill" },
  { name: "John", username: "@john", body: "I'm at a loss for words. This is amazing.", img: "https://avatar.vercel.sh/john" },
  { name: "Jane", username: "@jane", body: "Shipped our landing page in an afternoon.", img: "https://avatar.vercel.sh/jane" },
  { name: "Jenny", username: "@jenny", body: "The motion feels incredibly polished.", img: "https://avatar.vercel.sh/jenny" },
  { name: "James", username: "@james", body: "Copy, paste, done. Love it.", img: "https://avatar.vercel.sh/james" },
]

function ReviewCard({ img, name, username, body }: (typeof reviews)[number]) {
  return (
    <figure className="relative w-56 overflow-hidden rounded-xl border border-gray-950/[.1] bg-gray-950/[.01] p-4 dark:border-gray-50/[.1] dark:bg-gray-50/[.10]">
      <div className="flex items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs font-medium text-muted-foreground">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  )
}

export default function MarqueeVertical() {
  return (
    <div className="relative flex h-[500px] w-full flex-row items-center justify-center overflow-hidden">
      <Marquee pauseOnHover vertical duration="20s">
        {reviews.slice(0, 3).map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover vertical duration="20s">
        {reviews.slice(3).map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-linear-to-b from-background" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-background" />
    </div>
  )
}
`;export{e as default};