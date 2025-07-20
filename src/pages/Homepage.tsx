import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from '../components/sections/Hero'
import ComponentShowcase from '../components/sections/ComponentShowcase'
import FeaturesSection from '../components/sections/FeaturesSection'
import Footer from '../components/layout/Footer'

gsap.registerPlugin(ScrollTrigger)

const Homepage = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Page load animation
      gsap.fromTo(
        '.page-content',
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out' }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="page-content">
      <Hero />
      <ComponentShowcase />
      <FeaturesSection />
      <Footer />
    </div>
  )
}

export default Homepage
