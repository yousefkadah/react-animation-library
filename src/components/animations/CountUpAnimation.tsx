import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { clsx } from 'clsx'

gsap.registerPlugin(ScrollTrigger)

interface CountUpAnimationProps {
  from?: number
  to: number
  duration?: number
  prefix?: string
  suffix?: string
  separator?: string
  decimals?: number
  className?: string
  trigger?: 'viewport' | 'immediate'
  onComplete?: () => void
}

const CountUpAnimation: React.FC<CountUpAnimationProps> = ({
  from = 0,
  to,
  duration = 2,
  prefix = '',
  suffix = '',
  separator = ',',
  decimals = 0,
  className,
  trigger = 'viewport',
  onComplete
}) => {
  const numberRef = useRef<HTMLSpanElement>(null)
  const [displayValue, setDisplayValue] = useState(from)

  const formatNumber = (value: number) => {
    const formattedValue = value.toFixed(decimals)
    const parts = formattedValue.split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    return parts.join('.')
  }

  useEffect(() => {
    if (!numberRef.current) return

    const animateNumber = () => {
      const obj = { value: from }

      gsap.to(obj, {
        value: to,
        duration: duration,
        ease: 'power2.out',
        onUpdate: () => {
          setDisplayValue(obj.value)
        },
        onComplete: () => {
          onComplete?.()
        }
      })
    }

    if (trigger === 'immediate') {
      animateNumber()
    } else {
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: numberRef.current,
          start: 'top 80%',
          onEnter: animateNumber,
          once: true
        })
      }, numberRef)

      return () => ctx.revert()
    }
  }, [from, to, duration, trigger, onComplete])

  return (
    <span ref={numberRef} className={clsx('font-bold', className)}>
      {prefix}{formatNumber(displayValue)}{suffix}
    </span>
  )
}

export default CountUpAnimation
