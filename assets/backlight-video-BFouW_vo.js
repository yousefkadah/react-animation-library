var e=`import { Backlight } from "@/components/ui/backlight"

export default function BacklightVideo() {
  return (
    <Backlight blur={40} className="w-full py-10">
      <video
        className="mx-auto aspect-video w-full max-w-md rounded-xl object-cover"
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
        autoPlay
        muted
        loop
        playsInline
      />
    </Backlight>
  )
}
`;export{e as default};