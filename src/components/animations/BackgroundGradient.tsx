import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { clsx } from 'clsx'

interface BackgroundGradientProps {
  colors?: string[]
  direction?: 'horizontal' | 'vertical' | 'radial' | 'conic'
  animation?: 'none' | 'shift' | 'rotate' | 'pulse' | 'wave'
  speed?: number
  className?: string
  children?: React.ReactNode
}

const BackgroundGradient: React.FC<BackgroundGradientProps> = ({
  colors = ['#3b82f6', '#8b5cf6', '#ec4899'],
  direction = 'horizontal',
  animation = 'shift',
  speed = 3,
  className,
  children
}) => {
  const gradientRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gradientRef.current || animation === 'none') return

    const element = gradientRef.current

    const ctx = gsap.context(() => {
      switch (animation) {
        case 'shift':
          gsap.to(element, {
            backgroundPosition: '200% center',
            duration: speed,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut'
          })
          break

        case 'rotate':
          if (direction === 'conic') {
            gsap.to(element, {
              background: `conic-gradient(from 0deg at 50% 50%, ${colors.join(', ')}, ${colors[0]})`,
              duration: 0,
              repeat: -1,
              onRepeat: function() {
                const rotation = (this.totalTime() * 360 / speed) % 360
                gsap.set(element, {
                  background: `conic-gradient(from ${rotation}deg at 50% 50%, ${colors.join(', ')}, ${colors[0]})`
                })
              }
            })
          } else {
            gsap.to(element, {
              backgroundPosition: '200% 200%',
              duration: speed,
              repeat: -1,
              ease: 'none'
            })
          }
          break

        case 'pulse':
          gsap.to(element, {
            filter: 'brightness(1.3) saturate(1.2)',
            duration: speed / 2,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut'
          })
          break

        case 'wave':
          gsap.to(element, {
            backgroundPosition: '400% center',
            duration: speed,
            repeat: -1,
            ease: 'none'
          })
          break
      }
    }, gradientRef)

    return () => ctx.revert()
  }, [colors, direction, animation, speed])

  const getGradientStyle = () => {
    const colorString = colors.join(', ')
    let backgroundSize = '200% 200%'
    
    switch (direction) {
      case 'horizontal':
        return {
          background: `linear-gradient(90deg, ${colorString})`,
          backgroundSize: animation === 'wave' ? '400% 100%' : backgroundSize
        }
      case 'vertical':
        return {
          background: `linear-gradient(180deg, ${colorString})`,
          backgroundSize: animation === 'wave' ? '100% 400%' : backgroundSize
        }
      case 'radial':
        return {
          background: `radial-gradient(circle, ${colorString})`,
          backgroundSize: animation === 'wave' ? '400% 400%' : backgroundSize
        }
      case 'conic':
        return {
          background: `conic-gradient(from 0deg at 50% 50%, ${colorString}, ${colors[0]})`,
          backgroundSize: '100% 100%'
        }
      default:
        return {
          background: `linear-gradient(45deg, ${colorString})`,
          backgroundSize
        }
    }
  }

  return (
    <div
      ref={gradientRef}
      className={clsx(
        'relative w-full h-full',
        className
      )}
      style={getGradientStyle()}
    >
      {children && (
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      )}
    </div>
  )
}

export default BackgroundGradient
