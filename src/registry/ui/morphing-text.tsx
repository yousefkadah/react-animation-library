"use client"

import { useCallback, useEffect, useId, useRef } from "react"

import { cn } from "@/lib/utils"

/** Seconds a morph takes. */
const morphTime = 1.5
/** Seconds each text rests before the next morph. */
const cooldownTime = 0.5

const useMorphingText = (texts: string[]) => {
  const textIndexRef = useRef(0)
  const morphRef = useRef(0)
  const cooldownRef = useRef(0)
  const timeRef = useRef(0)
  const reducedMotionRef = useRef(false)

  const text1Ref = useRef<HTMLSpanElement>(null)
  const text2Ref = useRef<HTMLSpanElement>(null)

  const setStyles = useCallback(
    (fraction: number) => {
      const [current1, current2] = [text1Ref.current, text2Ref.current]
      if (!current1 || !current2 || !texts.length) return

      current2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`
      current2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`

      const invertedFraction = 1 - fraction
      current1.style.filter = `blur(${Math.min(8 / invertedFraction - 8, 100)}px)`
      current1.style.opacity = `${Math.pow(invertedFraction, 0.4) * 100}%`

      current1.textContent = texts[textIndexRef.current % texts.length] ?? ""
      current2.textContent = texts[(textIndexRef.current + 1) % texts.length] ?? ""
    },
    [texts]
  )

  const doMorph = useCallback(() => {
    morphRef.current -= cooldownRef.current
    cooldownRef.current = 0

    let fraction = morphRef.current / morphTime

    if (fraction > 1) {
      cooldownRef.current = cooldownTime
      fraction = 1
    }
    // Reduced motion: keep the timing but swap texts in one step, without the blur.
    if (fraction < 1 && reducedMotionRef.current) fraction = 0

    setStyles(fraction)

    if (fraction === 1) {
      textIndexRef.current++
    }
  }, [setStyles])

  const doCooldown = useCallback(() => {
    morphRef.current = 0
    const [current1, current2] = [text1Ref.current, text2Ref.current]
    if (current1 && current2) {
      current2.style.filter = "none"
      current2.style.opacity = "100%"
      current1.style.filter = "none"
      current1.style.opacity = "0%"
    }
  }, [])

  useEffect(() => {
    let animationFrameId: number
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

    const animate = (now: number) => {
      animationFrameId = requestAnimationFrame(animate)

      const dt = timeRef.current ? (now - timeRef.current) / 1000 : 0
      timeRef.current = now
      reducedMotionRef.current = reducedMotionQuery.matches

      cooldownRef.current -= dt

      if (cooldownRef.current <= 0) doMorph()
      else doCooldown()
    }

    animationFrameId = requestAnimationFrame(animate)
    return () => {
      cancelAnimationFrame(animationFrameId)
      timeRef.current = 0
    }
  }, [doMorph, doCooldown])

  return { text1Ref, text2Ref }
}

export interface MorphingTextProps {
  className?: string
  /** The texts to morph between, in order. */
  texts: string[]
}

function Texts({ texts }: Pick<MorphingTextProps, "texts">) {
  const { text1Ref, text2Ref } = useMorphingText(texts)
  return (
    <>
      <span aria-hidden="true" className="absolute inset-x-0 top-0 m-auto inline-block w-full" ref={text1Ref} />
      <span aria-hidden="true" className="absolute inset-x-0 top-0 m-auto inline-block w-full" ref={text2Ref} />
    </>
  )
}

function SvgFilters({ id }: { id: string }) {
  return (
    <svg aria-hidden="true" className="fixed h-0 w-0" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id={id}>
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 255 -140"
          />
        </filter>
      </defs>
    </svg>
  )
}

export function MorphingText({ texts, className }: MorphingTextProps) {
  // Unique per instance so several MorphingTexts on one page don't share a filter.
  const filterId = `morphing-text-threshold-${useId().replace(/[^\w-]/g, "")}`

  return (
    <div
      className={cn(
        "relative mx-auto h-16 w-full max-w-3xl text-center font-sans text-[40pt] leading-none font-bold md:h-24 lg:text-[6rem]",
        className
      )}
      style={{ filter: `url(#${filterId}) blur(0.6px)` }}
    >
      <span className="sr-only">{texts.join(", ")}</span>
      <Texts texts={texts} />
      <SvgFilters id={filterId} />
    </div>
  )
}
