import React, { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { clsx } from 'clsx'

interface FlipCardProps {
  front: React.ReactNode
  back: React.ReactNode
  direction?: 'horizontal' | 'vertical'
  className?: string
  flipOnHover?: boolean
}

const FlipCard: React.FC<FlipCardProps> = ({
  front,
  back,
  direction = 'horizontal',
  className,
  flipOnHover = false
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const frontRef = useRef<HTMLDivElement>(null)
  const backRef = useRef<HTMLDivElement>(null)
  const [isFlipped, setIsFlipped] = useState(false)

  const flipCard = () => {
    if (!cardRef.current || !frontRef.current || !backRef.current) return

    const newFlipState = !isFlipped
    setIsFlipped(newFlipState)

    const rotationAxis = direction === 'horizontal' ? 'rotationY' : 'rotationX'
    const frontRotation = newFlipState ? (direction === 'horizontal' ? -180 : -180) : 0
    const backRotation = newFlipState ? 0 : (direction === 'horizontal' ? 180 : 180)

    // Animate front side
    gsap.to(frontRef.current, {
      [rotationAxis]: frontRotation,
      duration: 0.6,
      ease: 'power2.inOut'
    })

    // Animate back side
    gsap.to(backRef.current, {
      [rotationAxis]: backRotation,
      duration: 0.6,
      ease: 'power2.inOut'
    })
  }

  const handleMouseEnter = () => {
    if (flipOnHover && !isFlipped) {
      flipCard()
    }
  }

  const handleMouseLeave = () => {
    if (flipOnHover && isFlipped) {
      flipCard()
    }
  }

  const handleClick = () => {
    if (!flipOnHover) {
      flipCard()
    }
  }

  return (
    <div 
      ref={cardRef}
      className={clsx(
        'relative w-full h-64 cursor-pointer',
        'transform-gpu will-change-transform',
        className
      )}
      style={{ 
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Front side */}
      <div
        ref={frontRef}
        className="absolute inset-0 w-full h-full backface-hidden"
        style={{
          backfaceVisibility: 'hidden',
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="card h-full flex flex-col justify-center items-center">
          {front}
        </div>
      </div>

      {/* Back side */}
      <div
        ref={backRef}
        className="absolute inset-0 w-full h-full backface-hidden"
        style={{
          backfaceVisibility: 'hidden',
          transformStyle: 'preserve-3d',
          transform: direction === 'horizontal' ? 'rotateY(180deg)' : 'rotateX(180deg)'
        }}
      >
        <div className="card h-full flex flex-col justify-center items-center">
          {back}
        </div>
      </div>
    </div>
  )
}

export default FlipCard
