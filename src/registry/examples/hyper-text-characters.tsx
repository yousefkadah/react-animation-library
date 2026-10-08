import { HyperText } from "@/components/ui/hyper-text"

const binary = ["0", "1"]
const symbols = "!<>-_\\/[]{}—=+*^?#".split("")

export default function HyperTextCharacters() {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <HyperText as="h2" characterSet={binary} duration={1600} className="text-3xl sm:text-5xl">
        Decrypting
      </HyperText>
      <HyperText as="p" characterSet={symbols} delay={600} className="text-lg font-medium text-muted-foreground sm:text-xl">
        Access granted
      </HyperText>
    </div>
  )
}
