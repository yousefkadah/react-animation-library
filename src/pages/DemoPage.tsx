import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import TypewriterEffect from '../components/animations/TypewriterEffect'
import AnimatedCard from '../components/animations/AnimatedCard'
import FloatingParticles from '../components/animations/FloatingParticles'
import TextReveal from '../components/animations/TextReveal'
import LoadingSpinner from '../components/animations/LoadingSpinner'
import GradientText from '../components/animations/GradientText'
import GlareCard from '../components/animations/GlareCard'
import FlipCard from '../components/animations/FlipCard'
import WaveBackground from '../components/animations/WaveBackground'
import CountUpAnimation from '../components/animations/CountUpAnimation'
import ProgressBar from '../components/animations/ProgressBar'
import SlideIn from '../components/animations/SlideIn'
import FadeIn from '../components/animations/FadeIn'
import Parallax from '../components/animations/Parallax'
import BackgroundGradient from '../components/animations/BackgroundGradient'

const DemoPage = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentDemo, setCurrentDemo] = useState(0)

  const demos = [
    {
      name: 'TypewriterEffect',
      component: (
        <TypewriterEffect
          text="Welcome to React GSAP Animation Library!"
          speed={50}
          className="text-4xl font-bold text-center"
        />
      ),
      description: 'Animated typing effect with customizable speed and cursor'
    },
    {
      name: 'FloatingParticles',
      component: (
        <div className="relative h-64 overflow-hidden rounded-lg bg-gradient-to-br from-purple-900 to-blue-900">
          <FloatingParticles count={50} />
          <div className="relative z-10 flex items-center justify-center h-full">
            <h3 className="text-white text-2xl font-bold">Floating Particles</h3>
          </div>
        </div>
      ),
      description: 'Interactive floating particles with mouse tracking'
    },
    {
      name: 'GradientText',
      component: (
        <GradientText className="text-5xl font-bold text-center">
          Beautiful Gradient Text
        </GradientText>
      ),
      description: 'Animated gradient text effects with smooth transitions'
    },
    {
      name: 'AnimatedCard',
      component: (
        <AnimatedCard
          title="3D Hover Card"
          description="This card responds to mouse movement with 3D transformations and lighting effects."
          className="max-w-md mx-auto"
        />
      ),
      description: '3D hover effects with tilt and lighting animations'
    },
    {
      name: 'GlareCard',
      component: (
        <GlareCard className="max-w-md mx-auto">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">Glare Effect Card</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Move your mouse over this card to see the beautiful glare effect.
            </p>
          </div>
        </GlareCard>
      ),
      description: 'Interactive glare effect that follows mouse movement'
    },
    {
      name: 'FlipCard',
      component: (
        <FlipCard
          frontContent={
            <div className="p-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg">
              <h3 className="text-xl font-bold">Front Side</h3>
              <p>Hover to flip!</p>
            </div>
          }
          backContent={
            <div className="p-6 bg-gradient-to-br from-green-500 to-teal-600 text-white rounded-lg">
              <h3 className="text-xl font-bold">Back Side</h3>
              <p>Amazing flip animation!</p>
            </div>
          }
          className="max-w-md mx-auto"
        />
      ),
      description: 'Smooth 3D flip animation on hover'
    },
    {
      name: 'CountUpAnimation',
      component: (
        <div className="text-center space-y-4">
          <CountUpAnimation
            end={1000}
            duration={2}
            className="text-4xl font-bold text-blue-600"
          />
          <p className="text-gray-600 dark:text-gray-300">Happy Users</p>
        </div>
      ),
      description: 'Animated number counter with customizable duration'
    },
    {
      name: 'ProgressBar',
      component: (
        <div className="space-y-4">
          <ProgressBar progress={75} label="React Skills" />
          <ProgressBar progress={90} label="TypeScript" color="green" />
          <ProgressBar progress={85} label="GSAP" color="purple" />
        </div>
      ),
      description: 'Animated progress bars with different colors and labels'
    },
    {
      name: 'LoadingSpinner',
      component: (
        <div className="flex flex-col items-center space-y-4">
          <LoadingSpinner size="lg" />
          <LoadingSpinner size="md" color="blue" />
          <LoadingSpinner size="sm" color="green" />
        </div>
      ),
      description: 'Customizable loading spinners in different sizes and colors'
    },
    {
      name: 'WaveBackground',
      component: (
        <div className="relative h-64 overflow-hidden rounded-lg">
          <WaveBackground />
          <div className="relative z-10 flex items-center justify-center h-full">
            <h3 className="text-white text-2xl font-bold">Wave Animation</h3>
          </div>
        </div>
      ),
      description: 'Animated wave background with smooth motion'
    }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.demo-container', {
        opacity: 0,
        y: 30
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      })
    }, containerRef)

    return () => ctx.revert()
  }, [currentDemo])

  return (
    <div ref={containerRef} className="min-h-screen pt-16 pb-8 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <TypewriterEffect
            text="Interactive Demo Playground"
            speed={50}
            className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4"
          />
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl sm:max-w-3xl mx-auto px-2">
            Explore all the animation components in action. Tap any component name below to see it in action!
          </p>
        </div>

        {/* Component Selector */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-wrap justify-center gap-2 mb-4 sm:mb-6">
            {demos.map((demo, index) => (
              <button
                key={demo.name}
                onClick={() => setCurrentDemo(index)}
                className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium text-sm sm:text-base transition-all duration-300 ${
                  currentDemo === index
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {demo.name}
              </button>
            ))}
          </div>
        </div>

        {/* Current Demo */}
        <div className="demo-container">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-8 mb-8">
            <div className="text-center mb-4 sm:mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">{demos[currentDemo].name}</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                {demos[currentDemo].description}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center min-h-[200px] sm:min-h-[300px]">
              {demos[currentDemo].component}
            </div>
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link
                  to={`/docs/${demos[currentDemo].name.toLowerCase()}`}
                  className="px-5 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
                >
                  View Documentation
                </Link>
                <button
                  onClick={() => setCurrentDemo((prev) => (prev + 1) % demos.length)}
                  className="px-5 py-2 sm:px-6 sm:py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Next Component
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* All Components Grid */}
        <div className="mt-10 sm:mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
            <GradientText text="All Components Overview" className="inline-block" />
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {demos.map((demo, index) => (
              <FadeIn key={demo.name} delay={index * 0.1}>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow flex flex-col h-full">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{demo.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm">
                    {demo.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                    <button
                      onClick={() => setCurrentDemo(index)}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Demo
                    </button>
                    <Link
                      to={`/docs/${demo.name.toLowerCase()}`}
                      className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      Docs
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-10 sm:mt-16 text-center">
          <BackgroundGradient className="rounded-2xl p-4 sm:p-8 max-w-2xl sm:max-w-4xl mx-auto">
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-white/90 mb-4 sm:mb-6 text-base sm:text-lg">
                Copy these components into your project and start building amazing animations!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link
                  to="/docs"
                  className="px-6 py-2 sm:px-8 sm:py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  View Documentation
                </Link>
                <a
                  href="https://github.com/yousefkadah/react-animation-library"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 sm:px-8 sm:py-3 bg-white/20 text-white rounded-lg font-medium hover:bg-white/30 transition-colors"
                >
                  GitHub Repository
                </a>
              </div>
            </div>
          </BackgroundGradient>
        </div>
      </div>
    </div>
  )
}

export default DemoPage
