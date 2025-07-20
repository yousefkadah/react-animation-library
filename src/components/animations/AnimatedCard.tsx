import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { clsx } from 'clsx'

interface AnimatedCardProps {
  title: string
  description: string
  className?: string
  children?: React.ReactNode
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  title,
  description,
  className,
  children
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const glow = glowRef.current

    if (!card || !glow) return

    const handleMouseEnter = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gsap.to(card, {
        rotationX: (y - rect.height / 2) / 10,
        rotationY: (x - rect.width / 2) / 10,
        transformPerspective: 1000,
        duration: 0.3,
        ease: 'power2.out'
      })

      gsap.to(glow, {
        opacity: 0.6,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gsap.to(card, {
        rotationX: (y - rect.height / 2) / 10,
        rotationY: (x - rect.width / 2) / 10,
        duration: 0.1,
        ease: 'power2.out'
      })

      gsap.set(glow, {
        background: `radial-gradient(circle at ${x}px ${y}px, rgba(59, 130, 246, 0.3), transparent 50%)`
      })
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: 'power2.out'
      })

      gsap.to(glow, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div 
      ref={cardRef}
      className={clsx(
        'relative card hover:border-primary-500/50 transition-colors duration-300 cursor-pointer',
        'transform-gpu will-change-transform',
        className
      )}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div 
        ref={glowRef}
        className="absolute inset-0 rounded-xl opacity-0 pointer-events-none"
      />
      
      <div className="relative z-10">
        <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">{title}</h3>
        <p className="text-secondary-600 dark:text-secondary-300 text-sm">{description}</p>
        {children}
      </div>
    </div>
  )
}

export default AnimatedCard
