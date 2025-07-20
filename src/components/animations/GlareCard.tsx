import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { clsx } from 'clsx'

interface GlareCardProps {
  title: string
  content: string
  glareColor?: string
  className?: string
  children?: React.ReactNode
}

const GlareCard: React.FC<GlareCardProps> = ({
  title,
  content,
  glareColor = '#3b82f6',
  className,
  children
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const glare = glareRef.current

    if (!card || !glare) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Calculate position as percentage
      const xPercent = (x / rect.width) * 100
      const yPercent = (y / rect.height) * 100

      // Update glare position to follow mouse
      gsap.set(glare, {
        background: `radial-gradient(circle 200px at ${xPercent}% ${yPercent}%, ${glareColor}40, transparent 50%)`,
        opacity: 1
      })

      // Subtle tilt effect
      const tiltX = (yPercent - 50) / 25
      const tiltY = (xPercent - 50) / 25

      gsap.to(card, {
        rotationX: tiltX,
        rotationY: tiltY,
        duration: 0.3,
        ease: 'power2.out',
        transformPerspective: 1000
      })
    }

    const handleMouseEnter = () => {
      gsap.to(glare, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      })

      gsap.to(card, {
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    const handleMouseLeave = () => {
      gsap.to(glare, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out'
      })

      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out'
      })
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [glareColor])

  return (
    <div 
      ref={cardRef}
      className={clsx(
        'relative card cursor-pointer overflow-hidden',
        'transform-gpu will-change-transform',
        className
      )}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Glare effect overlay */}
      <div 
        ref={glareRef}
        className="absolute inset-0 opacity-0 pointer-events-none rounded-xl"
        style={{
          background: `radial-gradient(circle 200px at 50% 50%, ${glareColor}40, transparent 50%)`
        }}
      />
      
      {/* Card content */}
      <div className="relative z-10">
        <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">{title}</h3>
        <p className="text-secondary-600 dark:text-secondary-300 mb-4">{content}</p>
        {children}
      </div>
    </div>
  )
}

export default GlareCard
