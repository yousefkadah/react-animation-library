import { IconCloud } from "@/components/ui/icon-cloud"

const photos = [
  "1506905925346-21bda4d32df4",
  "1469474968028-56623f02e42e",
  "1501785888041-af3ef285b470",
  "1470071459604-3b5ec3a7fe05",
  "1441974231531-c6227db76b6e",
  "1447752875215-b2761acb3c5d",
  "1433086966358-54859d0ed716",
  "1472214103451-9374bd1c798e",
]

// Repeat the set so the sphere is well populated; small crops keep it fast.
const images = [...photos, ...photos].map((id) => `https://images.unsplash.com/photo-${id}?w=96&h=96&fit=crop&auto=format`)

export default function IconCloudImages() {
  return (
    <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg border bg-background">
      <IconCloud images={images} />
    </div>
  )
}
