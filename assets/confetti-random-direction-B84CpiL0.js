var e=`import { ConfettiButton } from "@/components/ui/confetti"

// A getter is read on every click, so each burst flies in a new direction.
const options = {
  get angle() {
    return Math.random() * 360
  },
}

export default function ConfettiRandomDirection() {
  return (
    <div className="relative">
      <ConfettiButton options={options}>Random Confetti 🎉</ConfettiButton>
    </div>
  )
}
`;export{e as default};