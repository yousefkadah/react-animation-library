import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { clsx } from 'clsx'

gsap.registerPlugin(ScrollTrigger)

interface SlideInProps {
  children: React.ReactNode
  direction?: 'left' | 'right' | 'up' | 'down'
  distance?: number
  duration?: number
  delay?: number
  trigger?: 'viewport' | 'immediate'
  once?: boolean
  className?: string
}

const SlideIn: React.FC<SlideInProps> = ({
  children,
  direction = 'up',
  distance = 50,
  duration = 0.8,
  delay = 0,
  trigger = 'viewport',
  once = true,
  className
}) => {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const element = elementRef.current

    // Set initial position based on direction
    const initialState: any = { opacity: 0 }
    const animateState: any = { opacity: 1 }

    switch (direction) {
      case 'left':
        initialState.x = -distance
        animateState.x = 0
        break
      case 'right':
        initialState.x = distance
        animateState.x = 0
        break
      case 'up':
        initialState.y = distance
        animateState.y = 0
        break
      case 'down':
        initialState.y = -distance
        animateState.y = 0
        break
    }

    gsap.set(element, initialState)

    const animateElement = () => {
      gsap.to(element, {
        ...animateState,
        duration: duration,
        delay: delay,
        ease: 'power3.out'
      })
    }

    if (trigger === 'immediate') {
      animateElement()
    } else {
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: element,
          start: 'top 80%',
          onEnter: animateElement,
          onLeaveBack: once ? undefined : () => {
            gsap.set(element, initialState)
          },
          once: once
        })
      }, elementRef)

      return () => ctx.revert()
    }
  }, [direction, distance, duration, delay, trigger, once])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

export default SlideIn
