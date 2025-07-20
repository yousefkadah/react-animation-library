import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { clsx } from 'clsx'

gsap.registerPlugin(ScrollTrigger)

interface ParallaxProps {
  children: React.ReactNode
  speed?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  scale?: number
  rotate?: number
  opacity?: boolean
  className?: string
}

const Parallax: React.FC<ParallaxProps> = ({
  children,
  speed = 0.5,
  direction = 'up',
  scale = 0,
  rotate = 0,
  opacity = false,
  className
}) => {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const element = elementRef.current

    const ctx = gsap.context(() => {
      // Calculate movement based on direction
      let xMovement = 0
      let yMovement = 0

      switch (direction) {
        case 'up':
          yMovement = -100 * speed
          break
        case 'down':
          yMovement = 100 * speed
          break
        case 'left':
          xMovement = -100 * speed
          break
        case 'right':
          xMovement = 100 * speed
          break
      }

      const animation: any = {}

      if (xMovement !== 0) animation.x = xMovement
      if (yMovement !== 0) animation.y = yMovement
      if (scale !== 0) animation.scale = 1 + scale
      if (rotate !== 0) animation.rotation = rotate
      if (opacity) {
        animation.opacity = 0.3
      }

      gsap.to(element, {
        ...animation,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })
    }, elementRef)

    return () => ctx.revert()
  }, [speed, direction, scale, rotate, opacity])

  return (
    <div 
      ref={elementRef} 
      className={clsx('will-change-transform', className)}
    >
      {children}
    </div>
  )
}

export default Parallax
