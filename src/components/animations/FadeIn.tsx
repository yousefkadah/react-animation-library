import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { clsx } from 'clsx'

gsap.registerPlugin(ScrollTrigger)

interface FadeInProps {
  children: React.ReactNode
  duration?: number
  delay?: number
  trigger?: 'viewport' | 'immediate'
  once?: boolean
  stagger?: number
  scale?: boolean
  blur?: boolean
  className?: string
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  duration = 0.8,
  delay = 0,
  trigger = 'viewport',
  once = true,
  stagger = 0,
  scale = false,
  blur = false,
  className
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const elements = stagger > 0 ? 
      Array.from(container.children) : 
      [container]

    // Set initial state
    const initialState: any = { opacity: 0 }
    const animateState: any = { opacity: 1 }

    if (scale) {
      initialState.scale = 0.8
      animateState.scale = 1
    }

    if (blur) {
      initialState.filter = 'blur(10px)'
      animateState.filter = 'blur(0px)'
    }

    gsap.set(elements, initialState)

    const animateElements = () => {
      gsap.to(elements, {
        ...animateState,
        duration: duration,
        delay: delay,
        stagger: stagger,
        ease: 'power3.out'
      })
    }

    if (trigger === 'immediate') {
      animateElements()
    } else {
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: container,
          start: 'top 80%',
          onEnter: animateElements,
          onLeaveBack: once ? undefined : () => {
            gsap.set(elements, initialState)
          },
          once: once
        })
      }, containerRef)

      return () => ctx.revert()
    }
  }, [duration, delay, trigger, once, stagger, scale, blur])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}

export default FadeIn
