"use client"

import { Children, useMemo, type CSSProperties, type ElementType, type ReactNode } from "react"

import { cn } from "@/lib/utils"

export interface VideoTextProps {
  /** The video source URL. */
  src: string
  /** The text the video plays inside (plain text). */
  children: ReactNode
  className?: string
  /** Start playing as soon as possible. */
  autoPlay?: boolean
  /** Mute the video (required by browsers for autoplay). */
  muted?: boolean
  /** Restart the video when it ends. */
  loop?: boolean
  /** How much of the video to preload. */
  preload?: "auto" | "metadata" | "none"
  /** Font size of the text mask. Numbers are read as `vw` of the mask box. */
  fontSize?: string | number
  /** Font weight of the text mask. */
  fontWeight?: string | number
  /** SVG `text-anchor` of the text mask. */
  textAnchor?: string
  /** SVG `dominant-baseline` of the text mask. */
  dominantBaseline?: string
  /** Font family of the text mask. */
  fontFamily?: string
  /** Element to render. */
  as?: ElementType
}

const escapeXml = (value: string | number) => String(value).replace(/[&<>'"]/g, (char) => `&#${char.charCodeAt(0)};`)

export function VideoText({
  src,
  children,
  className,
  autoPlay = true,
  muted = true,
  loop = true,
  preload = "auto",
  fontSize = 20,
  fontWeight = "bold",
  textAnchor = "middle",
  dominantBaseline = "middle",
  fontFamily = "sans-serif",
  as: Component = "div",
}: VideoTextProps) {
  const content = Children.toArray(children).join("")

  const maskStyle = useMemo<CSSProperties>(() => {
    const size = typeof fontSize === "number" ? `${fontSize}vw` : fontSize
    const svg =
      `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>` +
      `<text x='50%' y='50%' font-size='${escapeXml(size)}' font-weight='${escapeXml(fontWeight)}' ` +
      `text-anchor='${escapeXml(textAnchor)}' dominant-baseline='${escapeXml(dominantBaseline)}' ` +
      `font-family='${escapeXml(fontFamily)}'>${escapeXml(content)}</text></svg>`
    const mask = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
    // The SVG has no intrinsic size, so it is stretched to exactly the box (`contain` left the
    // fit to the browser's guess of an aspect ratio).
    return {
      maskImage: mask,
      WebkitMaskImage: mask,
      maskSize: "100% 100%",
      WebkitMaskSize: "100% 100%",
      maskRepeat: "no-repeat",
      WebkitMaskRepeat: "no-repeat",
      maskPosition: "center",
      WebkitMaskPosition: "center",
    }
  }, [content, fontSize, fontWeight, textAnchor, dominantBaseline, fontFamily])

  return (
    <Component className={cn("relative size-full", className)}>
      {/*
        The video is only visible through the text-shaped mask. p-px keeps it 1px inside the mask
        box: Chrome snaps the mask tile and the video layer to device pixels independently, which
        could otherwise leave a 1px unmasked row of video at the top and bottom edges. The glyphs
        never reach the edges, so nothing visible is lost.
      */}
      <div className="absolute inset-0 flex items-center justify-center p-px" style={maskStyle}>
        <video
          className="h-full w-full object-cover"
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          preload={preload}
          playsInline
          aria-hidden="true"
        >
          <source src={src} />
          Your browser does not support the video tag.
        </video>
      </div>
      <span className="sr-only">{content}</span>
    </Component>
  )
}
