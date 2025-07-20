import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { clsx } from 'clsx'

gsap.registerPlugin(ScrollTrigger)

interface TextRevealProps {
  text: string
  direction?: 'up' | 'down' | 'left' | 'right'
  stagger?: number
  className?: string
  once?: boolean
}

const TextReveal: React.FC<TextRevealProps> = ({
  text,
  direction = 'up',
  stagger = 0.05,
  className,
  once = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const wordsRef = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    const words = wordsRef.current.filter(Boolean)
    
    // Initial state based on direction
    const initialState: any = { opacity: 0 }
    const animateState: any = { opacity: 1 }

    switch (direction) {
      case 'up':
        initialState.y = 50
        animateState.y = 0
        break
      case 'down':
        initialState.y = -50
        animateState.y = 0
        break
      case 'left':
        initialState.x = 50
        animateState.x = 0
        break
      case 'right':
        initialState.x = -50
        animateState.x = 0
        break
    }

    gsap.set(words, initialState)

    const ctx = gsap.context(() => {
      gsap.to(words, {
        ...animateState,
        duration: 0.8,
        stagger: stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: once ? 'play none none none' : 'play none none reverse'
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [direction, stagger, once])

  const words = text.split(' ')

  return (
    <div ref={containerRef} className={clsx('inline-block', className)}>
      {words.map((word, index) => (
        <span
          key={index}
          ref={el => {
            if (el) wordsRef.current[index] = el
          }}
          className="inline-block mr-1"
        >
          {word}
        </span>
      ))}
    </div>
  )
}

export default TextReveal
