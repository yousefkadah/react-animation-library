var e=`import { PixelImage } from "@/components/ui/pixel-image"

export default function PixelImageDemo() {
  return (
    <PixelImage
      src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=800&q=80&auto=format&fit=crop"
      alt="A misty mountain valley at sunrise"
      customGrid={{ rows: 4, cols: 6 }}
      grayscaleAnimation
    />
  )
}
`;export{e as default};