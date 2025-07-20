import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedCard from '../animations/AnimatedCard'
import TypewriterEffect from '../animations/TypewriterEffect'

gsap.registerPlugin(ScrollTrigger)

const ComponentShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards on scroll
      gsap.fromTo('.showcase-card', {
        y: 60,
        opacity: 0,
        scale: 0.9
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      })

      // Animate section title
      gsap.fromTo('.showcase-title', {
        y: 30,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const components = [
    {
      title: '3D Card Effect',
      description: 'Interactive 3D card with mouse tracking and tilt effects',
      category: 'Cards',
      demo: 'card-3d',
    },
    {
      title: 'Typewriter Effect',
      description: 'Smooth typewriter animation with customizable speed',
      category: 'Text',
      demo: 'typewriter',
    },
    {
      title: 'Floating Particles',
      description: 'Animated particle system with connections',
      category: 'Background',
      demo: 'particles',
    },
    {
      title: 'Scroll Reveal',
      description: 'Elements animate into view on scroll',
      category: 'Animation',
      demo: 'scroll-reveal',
    },
    {
      title: 'Hover Border Gradient',
      description: 'Animated gradient border that follows mouse',
      category: 'Effects',
      demo: 'hover-border',
    },
    {
      title: 'Loading Spinner',
      description: 'Smooth GSAP-powered loading animations',
      category: 'UI',
      demo: 'spinner',
    }
  ]

  return (
    <section ref={sectionRef} className="section-padding bg-secondary-900/50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="showcase-title text-4xl md:text-5xl font-bold gradient-text mb-6">
            Component Library
          </h2>
          <p className="showcase-title text-xl text-secondary-300 max-w-3xl mx-auto">
            Explore our collection of animated components. Each component is built with GSAP 
            for maximum performance and comes with customizable props.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {components.map((component, index) => (
            <div key={component.title} className="showcase-card">
              <AnimatedCard
                title={component.title}
                description={component.description}
              >
                <div className="mt-4 flex items-center justify-between">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-primary-500/20 text-primary-300 rounded-full">
                    {component.category}
                  </span>
                  <Link 
                    to={`/docs/${component.demo}`}
                    className="text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors"
                  >
                    View Code →
                  </Link>
                </div>
              </AnimatedCard>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link 
            to="/docs" 
            className="inline-flex items-center gap-2 btn-primary text-lg px-8 py-4"
          >
            View All Components
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ComponentShowcase
