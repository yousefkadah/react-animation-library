var e=`import { BorderBeam } from "@/components/ui/border-beam"

export default function BorderBeamButton() {
  return (
    <button className="relative overflow-hidden rounded-md border bg-background px-5 py-2 text-sm font-medium hover:bg-accent">
      Buy Now
      <BorderBeam
        size={40}
        initialOffset={20}
        className="from-transparent via-yellow-500 to-transparent"
        transition={{ type: "spring", stiffness: 60, damping: 20 }}
      />
    </button>
  )
}
`;export{e as default};