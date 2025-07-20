import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate features on scroll
      gsap.fromTo('.feature-item', {
        y: 50,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      // Animate icons
      gsap.fromTo('.feature-icon', {
        scale: 0,
        rotation: -180
      }, {
        scale: 1,
        rotation: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const features = [
    {
      icon: '⚡',
      title: 'GSAP Powered',
      description: 'Built on the industry-standard GSAP animation library for maximum performance and compatibility.'
    },
    {
      icon: '🎨',
      title: 'Highly Customizable',
      description: 'Every component comes with extensive props and styling options to match your design system.'
    },
    {
      icon: '📱',
      title: 'Responsive',
      description: 'All animations are optimized for mobile devices with smooth 60fps performance.'
    },
    {
      icon: '🔧',
      title: 'TypeScript Ready',
      description: 'Full TypeScript support with comprehensive type definitions for better development experience.'
    },
    {
      icon: '📋',
      title: 'Copy & Paste',
      description: 'Get the complete source code for each component with one click. No hidden dependencies.'
    },
    {
      icon: '🎯',
      title: 'Production Ready',
      description: 'Battle-tested components used in real-world applications with performance optimizations.'
    }
  ]

  return (
    <section ref={sectionRef} className="section-padding">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Why Choose Our Library?
          </h2>
          <p className="text-xl text-secondary-300 max-w-3xl mx-auto">
            Built by developers, for developers. Every component is crafted with attention to detail 
            and real-world use cases in mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={feature.title} className="feature-item card text-center">
              <div className="feature-icon text-4xl mb-4 inline-block">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-secondary-300 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="card max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Ready to get started?
            </h3>
            <p className="text-secondary-300 mb-6">
              Install our library and start building amazing animations in minutes.
            </p>
            <div className="code-block text-left">
              <code className="text-primary-300">
                npm install react-gsap-animation-library
              </code>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
