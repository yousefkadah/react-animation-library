import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { clsx } from 'clsx'

interface GradientTextProps {
  text: string
  colors?: string[]
  animation?: 'none' | 'wave' | 'shift' | 'pulse' | 'rainbow'
  className?: string
  speed?: number
}

const GradientText: React.FC<GradientTextProps> = ({
  text,
  colors = ['#3b82f6', '#8b5cf6', '#ec4899'],
  animation = 'shift',
  className,
  speed = 3
}) => {
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!textRef.current || animation === 'none') return

    const element = textRef.current

    const ctx = gsap.context(() => {
      switch (animation) {
        case 'wave':
          // Create a flowing wave effect
          gsap.to(element, {
            backgroundPosition: '200% 0%',
            duration: speed,
            repeat: -1,
            ease: 'none'
          })
          break

        case 'shift':
          // Gradient position shift
          gsap.to(element, {
            backgroundPosition: '200% center',
            duration: speed,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut'
          })
          break

        case 'pulse':
          // Pulsing gradient intensity
          gsap.to(element, {
            filter: 'brightness(1.3) saturate(1.2)',
            duration: speed / 2,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut'
          })
          break

        case 'rainbow':
          // Rainbow color cycling
          const colors = [
            'linear-gradient(45deg, #ff0000, #ff7700)',
            'linear-gradient(45deg, #ff7700, #ffdd00)',
            'linear-gradient(45deg, #ffdd00, #00ff00)',
            'linear-gradient(45deg, #00ff00, #0099ff)',
            'linear-gradient(45deg, #0099ff, #6633ff)',
            'linear-gradient(45deg, #6633ff, #ff0099)'
          ]
          
          const tl = gsap.timeline({ repeat: -1 })
          colors.forEach((color, index) => {
            tl.to(element, {
              background: color,
              duration: speed / colors.length,
              ease: 'power2.inOut'
            })
          })
          break
      }
    }, textRef)

    return () => ctx.revert()
  }, [animation, speed])

  const gradientStyle = React.useMemo(() => {
    if (animation === 'rainbow') {
      return {
        background: 'linear-gradient(45deg, #ff0000, #ff7700)',
        backgroundSize: '200% 200%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
        display: 'inline'
      }
    }

    const gradientColors = colors.join(', ')
    return {
      background: `linear-gradient(45deg, ${gradientColors})`,
      backgroundSize: animation === 'wave' ? '200% 200%' : '400% 400%',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: 'transparent',
      display: 'inline'
    }
  }, [colors, animation])

  return (
    <span
      ref={textRef}
      className={clsx('font-bold', className)}
      style={gradientStyle}
    >
      {text}
    </span>
  )
}

export default GradientText
