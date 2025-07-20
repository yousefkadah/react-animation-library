import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedCard from '../components/animations/AnimatedCard'
import DocsSidebar from '../components/layout/DocsSidebar'

gsap.registerPlugin(ScrollTrigger)

const DocsPage = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Page load animation
      gsap.fromTo('.docs-content', {
        opacity: 0,
        y: 30
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      })

      // Animate component cards
      gsap.fromTo('.component-card', {
        y: 50,
        opacity: 0,
        scale: 0.9
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.3
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const componentCategories = [
    {
      category: 'Text Effects',
      description: 'Animated text components for headlines and content',
      components: [
        {
          name: 'Typewriter Effect',
          description: 'Animated typing effect with cursor',
          slug: 'typewriter',
          props: ['text', 'speed', 'className']
        },
        {
          name: 'Text Reveal',
          description: 'Text that reveals on scroll',
          slug: 'text-reveal',
          props: ['text', 'direction', 'stagger']
        },
        {
          name: 'Gradient Text',
          description: 'Animated gradient text effects',
          slug: 'gradient-text',
          props: ['text', 'colors', 'animation']
        }
      ]
    },
    {
      category: 'Card Components',
      description: 'Interactive card components with hover effects',
      components: [
        {
          name: '3D Card',
          description: 'Interactive 3D card with tilt effects',
          slug: 'card-3d',
          props: ['title', 'description', 'tiltStrength']
        },
        {
          name: 'Glare Card',
          description: 'Card with mouse-following glare effect',
          slug: 'glare-card',
          props: ['title', 'content', 'glareColor']
        },
        {
          name: 'Flip Card',
          description: 'Card that flips to reveal back content',
          slug: 'flip-card',
          props: ['front', 'back', 'direction']
        }
      ]
    },
    {
      category: 'Background Effects',
      description: 'Animated backgrounds and particle systems',
      components: [
        {
          name: 'Floating Particles',
          description: 'Connected particle system background',
          slug: 'particles',
          props: ['count', 'color', 'connections']
        },
        {
          name: 'Wave Background',
          description: 'Animated wave patterns',
          slug: 'wave-background',
          props: ['amplitude', 'frequency', 'speed']
        },
        {
          name: 'Gradient Animation',
          description: 'Animated gradient backgrounds',
          slug: 'gradient-animation',
          props: ['colors', 'direction', 'speed']
        }
      ]
    },
    {
      category: 'UI Components',
      description: 'Interactive UI elements with animations',
      components: [
        {
          name: 'Loading Spinner',
          description: 'Customizable loading animations',
          slug: 'spinner',
          props: ['size', 'color', 'variant']
        },
        {
          name: 'Animated Button',
          description: 'Button with hover and click animations',
          slug: 'animated-button',
          props: ['variant', 'size', 'animation']
        },
        {
          name: 'Progress Bar',
          description: 'Animated progress indicators',
          slug: 'progress-bar',
          props: ['value', 'color', 'animation']
        }
      ]
    }
  ]

  return (
    <div className="flex min-h-screen">
      <DocsSidebar />
      <div ref={containerRef} className="flex-1">
        <div className="docs-content">
          <div className="border-b px-8 py-8 transition-colors duration-300 bg-white border-secondary-200 dark:bg-secondary-900 dark:border-secondary-700">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Component Documentation
            </h1>
            <p className="text-xl max-w-4xl text-secondary-600 dark:text-secondary-300">
              Explore our comprehensive collection of animated React components. 
              Each component comes with detailed documentation, customizable props, 
              and copy-paste ready source code.
            </p>
          </div>

          <div className="px-8 py-8">
            <div className="mb-12">
              <div className="card">
                <h2 className="text-2xl font-semibold mb-4 text-secondary-900 dark:text-white">
                  Quick Start
                </h2>
                <p className="mb-4 text-secondary-600 dark:text-secondary-300">
                  Install the library and start using components immediately:
                </p>
                <div className="code-block mb-4">
                  <code className="text-primary-300">
                    npm install react-gsap-animation-library
                  </code>
                </div>
                <div className="code-block">
                  <code className="text-secondary-200">
                    <span className="text-blue-400">import</span> {`{ TypewriterEffect }`} <span className="text-blue-400">from</span> <span className="text-green-400">'react-gsap-animation-library'</span>
                    <br />
                    <br />
                    <span className="text-purple-400">function</span> <span className="text-yellow-400">App</span>() {`{`}
                    <br />
                    &nbsp;&nbsp;<span className="text-blue-400">return</span> <span className="text-gray-400">&lt;</span><span className="text-red-400">TypewriterEffect</span> <span className="text-green-400">text</span>=<span className="text-green-400">"Hello World!"</span> <span className="text-green-400">speed</span>=<span className="text-orange-400">{`{100}`}</span> <span className="text-gray-400">/&gt;</span>
                    <br />
                    {`}`}
                  </code>
                </div>
              </div>
            </div>

            <div className="space-y-12">
              {componentCategories.map((category) => (
                <div key={category.category}>
                  <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-3 text-secondary-900 dark:text-white">
                    {category.category}
                  </h2>
                  <p className="text-lg text-secondary-600 dark:text-secondary-300">
                    {category.description}
                  </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.components.map((component) => (
                      <div key={component.name} className="component-card">
                        <AnimatedCard
                          title={component.name}
                          description={component.description}
                        >
                          <div className="mt-4">
                            <div className="flex flex-wrap gap-2 mb-4">
                              {component.props.map((prop) => (
                                <span
                                  key={prop}
                                  className="inline-block px-2 py-1 text-xs font-mono bg-secondary-700 text-secondary-200 rounded"
                                >
                                  {prop}
                                </span>
                              ))}
                            </div>
                            <Link
                              to={`/docs/${component.slug}`}
                              className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-medium transition-colors"
                            >
                              View Details
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </Link>
                          </div>
                        </AnimatedCard>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <div className="card max-w-2xl mx-auto">
              <h3 className="text-2xl font-semibold mb-4 text-secondary-900 dark:text-white">
                Need a Custom Component?
              </h3>
              <p className="mb-6 text-secondary-600 dark:text-secondary-300">
                Can't find what you're looking for? We're constantly adding new components 
                based on community feedback.
              </p>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Request Component
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DocsPage
