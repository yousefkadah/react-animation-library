import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import AnimatedCard from '../animations/AnimatedCard'
import TypewriterEffect from '../animations/TypewriterEffect'
import FloatingParticles from '../animations/FloatingParticles'

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      tl.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })
      .from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.5')
      .from(buttonsRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.3')

      // Floating animation for the hero cards
      gsap.to('.hero-card', {
        y: -10,
        duration: 2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.2
      })

    }, heroRef)

    return () => ctx.revert()
  }, [])

  const features = [
    'GSAP Powered',
    'TypeScript Ready',
    'Fully Customizable',
    'Production Ready'
  ]

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <FloatingParticles />
      
      <div className="container relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold mb-6 gradient-text"
          >
            <TypewriterEffect 
              text="React GSAP UI" 
              speed={100}
              className="block"
            />
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-secondary-300 mb-8 max-w-3xl mx-auto text-balance"
          >
            A powerful React animation component library built with GSAP. 
            Create stunning, performant animations with copy-paste components.
          </p>

          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/docs" className="btn-primary text-lg px-8 py-4">
              Get Started
            </Link>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-secondary text-lg px-8 py-4"
            >
              View on GitHub
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {features.map((feature, index) => (
              <div 
                key={feature}
                className="hero-card bg-secondary-800/30 backdrop-blur-sm border border-secondary-700 rounded-lg p-4 text-center"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <span className="text-sm font-medium text-secondary-200">{feature}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedCard
              title="3D Card Effect"
              description="Interactive 3D card with tilt and glow effects"
              className="hero-card"
            />
            <AnimatedCard
              title="Text Animations"
              description="Smooth typewriter and text reveal effects"
              className="hero-card"
            />
            <AnimatedCard
              title="Background Effects"
              description="Particle systems and animated backgrounds"
              className="hero-card"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
