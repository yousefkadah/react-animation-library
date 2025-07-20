import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { clsx } from 'clsx'

interface ProgressBarProps {
  value: number
  max?: number
  height?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'green' | 'blue' | 'purple' | 'red' | 'orange'
  showPercentage?: boolean
  animated?: boolean
  duration?: number
  className?: string
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  height = 'md',
  color = 'primary',
  showPercentage = true,
  animated = true,
  duration = 1.5,
  className
}) => {
  const progressRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const [displayValue, setDisplayValue] = useState(0)

  const percentage = Math.min((value / max) * 100, 100)

  const heightClasses = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6'
  }

  const colorClasses = {
    primary: 'bg-primary-500',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    red: 'bg-red-500',
    orange: 'bg-orange-500'
  }

  useEffect(() => {
    if (!fillRef.current || !animated) {
      setDisplayValue(percentage)
      return
    }

    const ctx = gsap.context(() => {
      // Animate the fill width
      gsap.fromTo(fillRef.current, {
        width: '0%'
      }, {
        width: `${percentage}%`,
        duration: duration,
        ease: 'power2.out'
      })

      // Animate the percentage text
      const obj = { value: 0 }
      gsap.to(obj, {
        value: percentage,
        duration: duration,
        ease: 'power2.out',
        onUpdate: () => {
          setDisplayValue(obj.value)
        }
      })
    }, progressRef)

    return () => ctx.revert()
  }, [percentage, animated, duration])

  useEffect(() => {
    if (!animated) {
      setDisplayValue(percentage)
    }
  }, [percentage, animated])

  return (
    <div ref={progressRef} className={clsx('relative w-full', className)}>
      <div className={clsx(
        'relative w-full rounded-full overflow-hidden',
        heightClasses[height],
        'bg-secondary-200 dark:bg-secondary-700'
      )}>
        <div
          ref={fillRef}
          className={clsx(
            'h-full rounded-full transition-all duration-300',
            colorClasses[color],
            !animated && 'w-full'
          )}
          style={!animated ? { width: `${percentage}%` } : undefined}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </div>
      </div>
      
      {showPercentage && (
        <div className="flex justify-between items-center mt-1">
          <span className="text-sm text-secondary-600 dark:text-secondary-300">
            Progress
          </span>
          <span className="text-sm font-medium text-secondary-900 dark:text-white">
            {Math.round(displayValue)}%
          </span>
        </div>
      )}
    </div>
  )
}

export default ProgressBar
