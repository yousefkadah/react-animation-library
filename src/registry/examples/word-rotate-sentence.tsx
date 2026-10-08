import { WordRotate } from "@/components/ui/word-rotate"

const words = ["beautiful", "accessible", "fast", "delightful"]

export default function WordRotateSentence() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-2.5 text-3xl font-bold tracking-tight sm:text-4xl">
      <span>Build something</span>
      <WordRotate
        words={words}
        duration={2000}
        className="bg-linear-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent"
      />
    </div>
  )
}
