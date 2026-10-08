import type { CSSProperties, HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

type As = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"

export type KineticTextProps = HTMLAttributes<HTMLElement> & {
  /** The text to render with the kinetic hover effect. */
  text: string
  /** Element to render. */
  as?: As
}

export function KineticText({ text, as: Tag = "h1", className = "", style, ...rest }: KineticTextProps) {
  const mergedStyle = {
    "--hover-padding": "calc(1em / 12)",
    "--text-stroke-width": "calc(1em * 125 / 6000)",
    ...style,
  } as CSSProperties

  return (
    <Tag {...rest} className={cn("flex flex-wrap font-[300]", className)} style={mergedStyle}>
      {text.split("").map((letter, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="[will-change:font-weight,-webkit-text-stroke-width,padding] [-webkit-text-stroke-color:transparent] [-webkit-text-stroke-width:var(--text-stroke-width)] [transition:font-weight_0.4s,_-webkit-text-stroke-color_0.4s,_padding_0.4s] hover:[padding-inline:var(--hover-padding)] hover:font-[900] hover:[-webkit-text-stroke-color:currentcolor] hover:[-webkit-text-stroke-width:calc(var(--text-stroke-width)*2)] has-[+span+span:hover]:font-[400] has-[+span:hover]:[padding-inline:var(--hover-padding)] has-[+span:hover]:font-[600] motion-reduce:transition-none [:hover+&]:[padding-inline:var(--hover-padding)] [:hover+&]:font-[600] [:hover+span+&]:font-[400]"
        >
          {letter === " " ? " " : letter}
        </span>
      ))}
      <span className="sr-only">{text}</span>
    </Tag>
  )
}
