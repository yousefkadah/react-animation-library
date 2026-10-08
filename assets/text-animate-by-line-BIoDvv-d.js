var e=`import { TextAnimate } from "@/components/ui/text-animate"

const poem = \`Fade in by line, one at a time.
Each line is its own segment,
so long copy reads like a story.\`

export default function TextAnimateByLine() {
  return (
    <TextAnimate animation="fadeIn" by="line" duration={0.9} className="text-center text-2xl leading-relaxed font-medium">
      {poem}
    </TextAnimate>
  )
}
`;export{e as default};