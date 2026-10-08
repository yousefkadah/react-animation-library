import { SpinningText } from "@/components/ui/spinning-text"

export default function SpinningTextReverse() {
  return (
    <SpinningText reverse className="text-4xl" duration={4} radius={6}>
      learn more • earn more • grow more •
    </SpinningText>
  )
}
