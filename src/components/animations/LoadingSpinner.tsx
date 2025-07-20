import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { clsx } from 'clsx'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: string
  variant?: 'spin' | 'pulse' | 'bounce' | 'dots'
  className?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  variant = 'spin',
  className
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      switch (variant) {
        case 'spin':
          gsap.to('.spinner-element', {
            rotation: 360,
            duration: 1,
            repeat: -1,
            ease: 'none'
          })
          break
        
        case 'pulse':
          gsap.to('.spinner-element', {
            scale: 1.2,
            duration: 0.8,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut'
          })
          break
        
        case 'bounce':
          gsap.to('.spinner-element', {
            y: -10,
            duration: 0.6,
            repeat: -1,
            yoyo: true,
            ease: 'power2.out'
          })
          break
        
        case 'dots':
          gsap.to('.dot', {
            y: -8,
            duration: 0.4,
            repeat: -1,
            yoyo: true,
            ease: 'power2.out',
            stagger: 0.1
          })
          break
      }
    }, containerRef)

    return () => ctx.revert()
  }, [variant])

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  const colorClasses = {
    primary: 'text-primary-500',
    white: 'text-white',
    gray: 'text-gray-500',
    blue: 'text-blue-500',
    green: 'text-green-500',
    red: 'text-red-500'
  }

  const dotSizes = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4'
  }

  return (
    <div ref={containerRef} className={clsx('inline-flex items-center justify-center', className)}>
      {variant === 'dots' ? (
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={clsx(
                'dot rounded-full',
                dotSizes[size],
                'bg-current',
                colorClasses[color as keyof typeof colorClasses] || 'text-primary-500'
              )}
            />
          ))}
        </div>
      ) : (
        <div
          className={clsx(
            'spinner-element',
            sizeClasses[size],
            colorClasses[color as keyof typeof colorClasses] || 'text-primary-500'
          )}
        >
          {variant === 'spin' && (
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}
          
          {variant === 'pulse' && (
            <div className="w-full h-full bg-current rounded-full" />
          )}
          
          {variant === 'bounce' && (
            <div className="w-full h-full bg-current rounded-full" />
          )}
        </div>
      )}
    </div>
  )
}

export default LoadingSpinner
