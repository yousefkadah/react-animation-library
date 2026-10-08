import { Iphone } from "@/components/ui/iphone"

export default function IphoneImage() {
  return (
    <div className="flex items-end gap-6">
      <Iphone width={180} src="https://picsum.photos/seed/iphone-left/900/1950" className="hidden sm:inline-block" />
      <Iphone width={210} src="https://images.unsplash.com/photo-1511300636408-a63a89df3482?q=80&w=900&auto=format&fit=crop" />
    </div>
  )
}
