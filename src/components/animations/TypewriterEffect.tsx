import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { clsx } from 'clsx'

interface TypewriterEffectProps {
  text: string
  speed?: number
  className?: string
  onComplete?: () => void
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  text,
  speed = 100,
  className,
  onComplete
}) => {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const cursorRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timer)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, text, speed, onComplete])

  useEffect(() => {
    // Animate cursor blinking
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      })
    }
  }, [])

  return (
    <span className={clsx('inline-block', className)}>
      {displayedText}
      <span 
        ref={cursorRef}
        className="inline-block w-0.5 h-[1em] bg-primary-400 ml-1 align-middle"
      />
    </span>
  )
}

export default TypewriterEffect
