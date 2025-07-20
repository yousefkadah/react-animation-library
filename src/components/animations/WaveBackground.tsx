import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { clsx } from 'clsx'

interface WaveBackgroundProps {
  amplitude?: number
  frequency?: number
  speed?: number
  waveCount?: number
  colors?: string[]
  className?: string
}

const WaveBackground: React.FC<WaveBackgroundProps> = ({
  amplitude = 50,
  frequency = 0.02,
  speed = 1,
  waveCount = 3,
  colors = ['#3b82f6', '#8b5cf6', '#ec4899'],
  className
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const wavesRef = useRef<SVGPathElement[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    const waves = wavesRef.current.filter(Boolean)
    let animationId: number

    const animateWaves = () => {
      const time = Date.now() * 0.001 * speed

      waves.forEach((wave, index) => {
        if (!wave) return

        const waveAmplitude = amplitude * (1 - index * 0.1)
        const waveFrequency = frequency * (1 + index * 0.2)
        const phase = time + index * 0.5

        let path = 'M 0 300'
        
        for (let x = 0; x <= 1200; x += 10) {
          const y = 300 + Math.sin(x * waveFrequency + phase) * waveAmplitude
          path += ` L ${x} ${y}`
        }
        
        path += ' L 1200 600 L 0 600 Z'
        wave.setAttribute('d', path)
      })

      animationId = requestAnimationFrame(animateWaves)
    }

    animateWaves()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [amplitude, frequency, speed, waveCount])

  return (
    <div 
      ref={containerRef}
      className={clsx('absolute inset-0 overflow-hidden', className)}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {colors.map((color, index) => (
            <linearGradient
              key={index}
              id={`waveGradient${index}`}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor={color} stopOpacity="0.4" />
              <stop offset="100%" stopColor={color} stopOpacity="0.1" />
            </linearGradient>
          ))}
        </defs>
        
        {Array.from({ length: Math.min(waveCount, colors.length) }).map((_, index) => (
          <path
            key={index}
            ref={el => {
              if (el) wavesRef.current[index] = el
            }}
            fill={`url(#waveGradient${index})`}
            style={{
              transform: `translateY(${index * 20}px)`,
              filter: 'blur(1px)'
            }}
          />
        ))}
      </svg>
    </div>
  )
}

export default WaveBackground
