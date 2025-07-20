import React, { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
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
import EnhancedCodeBlock from '../components/animations/EnhancedCodeBlock'
import CodeBlock from '../components/ui/CodeBlock'
import DocsSidebar from '../components/layout/DocsSidebar'
import DocsLayout from '../components/layout/DocsLayout'

const ComponentPage = () => {
  const { componentName } = useParams<{ componentName: string }>()
  const containerRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)
  const [demoKey, setDemoKey] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.component-page-content', {
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
  }, [componentName])

  const componentData: { [key: string]: any } = {
    'typewriter': {
      name: 'Typewriter Effect',
      description: 'A smooth typewriter animation effect that simulates typing text character by character with a blinking cursor.',
      category: 'Text Effects',
      props: [
        { name: 'text', type: 'string', required: true, description: 'The text to be typed out' },
        { name: 'speed', type: 'number', required: false, default: '100', description: 'Typing speed in milliseconds' },
        { name: 'className', type: 'string', required: false, description: 'Additional CSS classes' },
        { name: 'onComplete', type: 'function', required: false, description: 'Callback function when typing is complete' }
      ],
      examples: [
        {
          title: 'Basic Usage',
          code: `<TypewriterEffect 
  text="Hello, World!" 
  speed={100} 
/>`
        },
        {
          title: 'With Custom Styling',
          code: `<TypewriterEffect 
  text="Welcome to React GSAP UI" 
  speed={50}
  className="text-4xl font-bold gradient-text"
  onComplete={() => console.log('Typing completed!')}
/>`
        }
      ],
      component: <TypewriterEffect text="Hello, I'm a typewriter effect!" speed={100} className="text-2xl" />
    },
    'text-reveal': {
      name: 'Text Reveal',
      description: 'Text animation that reveals words on scroll with customizable direction and stagger timing.',
      category: 'Text Effects',
      props: [
        { name: 'text', type: 'string', required: true, description: 'The text to be revealed' },
        { name: 'direction', type: 'string', required: false, default: 'up', description: 'Animation direction: up, down, left, right' },
        { name: 'stagger', type: 'number', required: false, default: '0.05', description: 'Delay between word animations' },
        { name: 'className', type: 'string', required: false, description: 'Additional CSS classes' },
        { name: 'once', type: 'boolean', required: false, default: 'true', description: 'Play animation only once' }
      ],
      examples: [
        {
          title: 'Basic Usage',
          code: `<TextReveal 
  text="This text reveals on scroll!" 
  direction="up" 
/>`
        },
        {
          title: 'Custom Direction and Stagger',
          code: `<TextReveal 
  text="Words appear from the left with custom timing" 
  direction="left"
  stagger={0.1}
  className="text-2xl font-bold"
  once={false}
/>`
        }
      ],
      component: (
        <div className="space-y-4">
          <TextReveal 
            text="This text reveals from below as you scroll!" 
            direction="up" 
            className="text-xl text-center"
          />
          <TextReveal 
            text="This one slides in from the left!" 
            direction="left" 
            stagger={0.08}
            className="text-lg text-center text-primary-400"
          />
        </div>
      )
    },
    'card-3d': {
      name: '3D Card Effect',
      description: 'An interactive 3D card component with mouse tracking, tilt effects, and glowing hover states.',
      category: 'Card Components',
      props: [
        { name: 'title', type: 'string', required: true, description: 'Card title' },
        { name: 'description', type: 'string', required: true, description: 'Card description' },
        { name: 'className', type: 'string', required: false, description: 'Additional CSS classes' },
        { name: 'children', type: 'ReactNode', required: false, description: 'Additional content inside the card' }
      ],
      examples: [
        {
          title: 'Basic Usage',
          code: `<AnimatedCard 
  title="3D Card" 
  description="Hover over me to see the 3D effect!" 
/>`
        },
        {
          title: 'With Custom Content',
          code: `<AnimatedCard 
  title="Interactive Card" 
  description="Card with additional content"
  className="max-w-sm"
>
  <button className="btn-primary mt-4">
    Learn More
  </button>
</AnimatedCard>`
        }
      ],
      component: (
        <AnimatedCard 
          title="3D Card Demo" 
          description="Hover over this card to see the 3D tilt effect in action!"
          className="max-w-md mx-auto"
        />
      )
    },
    'particles': {
      name: 'Floating Particles',
      description: 'An animated particle system that creates floating particles with connecting lines, perfect for backgrounds.',
      category: 'Background Effects',
      props: [
        { name: 'count', type: 'number', required: false, default: '50', description: 'Number of particles' },
        { name: 'color', type: 'string', required: false, default: 'blue', description: 'Particle color' },
        { name: 'connections', type: 'boolean', required: false, default: 'true', description: 'Show connecting lines' }
      ],
      examples: [
        {
          title: 'Basic Usage',
          code: `<div className="relative h-screen">
  <FloatingParticles />
  <div className="relative z-10">
    {/* Your content here */}
  </div>
</div>`
        },
        {
          title: 'Customized',
          code: `<div className="relative h-96 bg-gray-900">
  <FloatingParticles 
    count={30}
    color="purple"
    connections={true}
  />
  <div className="relative z-10 p-8">
    <h2>Content over particles</h2>
  </div>
</div>`
        }
      ],
      component: (
        <div className="relative h-64 bg-secondary-800 rounded-lg overflow-hidden">
          <FloatingParticles />
          <div className="relative z-10 flex items-center justify-center h-full">
            <p className="text-white">Floating particles background</p>
          </div>
        </div>
      )
    },
    'gradient-text': {
      name: 'Gradient Text',
      description: 'Animated gradient text effects with multiple animation styles and customizable colors.',
      category: 'Text Effects',
      props: [
        { name: 'text', type: 'string', required: true, description: 'The text to display with gradient' },
        { name: 'colors', type: 'string[]', required: false, default: "['#3b82f6', '#8b5cf6', '#ec4899']", description: 'Array of gradient colors' },
        { name: 'animation', type: 'string', required: false, default: 'shift', description: 'Animation type: none, wave, shift, pulse, rainbow' },
        { name: 'className', type: 'string', required: false, description: 'Additional CSS classes' },
        { name: 'speed', type: 'number', required: false, default: '3', description: 'Animation speed in seconds' }
      ],
      examples: [
        {
          title: 'Basic Usage',
          code: `<GradientText 
  text="Beautiful Gradient Text" 
  animation="shift" 
/>`
        },
        {
          title: 'Custom Colors and Animation',
          code: `<GradientText 
  text="Rainbow Animation" 
  colors={['#ff6b6b', '#4ecdc4', '#45b7d1']}
  animation="rainbow"
  speed={2}
  className="text-4xl"
/>`
        }
      ],
      component: (
        <div className="space-y-6 text-center">
          <GradientText 
            text="Shifting Gradient" 
            animation="shift" 
            className="text-3xl"
          />
          <GradientText 
            text="Wave Animation" 
            animation="wave" 
            colors={['#ff6b6b', '#4ecdc4', '#45b7d1']}
            className="text-2xl"
          />
          <GradientText 
            text="Pulsing Effect" 
            animation="pulse" 
            colors={['#ffd93d', '#6bcf7f']}
            className="text-2xl"
          />
          <GradientText 
            text="Rainbow Magic" 
            animation="rainbow" 
            speed={2}
            className="text-3xl"
          />
        </div>
      )
    },
    'glare-card': {
      name: 'Glare Card',
      description: 'An interactive card component with a mouse-following glare effect and subtle 3D tilt animations.',
      category: 'Card Components',
      props: [
        { name: 'title', type: 'string', required: true, description: 'Card title' },
        { name: 'content', type: 'string', required: true, description: 'Card content text' },
        { name: 'glareColor', type: 'string', required: false, default: '#3b82f6', description: 'Color of the glare effect' },
        { name: 'className', type: 'string', required: false, description: 'Additional CSS classes' },
        { name: 'children', type: 'ReactNode', required: false, description: 'Additional content inside the card' }
      ],
      examples: [
        {
          title: 'Basic Usage',
          code: `<GlareCard 
  title="Glare Effect Card" 
  content="Move your mouse over this card to see the glare effect!" 
/>`
        },
        {
          title: 'Custom Glare Color',
          code: `<GlareCard 
  title="Custom Glare" 
  content="This card has a custom purple glare effect"
  glareColor="#8b5cf6"
  className="max-w-md"
>
  <button className="btn-primary mt-4">
    Learn More
  </button>
</GlareCard>`
        }
      ],
      component: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <GlareCard 
            title="Blue Glare Effect" 
            content="Move your mouse over this card to see the beautiful glare effect following your cursor!"
            glareColor="#3b82f6"
          />
          <GlareCard 
            title="Purple Glare Effect" 
            content="This card showcases a custom purple glare with smooth animations and subtle tilt effects."
            glareColor="#8b5cf6"
          />
        </div>
      )
    },
    'flip-card': {
      name: 'Flip Card',
      description: 'An interactive card component that flips to reveal back content with smooth 3D animations.',
      category: 'Card Components',
      props: [
        { name: 'front', type: 'ReactNode', required: true, description: 'Content to display on the front of the card' },
        { name: 'back', type: 'ReactNode', required: true, description: 'Content to display on the back of the card' },
        { name: 'direction', type: 'string', required: false, default: 'horizontal', description: 'Flip direction: horizontal or vertical' },
        { name: 'className', type: 'string', required: false, description: 'Additional CSS classes' },
        { name: 'flipOnHover', type: 'boolean', required: false, default: 'false', description: 'Flip card on hover instead of click' }
      ],
      examples: [
        {
          title: 'Basic Usage',
          code: `<FlipCard 
  front={<div>Front Content</div>}
  back={<div>Back Content</div>}
  direction="horizontal"
/>`
        },
        {
          title: 'Flip on Hover with Custom Content',
          code: `<FlipCard 
  front={
    <div className="text-center">
      <h3 className="text-xl font-bold mb-2">Hover Me!</h3>
      <p>Move your mouse over this card</p>
    </div>
  }
  back={
    <div className="text-center">
      <h3 className="text-xl font-bold mb-2">Revealed!</h3>
      <button className="btn-primary">Click Me</button>
    </div>
  }
  direction="vertical"
  flipOnHover={true}
/>`
        }
      ],
      component: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <FlipCard 
            front={
              <div className="text-center p-4">
                <h3 className="text-xl font-bold mb-2 text-secondary-900 dark:text-white">Click to Flip</h3>
                <p className="text-secondary-600 dark:text-secondary-300">This card flips horizontally</p>
                <div className="mt-4 w-16 h-16 bg-primary-500 rounded-full mx-auto flex items-center justify-center">
                  <span className="text-white text-2xl">🎯</span>
                </div>
              </div>
            }
            back={
              <div className="text-center p-4">
                <h3 className="text-xl font-bold mb-2 text-secondary-900 dark:text-white">Back Side!</h3>
                <p className="text-secondary-600 dark:text-secondary-300">You flipped the card!</p>
                <button className="btn-primary mt-4">Action</button>
              </div>
            }
            direction="horizontal"
          />
          <FlipCard 
            front={
              <div className="text-center p-4">
                <h3 className="text-xl font-bold mb-2 text-secondary-900 dark:text-white">Hover Me</h3>
                <p className="text-secondary-600 dark:text-secondary-300">This card flips on hover vertically</p>
                <div className="mt-4 w-16 h-16 bg-green-500 rounded-full mx-auto flex items-center justify-center">
                  <span className="text-white text-2xl">🚀</span>
                </div>
              </div>
            }
            back={
              <div className="text-center p-4">
                <h3 className="text-xl font-bold mb-2 text-secondary-900 dark:text-white">Hover Effect!</h3>
                <p className="text-secondary-600 dark:text-secondary-300">Automatic flip on hover</p>
                <div className="mt-4 w-16 h-16 bg-purple-500 rounded-full mx-auto flex items-center justify-center">
                  <span className="text-white text-2xl">✨</span>
                </div>
              </div>
            }
            direction="vertical"
            flipOnHover={true}
          />
        </div>
      )
    },
    'wave-background': {
      name: 'Wave Background',
      description: 'Animated wave patterns with customizable amplitude, frequency, and colors perfect for dynamic backgrounds.',
      category: 'Background Effects',
      props: [
        { name: 'amplitude', type: 'number', required: false, default: '50', description: 'Wave height amplitude' },
        { name: 'frequency', type: 'number', required: false, default: '0.02', description: 'Wave frequency (density)' },
        { name: 'speed', type: 'number', required: false, default: '1', description: 'Animation speed multiplier' },
        { name: 'waveCount', type: 'number', required: false, default: '3', description: 'Number of wave layers' },
        { name: 'colors', type: 'string[]', required: false, default: "['#3b82f6', '#8b5cf6', '#ec4899']", description: 'Array of wave colors' },
        { name: 'className', type: 'string', required: false, description: 'Additional CSS classes' }
      ],
      examples: [
        {
          title: 'Basic Usage',
          code: `<div className="relative h-screen">
  <WaveBackground />
  <div className="relative z-10 flex items-center justify-center h-full">
    <h1>Content over waves</h1>
  </div>
</div>`
        },
        {
          title: 'Custom Wave Configuration',
          code: `<div className="relative h-96">
  <WaveBackground 
    amplitude={80}
    frequency={0.015}
    speed={0.5}
    waveCount={4}
    colors={['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4']}
  />
  <div className="relative z-10 p-8">
    <h2>Slow, tall waves</h2>
  </div>
</div>`
        }
      ],
      component: (
        <div className="space-y-6">
          <div className="relative h-64 rounded-lg overflow-hidden">
            <WaveBackground 
              amplitude={40}
              frequency={0.025}
              speed={1}
              waveCount={3}
              colors={['#3b82f6', '#8b5cf6', '#ec4899']}
            />
            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">Ocean Waves</h3>
                <p className="text-white/80">Default wave configuration</p>
              </div>
            </div>
          </div>
          
          <div className="relative h-64 rounded-lg overflow-hidden">
            <WaveBackground 
              amplitude={60}
              frequency={0.015}
              speed={0.7}
              waveCount={4}
              colors={['#ff6b6b', '#ffa726', '#66bb6a', '#42a5f5']}
            />
            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">Sunset Waves</h3>
                <p className="text-white/80">Custom colors and amplitude</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    'count-up': {
      name: 'Count Up Animation',
      description: 'Animated number counter that counts from one value to another with customizable formatting.',
      category: 'Utility Components',
      props: [
        { name: 'from', type: 'number', required: false, default: '0', description: 'Starting number' },
        { name: 'to', type: 'number', required: true, description: 'Target number to count to' },
        { name: 'duration', type: 'number', required: false, default: '2', description: 'Animation duration in seconds' },
        { name: 'prefix', type: 'string', required: false, default: '""', description: 'Text to display before the number' },
        { name: 'suffix', type: 'string', required: false, default: '""', description: 'Text to display after the number' },
        { name: 'separator', type: 'string', required: false, default: '","', description: 'Thousands separator' },
        { name: 'decimals', type: 'number', required: false, default: '0', description: 'Number of decimal places' },
        { name: 'trigger', type: 'string', required: false, default: 'viewport', description: 'When to start animation: viewport or immediate' },
        { name: 'className', type: 'string', required: false, description: 'Additional CSS classes' }
      ],
      examples: [
        {
          title: 'Basic Usage',
          code: `<CountUpAnimation 
  to={1000} 
  duration={2}
/>`
        },
        {
          title: 'With Formatting',
          code: `<CountUpAnimation 
  from={0}
  to={99.95}
  duration={3}
  prefix="$"
  decimals={2}
  className="text-4xl text-green-500"
/>`
        }
      ],
      component: (
        <div className="text-center space-y-6">
          <div>
            <CountUpAnimation to={1000} duration={2} className="text-4xl font-bold text-primary-500" />
            <p className="text-sm text-secondary-600 dark:text-secondary-300 mt-2">Users</p>
          </div>
          <div>
            <CountUpAnimation to={99.95} prefix="$" decimals={2} duration={2.5} className="text-3xl font-bold text-green-500" />
            <p className="text-sm text-secondary-600 dark:text-secondary-300 mt-2">Revenue</p>
          </div>
          <div>
            <CountUpAnimation to={50000} suffix="+" duration={3} className="text-3xl font-bold text-blue-500" />
            <p className="text-sm text-secondary-600 dark:text-secondary-300 mt-2">Downloads</p>
          </div>
        </div>
      )
    },
    'progress-bar': {
      name: 'Progress Bar',
      description: 'Animated progress bar with customizable colors, sizes, and animation effects.',
      category: 'UI Components',
      props: [
        { name: 'value', type: 'number', required: true, description: 'Current progress value' },
        { name: 'max', type: 'number', required: false, default: '100', description: 'Maximum value' },
        { name: 'height', type: 'string', required: false, default: 'md', description: 'Bar height: sm, md, lg' },
        { name: 'color', type: 'string', required: false, default: 'primary', description: 'Progress color theme' },
        { name: 'showPercentage', type: 'boolean', required: false, default: 'true', description: 'Show percentage text' },
        { name: 'animated', type: 'boolean', required: false, default: 'true', description: 'Enable animation' },
        { name: 'duration', type: 'number', required: false, default: '1.5', description: 'Animation duration' },
        { name: 'className', type: 'string', required: false, description: 'Additional CSS classes' }
      ],
      examples: [
        {
          title: 'Basic Usage',
          code: `<ProgressBar 
  value={75} 
  color="primary"
/>`
        },
        {
          title: 'Different Styles',
          code: `<div className="space-y-4">
  <ProgressBar value={90} color="green" height="sm" />
  <ProgressBar value={60} color="blue" height="lg" />
  <ProgressBar value={45} color="orange" showPercentage={false} />
</div>`
        }
      ],
      component: (
        <div className="space-y-6">
          <ProgressBar value={85} color="primary" height="md" />
          <ProgressBar value={70} color="green" height="sm" />
          <ProgressBar value={95} color="blue" height="lg" />
          <ProgressBar value={60} color="purple" showPercentage={false} />
        </div>
      )
    },
    'slide-in': {
      name: 'Slide In',
      description: 'Slide animation wrapper that animates children elements from different directions.',
      category: 'Utility Components',
      props: [
        { name: 'children', type: 'ReactNode', required: true, description: 'Content to animate' },
        { name: 'direction', type: 'string', required: false, default: 'up', description: 'Animation direction: left, right, up, down' },
        { name: 'distance', type: 'number', required: false, default: '50', description: 'Distance to slide in pixels' },
        { name: 'duration', type: 'number', required: false, default: '0.8', description: 'Animation duration' },
        { name: 'delay', type: 'number', required: false, default: '0', description: 'Animation delay' },
        { name: 'trigger', type: 'string', required: false, default: 'viewport', description: 'Animation trigger: viewport or immediate' },
        { name: 'once', type: 'boolean', required: false, default: 'true', description: 'Play animation only once' },
        { name: 'className', type: 'string', required: false, description: 'Additional CSS classes' }
      ],
      examples: [
        {
          title: 'Basic Usage',
          code: `<SlideIn direction="left">
  <div className="card">
    <h3>Slides in from left</h3>
  </div>
</SlideIn>`
        },
        {
          title: 'Multiple Directions',
          code: `<div className="grid grid-cols-2 gap-4">
  <SlideIn direction="left" delay={0.1}>
    <div className="card">From Left</div>
  </SlideIn>
  <SlideIn direction="right" delay={0.2}>
    <div className="card">From Right</div>
  </SlideIn>
</div>`
        }
      ],
      component: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SlideIn direction="left" trigger="immediate">
            <div className="card p-6 text-center">
              <h3 className="text-lg font-bold mb-2 text-secondary-900 dark:text-white">From Left</h3>
              <p className="text-secondary-600 dark:text-secondary-300">Slides in from the left side</p>
            </div>
          </SlideIn>
          <SlideIn direction="right" trigger="immediate" delay={0.2}>
            <div className="card p-6 text-center">
              <h3 className="text-lg font-bold mb-2 text-secondary-900 dark:text-white">From Right</h3>
              <p className="text-secondary-600 dark:text-secondary-300">Slides in from the right side</p>
            </div>
          </SlideIn>
        </div>
      )
    },
    'fade-in': {
      name: 'Fade In',
      description: 'Fade animation wrapper with optional scale and blur effects for smooth element transitions.',
      category: 'Utility Components',
      props: [
        { name: 'children', type: 'ReactNode', required: true, description: 'Content to animate' },
        { name: 'duration', type: 'number', required: false, default: '0.8', description: 'Animation duration' },
        { name: 'delay', type: 'number', required: false, default: '0', description: 'Animation delay' },
        { name: 'trigger', type: 'string', required: false, default: 'viewport', description: 'Animation trigger: viewport or immediate' },
        { name: 'once', type: 'boolean', required: false, default: 'true', description: 'Play animation only once' },
        { name: 'stagger', type: 'number', required: false, default: '0', description: 'Stagger delay for child elements' },
        { name: 'scale', type: 'boolean', required: false, default: 'false', description: 'Add scale effect' },
        { name: 'blur', type: 'boolean', required: false, default: 'false', description: 'Add blur effect' },
        { name: 'className', type: 'string', required: false, description: 'Additional CSS classes' }
      ],
      examples: [
        {
          title: 'Basic Usage',
          code: `<FadeIn>
  <div className="card">
    <h3>Fades in smoothly</h3>
  </div>
</FadeIn>`
        },
        {
          title: 'With Effects',
          code: `<FadeIn scale={true} blur={true} duration={1.2}>
  <img src="/image.jpg" alt="Hero" />
</FadeIn>`
        }
      ],
      component: (
        <div className="space-y-6">
          <FadeIn trigger="immediate">
            <div className="card p-6 text-center">
              <h3 className="text-lg font-bold mb-2 text-secondary-900 dark:text-white">Simple Fade</h3>
              <p className="text-secondary-600 dark:text-secondary-300">Basic fade in animation</p>
            </div>
          </FadeIn>
          <FadeIn scale={true} trigger="immediate" delay={0.3}>
            <div className="card p-6 text-center">
              <h3 className="text-lg font-bold mb-2 text-secondary-900 dark:text-white">Fade + Scale</h3>
              <p className="text-secondary-600 dark:text-secondary-300">Fade in with scale effect</p>
            </div>
          </FadeIn>
        </div>
      )
    },
    'parallax': {
      name: 'Parallax',
      description: 'Scroll-based parallax effect that moves elements at different speeds for depth perception.',
      category: 'Scroll Effects',
      props: [
        { name: 'children', type: 'ReactNode', required: true, description: 'Content to apply parallax effect' },
        { name: 'speed', type: 'number', required: false, default: '0.5', description: 'Parallax speed multiplier' },
        { name: 'direction', type: 'string', required: false, default: 'up', description: 'Movement direction: up, down, left, right' },
        { name: 'scale', type: 'number', required: false, default: '0', description: 'Scale change during scroll' },
        { name: 'rotate', type: 'number', required: false, default: '0', description: 'Rotation change during scroll' },
        { name: 'opacity', type: 'boolean', required: false, default: 'false', description: 'Enable opacity change' },
        { name: 'className', type: 'string', required: false, description: 'Additional CSS classes' }
      ],
      examples: [
        {
          title: 'Basic Usage',
          code: `<Parallax speed={0.5} direction="up">
  <img src="/background.jpg" alt="Background" />
</Parallax>`
        },
        {
          title: 'Complex Effect',
          code: `<Parallax 
  speed={0.3} 
  direction="up" 
  scale={0.2} 
  rotate={10}
>
  <div className="hero-content">
    <h1>Parallax Title</h1>
  </div>
</Parallax>`
        }
      ],
      component: (
        <div className="w-full">
          <div className="mb-4 text-center">
            <p className="text-sm text-secondary-600 dark:text-secondary-300 mb-2">
              👆 Scroll in the container below to see the parallax effect
            </p>
          </div>
          <div className="relative h-80 overflow-y-auto bg-secondary-100 dark:bg-secondary-800 rounded-lg border">
            {/* Scrollable content with parallax elements */}
            <div className="h-[120vh] relative">
              {/* Background parallax layer */}
              <Parallax speed={0.3} direction="down">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/30 to-purple-600/30" />
              </Parallax>
              
              {/* Floating elements with different parallax speeds */}
              <Parallax speed={0.6} direction="up">
                <div className="absolute top-20 left-8 w-16 h-16 bg-primary-500 rounded-full opacity-70 flex items-center justify-center">
                  <span className="text-white font-bold">0.6</span>
                </div>
              </Parallax>
              
              <Parallax speed={0.2} direction="down">
                <div className="absolute top-32 right-12 w-12 h-12 bg-green-500 rounded-full opacity-70 flex items-center justify-center">
                  <span className="text-white text-sm">0.2</span>
                </div>
              </Parallax>
              
              <Parallax speed={0.8} direction="up">
                <div className="absolute top-64 left-1/3 w-20 h-20 bg-purple-500 rounded-full opacity-70 flex items-center justify-center">
                  <span className="text-white font-bold">0.8</span>
                </div>
              </Parallax>
              
              <Parallax speed={0.4} direction="left">
                <div className="absolute top-80 right-8 w-14 h-14 bg-orange-500 rounded-full opacity-70 flex items-center justify-center">
                  <span className="text-white text-sm">0.4</span>
                </div>
              </Parallax>
              
              <Parallax speed={0.7} direction="right">
                <div className="absolute top-96 left-12 w-18 h-18 bg-blue-500 rounded-full opacity-70 flex items-center justify-center">
                  <span className="text-white text-sm">0.7</span>
                </div>
              </Parallax>
              
              {/* Static content for reference */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
                <div className="bg-white/90 dark:bg-secondary-900/90 p-6 rounded-lg backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-2">Parallax Elements</h3>
                  <p className="text-secondary-600 dark:text-secondary-300 text-sm mb-2">
                    Each circle moves at different speeds
                  </p>
                  <p className="text-xs text-secondary-500 dark:text-secondary-400">
                    Numbers indicate parallax speed multiplier
                  </p>
                </div>
              </div>
              
              {/* Bottom content */}
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center">
                <div className="bg-white/80 dark:bg-secondary-900/80 p-4 rounded-lg">
                  <p className="text-secondary-600 dark:text-secondary-300 text-sm">
                    🎉 You've reached the bottom!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    'spinner': {
      name: 'Loading Spinner',
      description: 'Customizable loading animations with multiple variants and GSAP-powered smooth animations.',
      category: 'UI Components',
      props: [
        { name: 'size', type: 'string', required: false, default: 'md', description: 'Spinner size: sm, md, lg, xl' },
        { name: 'color', type: 'string', required: false, default: 'primary', description: 'Spinner color theme' },
        { name: 'variant', type: 'string', required: false, default: 'spin', description: 'Animation variant: spin, pulse, bounce, dots' },
        { name: 'className', type: 'string', required: false, description: 'Additional CSS classes' }
      ],
      examples: [
        {
          title: 'Basic Usage',
          code: `<LoadingSpinner 
  size="md" 
  variant="spin" 
/>`
        },
        {
          title: 'Different Variants',
          code: `<div className="flex space-x-4">
  <LoadingSpinner variant="spin" color="primary" />
  <LoadingSpinner variant="pulse" color="blue" />
  <LoadingSpinner variant="bounce" color="green" />
  <LoadingSpinner variant="dots" color="red" />
</div>`
        }
      ],
      component: (
        <div className="grid grid-cols-3 gap-10">
          {/* Modern and creative loading spinners */}
          <div className="flex flex-col items-center justify-center min-h-[120px]">
            <LoadingSpinner variant="spin" size="lg" color="primary" />
            <span className="text-xs mt-2 text-secondary-600 dark:text-secondary-300 text-center">Classic Spin</span>
          </div>
          <div className="flex flex-col items-center justify-center min-h-[120px]">
            {/* Dual ring spinner - both rings spin (one clockwise, one counterclockwise) */}
            <div className="relative w-12 h-12">
              <span className="absolute inset-0 rounded-full border-4 border-primary-500 border-t-transparent animate-spin" style={{ animationDuration: '1s' }} />
              <span className="absolute inset-2 rounded-full border-2 border-blue-400 border-b-transparent animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
            </div>
            <span className="text-xs mt-2 text-secondary-600 dark:text-secondary-300 text-center">Dual Ring</span>
          </div>
          <div className="flex flex-col items-center justify-center min-h-[120px]">
            {/* Dots wave */}
            <div className="flex items-end gap-1 h-8">
              {[0, 1, 2, 3, 4].map(i => (
                <span
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary-500 animate-bounce"
                  style={{
                    animationDelay: `${i * 0.12}s`,
                    animationDuration: '0.8s'
                  }}
                />
              ))}
            </div>
            <span className="text-xs mt-2 text-secondary-600 dark:text-secondary-300 text-center">Wave Dots</span>
          </div>
          <div className="flex flex-col items-center justify-center min-h-[120px]">
            {/* Bar loader */}
            <div className="flex gap-1 h-8">
              {[0, 1, 2, 3].map(i => (
                <span
                  key={i}
                  className="w-1.5 rounded bg-blue-500 animate-pulse"
                  style={{
                    height: `${8 + i * 8}px`,
                    animationDelay: `${i * 0.15}s`,
                    animationDuration: '1s'
                  }}
                />
              ))}
            </div>
            <span className="text-xs mt-2 text-secondary-600 dark:text-secondary-300 text-center">Bar Loader</span>
          </div>
          <div className="flex flex-col items-center justify-center min-h-[120px]">
            {/* Orbit spinner - dot orbits around the center */}
            <div className="relative w-12 h-12 flex items-center justify-center">
              <span className="absolute w-8 h-8 border-2 border-dashed border-primary-500 rounded-full animate-spin" style={{ animationDuration: '1.2s' }} />
              <span className="absolute left-1/2 top-1/2 w-3 h-3 bg-blue-400 rounded-full animate-orbit-dot"
                style={{
                  transform: 'rotate(0deg) translateY(-16px) translateX(-50%)',
                  transformOrigin: '50% 50%',
                  animation: 'orbit-dot-spin 1.2s linear infinite'
                }}
              />
              {/* Orbit dot animation keyframes */}
              <style>
                {`
                  @keyframes orbit-dot-spin {
                    100% { transform: rotate(360deg) translateY(-16px) translateX(-50%); }
                  }
                `}
              </style>
            </div>
            <span className="text-xs mt-2 text-secondary-600 dark:text-secondary-300 text-center">Orbit</span>
          </div>
          <div className="flex flex-col items-center justify-center min-h-[120px]">
            {/* Growing dot */}
            <span className="w-6 h-6 bg-primary-500 rounded-full animate-ping" style={{ animationDuration: '1.2s' }} />
            <span className="text-xs mt-2 text-secondary-600 dark:text-secondary-300 text-center">Growing Dot</span>
          </div>
          <div className="flex flex-col items-center justify-center min-h-[120px]">
            {/* Ripple */}
            <div className="relative w-10 h-10 flex items-center justify-center">
              <span className="absolute w-10 h-10 border-2 border-primary-500 rounded-full animate-ping" style={{ animationDuration: '1.2s' }} />
              <span className="absolute w-6 h-6 bg-primary-500 rounded-full opacity-80" />
            </div>
            <span className="text-xs mt-2 text-secondary-600 dark:text-secondary-300 text-center">Ripple</span>
          </div>
          <div className="flex flex-col items-center justify-center min-h-[120px]">
            {/* Ellipsis */}
            <div className="flex gap-1">
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary-500 animate-bounce"
                  style={{
                    animationDelay: `${i * 0.18}s`,
                    animationDuration: '0.9s'
                  }}
                />
              ))}
            </div>
            <span className="text-xs mt-2 text-secondary-600 dark:text-secondary-300 text-center">Ellipsis</span>
          </div>
          <div className="flex flex-col items-center justify-center min-h-[120px]">
            {/* Flip square */}
            <span className="block w-6 h-6 bg-primary-500 rounded animate-spin" style={{
              animationDuration: '1.2s',
              borderRadius: '0.25rem',
              transform: 'rotateY(0deg)'
            }} />
            <span className="text-xs mt-2 text-secondary-600 dark:text-secondary-300 text-center">Flip Square</span>
          </div>
        </div>
      )
    },
    'background-gradient': {
      name: 'Background Gradient',
      description: 'Animated gradient backgrounds with multiple directions and animation styles for creating dynamic visual effects.',
      category: 'Background Effects',
      props: [
        { name: 'colors', type: 'string[]', required: false, default: "['#3b82f6', '#8b5cf6', '#ec4899']", description: 'Array of gradient colors' },
        { name: 'direction', type: 'string', required: false, default: 'horizontal', description: 'Gradient direction: horizontal, vertical, radial, conic' },
        { name: 'animation', type: 'string', required: false, default: 'shift', description: 'Animation type: none, shift, rotate, pulse, wave' },
        { name: 'speed', type: 'number', required: false, default: '3', description: 'Animation speed in seconds' },
        { name: 'className', type: 'string', required: false, description: 'Additional CSS classes' },
        { name: 'children', type: 'ReactNode', required: false, description: 'Content to display over the gradient' }
      ],
      examples: [
        {
          title: 'Basic Usage',
          code: `<div className="h-64 rounded-lg overflow-hidden">
  <BackgroundGradient 
    colors={['#3b82f6', '#8b5cf6', '#ec4899']}
    direction="horizontal"
    animation="shift"
  />
</div>`
        },
        {
          title: 'With Content Overlay',
          code: `<div className="h-96 rounded-lg overflow-hidden">
  <BackgroundGradient 
    colors={['#ff6b6b', '#4ecdc4', '#45b7d1']}
    direction="radial"
    animation="pulse"
    speed={2}
  >
    <div className="flex items-center justify-center h-full">
      <h2 className="text-white text-4xl font-bold">
        Your Content Here
      </h2>
    </div>
  </BackgroundGradient>
</div>`
        }
      ],
      component: (
        <div className="space-y-6">
          <div className="h-48 rounded-lg overflow-hidden">
            <BackgroundGradient 
              colors={['#3b82f6', '#8b5cf6', '#ec4899']}
              direction="horizontal"
              animation="shift"
              speed={3}
            >
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">Horizontal Shift</h3>
                  <p className="text-white/80">Gradient shifts left and right</p>
                </div>
              </div>
            </BackgroundGradient>
          </div>
          
          <div className="h-48 rounded-lg overflow-hidden">
            <BackgroundGradient 
              colors={['#ff6b6b', '#ffa726', '#66bb6a']}
              direction="radial"
              animation="pulse"
              speed={2}
            >
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">Radial Pulse</h3>
                  <p className="text-white/80">Pulsing radial gradient</p>
                </div>
              </div>
            </BackgroundGradient>
          </div>
          
          <div className="h-48 rounded-lg overflow-hidden">
            <BackgroundGradient 
              colors={['#e91e63', '#9c27b0', '#673ab7', '#3f51b5']}
              direction="conic"
              animation="rotate"
              speed={4}
            >
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">Conic Rotation</h3>
                  <p className="text-white/80">Rotating conic gradient</p>
                </div>
              </div>
            </BackgroundGradient>
          </div>
        </div>
      )
    },
    'enhanced-code-block': {
      name: 'Enhanced Code Block',
      description: 'Advanced code block component with syntax highlighting, tabs support, line highlighting, and copy functionality inspired by modern code editors.',
      category: 'UI Components',
      props: [
        { name: 'language', type: 'string', required: true, description: 'Programming language for syntax highlighting' },
        { name: 'code', type: 'string', required: false, description: 'Code content to display (required if tabs not provided)' },
        { name: 'tabs', type: 'TabConfig[]', required: false, description: 'Array of tab configurations (required if code not provided)' },
        { name: 'filename', type: 'string', required: false, description: 'Filename to display in header' },
        { name: 'highlightLines', type: 'number[]', required: false, default: '[]', description: 'Array of line numbers to highlight' },
        { name: 'showCopyButton', type: 'boolean', required: false, default: 'true', description: 'Show copy to clipboard button' },
        { name: 'showLineNumbers', type: 'boolean', required: false, default: 'true', description: 'Show line numbers' },
        { name: 'className', type: 'string', required: false, description: 'Additional CSS classes' }
      ],
      examples: [
        {
          title: 'Basic Code Block',
          code: `<EnhancedCodeBlock 
  language="javascript"
  filename="example.js"
  code={\`const greeting = "Hello, World!";
console.log(greeting);\`}
/>`
        },
        {
          title: 'With Line Highlighting',
          code: `<EnhancedCodeBlock 
  language="jsx"
  filename="Component.jsx"
  highlightLines={[2, 4, 6]}
  code={\`import React from 'react';

const Component = () => {
  return (
    <div className="example">
      <h1>Hello World</h1>
    </div>
  );
};

export default Component;\`}
/>`
        },
        {
          title: 'Multiple Tabs',
          code: `<EnhancedCodeBlock 
  language="javascript"
  tabs={[
    {
      name: 'app.js',
      code: 'console.log("Main app");',
      language: 'javascript'
    },
    {
      name: 'styles.css',
      code: '.app { color: blue; }',
      language: 'css'
    },
    {
      name: 'index.html',
      code: '<div class="app">Hello</div>',
      language: 'html'
    }
  ]}
/>`
        }
      ],
      component: (
        <div className="space-y-6">
          <EnhancedCodeBlock 
            language="javascript"
            filename="example.js"
            code={`const DummyComponent = () => {
  const [count, setCount] = React.useState(0);

  const handleClick = () => {
    setCount(prev => prev + 1);
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Counter</h2>
      <p className="mb-2">Count: {count}</p>
      <button 
        onClick={handleClick}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Increment
      </button>
    </div>
  );
};`}
            highlightLines={[3, 5, 6, 11]}
          />
          
          <EnhancedCodeBlock 
            language="javascript"
            tabs={[
              {
                name: 'Component.jsx',
                code: `import React, { useState } from 'react';

export const Counter = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
};`,
                language: 'jsx',
                highlightLines: [4, 8, 9]
              },
              {
                name: 'styles.css',
                code: `.counter {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: white;
}

.counter button {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.counter button:hover {
  background: #2563eb;
}`,
                language: 'css',
                highlightLines: [8, 9, 10, 11, 12, 13, 14]
              },
              {
                name: 'index.html',
                code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Counter App</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div id="root"></div>
  <script src="Component.jsx"></script>
</body>
</html>`,
                language: 'html',
                highlightLines: [7, 10, 11]
              }
            ]}
          />
        </div>
      )
    }
  }

  const component = componentData[componentName || '']

  if (!component) {
    return (
      <DocsLayout>
        <div className="container">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-secondary-900 dark:text-white mb-4">Component Not Found</h1>
            <p className="text-secondary-600 dark:text-secondary-300 mb-8">
              The component "{componentName}" doesn't exist or hasn't been implemented yet.
            </p>
            <Link to="/docs" className="btn-primary">
              Back to Documentation
            </Link>
          </div>
        </div>
      </DocsLayout>
    )
  }

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getFullSourceCode = (componentName: string) => {
    switch (componentName) {
      case 'typewriter':
        return `import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { clsx } from 'clsx'

interface TypewriterEffectProps {
  text: string
  speed?: number
  className?: string
  onComplete?: () => void
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  text,
  speed = 100,
  className,
  onComplete
}) => {
  const textRef = useRef<HTMLSpanElement>(null)
  const [displayText, setDisplayText] = useState('')
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (!textRef.current) return

    let currentIndex = 0
    const typeText = () => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1))
        currentIndex++
        setTimeout(typeText, speed)
      } else {
        onComplete?.()
      }
    }

    typeText()

    // Cursor blinking animation
    const ctx = gsap.context(() => {
      gsap.to('.cursor', {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      })
    }, textRef)

    return () => ctx.revert()
  }, [text, speed, onComplete])

  return (
    <span ref={textRef} className={clsx('inline-block', className)}>
      {displayText}
      <span className="cursor">|</span>
    </span>
  )
}

export default TypewriterEffect`

      case 'text-reveal':
        return `import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { clsx } from 'clsx'

gsap.registerPlugin(ScrollTrigger)

interface TextRevealProps {
  text: string
  direction?: 'up' | 'down' | 'left' | 'right'
  stagger?: number
  className?: string
  once?: boolean
}

const TextReveal: React.FC<TextRevealProps> = ({
  text,
  direction = 'up',
  stagger = 0.05,
  className,
  once = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const wordsRef = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    const words = wordsRef.current.filter(Boolean)
    
    const initialState: any = { opacity: 0 }
    const animateState: any = { opacity: 1 }

    switch (direction) {
      case 'up':
        initialState.y = 50
        animateState.y = 0
        break
      case 'down':
        initialState.y = -50
        animateState.y = 0
        break
      case 'left':
        initialState.x = 50
        animateState.x = 0
        break
      case 'right':
        initialState.x = -50
        animateState.x = 0
        break
    }

    gsap.set(words, initialState)

    const ctx = gsap.context(() => {
      gsap.to(words, {
        ...animateState,
        duration: 0.8,
        stagger: stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: once ? 'play none none none' : 'play none none reverse'
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [direction, stagger, once])

  const words = text.split(' ')

  return (
    <div ref={containerRef} className={clsx('inline-block', className)}>
      {words.map((word, index) => (
        <span
          key={index}
          ref={el => {
            if (el) wordsRef.current[index] = el
          }}
          className="inline-block mr-1"
        >
          {word}
        </span>
      ))}
    </div>
  )
}

export default TextReveal`

      case 'gradient-text':
        return `import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { clsx } from 'clsx'

interface GradientTextProps {
  text: string
  colors?: string[]
  animation?: 'none' | 'wave' | 'shift' | 'pulse' | 'rainbow'
  className?: string
  speed?: number
}

const GradientText: React.FC<GradientTextProps> = ({
  text,
  colors = ['#3b82f6', '#8b5cf6', '#ec4899'],
  animation = 'shift',
  className,
  speed = 3
}) => {
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!textRef.current || animation === 'none') return

    const element = textRef.current

    const ctx = gsap.context(() => {
      switch (animation) {
        case 'wave':
          gsap.to(element, {
            backgroundPosition: '200% 0%',
            duration: speed,
            repeat: -1,
            ease: 'none'
          })
          break

        case 'shift':
          gsap.to(element, {
            backgroundPosition: '200% center',
            duration: speed,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut'
          })
          break

        case 'pulse':
          gsap.to(element, {
            filter: 'brightness(1.3) saturate(1.2)',
            duration: speed / 2,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut'
          })
          break

        case 'rainbow':
          const colors = [
            'linear-gradient(45deg, #ff0000, #ff7700)',
            'linear-gradient(45deg, #ff7700, #ffdd00)',
            'linear-gradient(45deg, #ffdd00, #00ff00)',
            'linear-gradient(45deg, #00ff00, #0099ff)',
            'linear-gradient(45deg, #0099ff, #6633ff)',
            'linear-gradient(45deg, #6633ff, #ff0099)'
          ]
          
          const tl = gsap.timeline({ repeat: -1 })
          colors.forEach((color, index) => {
            tl.to(element, {
              background: color,
              duration: speed / colors.length,
              ease: 'power2.inOut'
            })
          })
          break
      }
    }, textRef)

    return () => ctx.revert()
  }, [animation, speed])

  const gradientStyle = React.useMemo(() => {
    if (animation === 'rainbow') {
      return {
        background: 'linear-gradient(45deg, #ff0000, #ff7700)',
        backgroundSize: '200% 200%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        display: 'inline-block'
      }
    }

    const gradientColors = colors.join(', ')
    return {
      background: \`linear-gradient(45deg, \${gradientColors})\`,
      backgroundSize: animation === 'wave' ? '200% 200%' : '400% 400%',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      display: 'inline-block'
    }
  }, [colors, animation])

  return (
    <span
      ref={textRef}
      className={clsx('font-bold', className)}
      style={gradientStyle}
    >
      {text}
    </span>
  )
}

export default GradientText`

      case 'card-3d':
        return `import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { clsx } from 'clsx'

interface AnimatedCardProps {
  title: string
  description: string
  className?: string
  children?: React.ReactNode
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  title,
  description,
  className,
  children
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const glow = glowRef.current

    if (!card || !glow) return

    const handleMouseEnter = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gsap.to(card, {
        rotationX: (y - rect.height / 2) / 10,
        rotationY: (x - rect.width / 2) / 10,
        transformPerspective: 1000,
        duration: 0.3,
        ease: 'power2.out'
      })

      gsap.to(glow, {
        opacity: 0.6,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gsap.to(card, {
        rotationX: (y - rect.height / 2) / 10,
        rotationY: (x - rect.width / 2) / 10,
        duration: 0.1,
        ease: 'power2.out'
      })

      gsap.set(glow, {
        background: \`radial-gradient(circle at \${x}px \${y}px, rgba(59, 130, 246, 0.3), transparent 50%)\`
      })
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: 'power2.out'
      })

      gsap.to(glow, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div 
      ref={cardRef}
      className={clsx(
        'relative card hover:border-primary-500/50 transition-colors duration-300 cursor-pointer',
        'transform-gpu will-change-transform',
        className
      )}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div 
        ref={glowRef}
        className="absolute inset-0 rounded-xl opacity-0 pointer-events-none"
      />
      
      <div className="relative z-10">
        <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">{title}</h3>
        <p className="text-secondary-600 dark:text-secondary-300 text-sm">{description}</p>
        {children}
      </div>
    </div>
  )
}

export default AnimatedCard`

      case 'glare-card':
        return `import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { clsx } from 'clsx'

interface GlareCardProps {
  title: string
  content: string
  glareColor?: string
  className?: string
  children?: React.ReactNode
}

const GlareCard: React.FC<GlareCardProps> = ({
  title,
  content,
  glareColor = '#3b82f6',
  className,
  children
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const glare = glareRef.current

    if (!card || !glare) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const xPercent = (x / rect.width) * 100
      const yPercent = (y / rect.height) * 100

      gsap.set(glare, {
        background: \`radial-gradient(circle 200px at \${xPercent}% \${yPercent}%, \${glareColor}40, transparent 50%)\`,
        opacity: 1
      })

      const tiltX = (yPercent - 50) / 25
      const tiltY = (xPercent - 50) / 25

      gsap.to(card, {
        rotationX: tiltX,
        rotationY: tiltY,
        duration: 0.3,
        ease: 'power2.out',
        transformPerspective: 1000
      })
    }

    const handleMouseEnter = () => {
      gsap.to(glare, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      })

      gsap.to(card, {
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    const handleMouseLeave = () => {
      gsap.to(glare, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out'
      })

      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out'
      })
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [glareColor])

  return (
    <div 
      ref={cardRef}
      className={clsx(
        'relative card cursor-pointer overflow-hidden',
        'transform-gpu will-change-transform',
        className
      )}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div 
        ref={glareRef}
        className="absolute inset-0 opacity-0 pointer-events-none rounded-xl"
        style={{
          background: \`radial-gradient(circle 200px at 50% 50%, \${glareColor}40, transparent 50%)\`
        }}
      />
      
      <div className="relative z-10">
        <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">{title}</h3>
        <p className="text-secondary-600 dark:text-secondary-300 mb-4">{content}</p>
        {children}
      </div>
    </div>
  )
}

export default GlareCard`

      case 'flip-card':
        return `import React, { useRef, useState } from 'react'
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

    gsap.to(frontRef.current, {
      [rotationAxis]: frontRotation,
      duration: 0.6,
      ease: 'power2.inOut'
    })

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

export default FlipCard`

      case 'particles':
        return `import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface FloatingParticlesProps {
  count?: number
  color?: string
  connections?: boolean
}

const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  count = 50,
  color = 'blue',
  connections = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<any[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const colorMap: { [key: string]: string } = {
      blue: '#3b82f6',
      purple: '#8b5cf6',
      pink: '#ec4899',
      green: '#10b981',
      red: '#ef4444'
    }

    const particleColor = colorMap[color] || color

    // Initialize particles
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1
    }))

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particlesRef.current.forEach((particle, i) => {
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particleColor
        ctx.fill()

        // Draw connections
        if (connections) {
          particlesRef.current.slice(i + 1).forEach(otherParticle => {
            const dx = particle.x - otherParticle.x
            const dy = particle.y - otherParticle.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 100) {
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              ctx.strokeStyle = particleColor
              ctx.globalAlpha = 1 - distance / 100
              ctx.stroke()
              ctx.globalAlpha = 1
            }
          })
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [count, color, connections])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  )
}

export default FloatingParticles`

      case 'wave-background':
        return `import React, { useEffect, useRef } from 'react'
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
          path += \` L \${x} \${y}\`
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
              id={\`waveGradient\${index}\`}
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
            fill={\`url(#waveGradient\${index})\`}
            style={{
              transform: \`translateY(\${index * 20}px)\`,
              filter: 'blur(1px)'
            }}
          />
        ))}
      </svg>
    </div>
  )
}

export default WaveBackground`

      case 'count-up':
        return `import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { clsx } from 'clsx'

gsap.registerPlugin(ScrollTrigger)

interface CountUpAnimationProps {
  from?: number
  to: number
  duration?: number
  prefix?: string
  suffix?: string
  separator?: string
  decimals?: number
  className?: string
  trigger?: 'viewport' | 'immediate'
  onComplete?: () => void
}

const CountUpAnimation: React.FC<CountUpAnimationProps> = ({
  from = 0,
  to,
  duration = 2,
  prefix = '',
  suffix = '',
  separator = ',',
  decimals = 0,
  className,
  trigger = 'viewport',
  onComplete
}) => {
  const numberRef = useRef<HTMLSpanElement>(null)
  const [displayValue, setDisplayValue] = useState(from)

  const formatNumber = (value: number) => {
    const formattedValue = value.toFixed(decimals)
    const parts = formattedValue.split('.')
    parts[0] = parts[0].replace(/\\B(?=(\\d{3})+(?!\\d))/g, separator)
    return parts.join('.')
  }

  useEffect(() => {
    if (!numberRef.current) return

    const animateNumber = () => {
      const obj = { value: from }

      gsap.to(obj, {
        value: to,
        duration: duration,
        ease: 'power2.out',
        onUpdate: () => {
          setDisplayValue(obj.value)
        },
        onComplete: () => {
          onComplete?.()
        }
      })
    }

    if (trigger === 'immediate') {
      animateNumber()
    } else {
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: numberRef.current,
          start: 'top 80%',
          onEnter: animateNumber,
          once: true
        })
      }, numberRef)

      return () => ctx.revert()
    }
  }, [from, to, duration, trigger, onComplete])

  return (
    <span ref={numberRef} className={clsx('font-bold', className)}>
      {prefix}{formatNumber(displayValue)}{suffix}
    </span>
  )
}

export default CountUpAnimation`

      case 'progress-bar':
        return `import React, { useEffect, useRef, useState } from 'react'
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
        width: \`\${percentage}%\`,
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
          style={!animated ? { width: \`\${percentage}%\` } : undefined}
        >
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

export default ProgressBar`

      case 'slide-in':
        return `import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { clsx } from 'clsx'

gsap.registerPlugin(ScrollTrigger)

interface SlideInProps {
  children: React.ReactNode
  direction?: 'left' | 'right' | 'up' | 'down'
  distance?: number
  duration?: number
  delay?: number
  trigger?: 'viewport' | 'immediate'
  once?: boolean
  className?: string
}

const SlideIn: React.FC<SlideInProps> = ({
  children,
  direction = 'up',
  distance = 50,
  duration = 0.8,
  delay = 0,
  trigger = 'viewport',
  once = true,
  className
}) => {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const element = elementRef.current

    // Set initial position based on direction
    const initialState: any = { opacity: 0 }
    const animateState: any = { opacity: 1 }

    switch (direction) {
      case 'left':
        initialState.x = -distance
        animateState.x = 0
        break
      case 'right':
        initialState.x = distance
        animateState.x = 0
        break
      case 'up':
        initialState.y = distance
        animateState.y = 0
        break
      case 'down':
        initialState.y = -distance
        animateState.y = 0
        break
    }

    gsap.set(element, initialState)

    const animateElement = () => {
      gsap.to(element, {
        ...animateState,
        duration: duration,
        delay: delay,
        ease: 'power3.out'
      })
    }

    if (trigger === 'immediate') {
      animateElement()
    } else {
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: element,
          start: 'top 80%',
          onEnter: animateElement,
          onLeaveBack: once ? undefined : () => {
            gsap.set(element, initialState)
          },
          once: once
        })
      }, elementRef)

      return () => ctx.revert()
    }
  }, [direction, distance, duration, delay, trigger, once])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

export default SlideIn`

      case 'fade-in':
        return `import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { clsx } from 'clsx'

gsap.registerPlugin(ScrollTrigger)

interface FadeInProps {
  children: React.ReactNode
  duration?: number
  delay?: number
  trigger?: 'viewport' | 'immediate'
  once?: boolean
  stagger?: number
  scale?: boolean
  blur?: boolean
  className?: string
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  duration = 0.8,
  delay = 0,
  trigger = 'viewport',
  once = true,
  stagger = 0,
  scale = false,
  blur = false,
  className
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const elements = stagger > 0 ? 
      Array.from(container.children) : 
      [container]

    // Set initial state
    const initialState: any = { opacity: 0 }
    const animateState: any = { opacity: 1 }

    if (scale) {
      initialState.scale = 0.8
      animateState.scale = 1
    }

    if (blur) {
      initialState.filter = 'blur(10px)'
      animateState.filter = 'blur(0px)'
    }

    gsap.set(elements, initialState)

    const animateElements = () => {
      gsap.to(elements, {
        ...animateState,
        duration: duration,
        delay: delay,
        stagger: stagger,
        ease: 'power3.out'
      })
    }

    if (trigger === 'immediate') {
      animateElements()
    } else {
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: container,
          start: 'top 80%',
          onEnter: animateElements,
          onLeaveBack: once ? undefined : () => {
            gsap.set(elements, initialState)
          },
          once: once
        })
      }, containerRef)

      return () => ctx.revert()
    }
  }, [duration, delay, trigger, once, stagger, scale, blur])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}

export default FadeIn`

      case 'parallax':
        return `import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { clsx } from 'clsx'

gsap.registerPlugin(ScrollTrigger)

interface ParallaxProps {
  children: React.ReactNode
  speed?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  scale?: number
  rotate?: number
  opacity?: boolean
  className?: string
}

const Parallax: React.FC<ParallaxProps> = ({
  children,
  speed = 0.5,
  direction = 'up',
  scale = 0,
  rotate = 0,
  opacity = false,
  className
}) => {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const element = elementRef.current

    const ctx = gsap.context(() => {
      // Calculate movement based on direction
      let xMovement = 0
      let yMovement = 0

      switch (direction) {
        case 'up':
          yMovement = -100 * speed
          break
        case 'down':
          yMovement = 100 * speed
          break
        case 'left':
          xMovement = -100 * speed
          break
        case 'right':
          xMovement = 100 * speed
          break
      }

      const animation: any = {}

      if (xMovement !== 0) animation.x = xMovement
      if (yMovement !== 0) animation.y = yMovement
      if (scale !== 0) animation.scale = 1 + scale
      if (rotate !== 0) animation.rotation = rotate
      if (opacity) {
        animation.opacity = 0.3
      }

      gsap.to(element, {
        ...animation,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })
    }, elementRef)

    return () => ctx.revert()
  }, [speed, direction, scale, rotate, opacity])

  return (
    <div 
      ref={elementRef} 
      className={clsx('will-change-transform', className)}
    >
      {children}
    </div>
  )
}

export default Parallax`

      case 'spinner':
        return `import React, { useEffect, useRef } from 'react'
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

export default LoadingSpinner`

      case 'background-gradient':
        return `import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { clsx } from 'clsx'

interface BackgroundGradientProps {
  colors?: string[]
  direction?: 'horizontal' | 'vertical' | 'radial' | 'conic'
  animation?: 'none' | 'shift' | 'rotate' | 'pulse' | 'wave'
  speed?: number
  className?: string
  children?: React.ReactNode
}

const BackgroundGradient: React.FC<BackgroundGradientProps> = ({
  colors = ['#3b82f6', '#8b5cf6', '#ec4899'],
  direction = 'horizontal',
  animation = 'shift',
  speed = 3,
  className,
  children
}) => {
  const gradientRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gradientRef.current || animation === 'none') return

    const element = gradientRef.current

    const ctx = gsap.context(() => {
      switch (animation) {
        case 'shift':
          gsap.to(element, {
            backgroundPosition: '200% center',
            duration: speed,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut'
          })
          break

        case 'rotate':
          if (direction === 'conic') {
            gsap.to(element, {
              background: \`conic-gradient(from 0deg at 50% 50%, \${colors.join(', ')}, \${colors[0]})\`,
              duration: 0,
              repeat: -1,
              onRepeat: function() {
                const rotation = (this.totalTime() * 360 / speed) % 360
                gsap.set(element, {
                  background: \`conic-gradient(from \${rotation}deg at 50% 50%, \${colors.join(', ')}, \${colors[0]})\`
                })
              }
            })
          } else {
            gsap.to(element, {
              backgroundPosition: '200% 200%',
              duration: speed,
              repeat: -1,
              ease: 'none'
            })
          }
          break

        case 'pulse':
          gsap.to(element, {
            filter: 'brightness(1.3) saturate(1.2)',
            duration: speed / 2,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut'
          })
          break

        case 'wave':
          gsap.to(element, {
            backgroundPosition: '400% center',
            duration: speed,
            repeat: -1,
            ease: 'none'
          })
          break
      }
    }, gradientRef)

    return () => ctx.revert()
  }, [colors, direction, animation, speed])

  const getGradientStyle = () => {
    const colorString = colors.join(', ')
    let backgroundSize = '200% 200%'
    
    switch (direction) {
      case 'horizontal':
        return {
          background: \`linear-gradient(90deg, \${colorString})\`,
          backgroundSize: animation === 'wave' ? '400% 100%' : backgroundSize
        }
      case 'vertical':
        return {
          background: \`linear-gradient(180deg, \${colorString})\`,
          backgroundSize: animation === 'wave' ? '100% 400%' : backgroundSize
        }
      case 'radial':
        return {
          background: \`radial-gradient(circle, \${colorString})\`,
          backgroundSize: animation === 'wave' ? '400% 400%' : backgroundSize
        }
      case 'conic':
        return {
          background: \`conic-gradient(from 0deg at 50% 50%, \${colorString}, \${colors[0]})\`,
          backgroundSize: '100% 100%'
        }
      default:
        return {
          background: \`linear-gradient(45deg, \${colorString})\`,
          backgroundSize
        }
    }
  }

  return (
    <div
      ref={gradientRef}
      className={clsx(
        'relative w-full h-full',
        className
      )}
      style={getGradientStyle()}
    >
      {children && (
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      )}
    </div>
  )
}

export default BackgroundGradient`

      case 'enhanced-code-block':
        return `import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { clsx } from 'clsx'

interface TabConfig {
  name: string
  code: string
  language?: string
  highlightLines?: number[]
}

type EnhancedCodeBlockProps = {
  language: string
  filename?: string
  highlightLines?: number[]
  className?: string
  showCopyButton?: boolean
  showLineNumbers?: boolean
} & (
  | {
      code: string
      tabs?: never
    }
  | {
      code?: never
      tabs: TabConfig[]
    }
)

const EnhancedCodeBlock: React.FC<EnhancedCodeBlockProps> = ({
  language,
  filename,
  code,
  tabs = [],
  highlightLines = [],
  className,
  showCopyButton = true,
  showLineNumbers = true
}) => {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState(0)

  const tabsExist = tabs.length > 0

  const copyToClipboard = async () => {
    const textToCopy = tabsExist ? tabs[activeTab].code : code
    if (textToCopy) {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const activeCode = tabsExist ? tabs[activeTab].code : code
  const activeLanguage = tabsExist
    ? tabs[activeTab].language || language
    : language
  const activeHighlightLines = tabsExist
    ? tabs[activeTab].highlightLines || []
    : highlightLines

  // Copy and Check icons as SVG components
  const CopyIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 5.00005C7.01165 5.00005 6.49359 5.01782 6.09202 5.21799C5.71569 5.40973 5.40973 5.71569 5.21799 6.09202C5.01782 6.49359 5 7.01165 5 8.00005V16C5 16.9884 5.01782 17.5065 5.21799 17.908C5.40973 18.2843 5.71569 18.5903 6.09202 18.782C6.49359 18.9822 7.01165 19 8 19H16C16.9884 19 17.5065 18.9822 17.908 18.782C18.2843 18.5903 18.5903 18.2843 18.782 17.908C18.9822 17.5065 19 16.9884 19 16V8.00005C19 7.01165 18.9822 6.49359 18.782 6.09202C18.5903 5.71569 18.2843 5.40973 17.908 5.21799C17.5065 5.01782 16.9884 5.00005 16 5.00005H8Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M8 3C9.9319 3 10.3983 3.00275 11.5277 3.048C12.6439 3.09263 13.2609 3.27677 13.7236 3.52786C14.2454 3.80611 14.6973 4.18982 14.9871 4.73056C15.2668 5.2387 15.4612 5.95139 15.4612 7V17H8C7.00319 17 6.90085 16.9927 6.5277 16.952C5.95139 16.8388 5.2387 16.6332 4.73056 16.2764C4.18982 15.9027 3.80611 15.4546 3.52786 14.9264C3.27677 14.4391 3.09263 13.7561 3.048 12.5277C3.00275 11.3017 3 9.9319 3 8V7C3 5.95139 3.1388 5.2387 3.52786 4.73056C3.80611 4.18982 4.24546 3.80611 4.73056 3.52786C5.2387 3.27677 5.95139 3.09263 7.4723 3.048C8.1098 3.00275 8.7927 3 8 3Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  )

  const CheckIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 12.75L11.25 15L15 9.75M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )

  return (
    <div className={clsx('relative w-full rounded-lg bg-slate-900 p-4 font-mono text-sm shadow-xl', className)}>
      <div className="flex flex-col gap-2">
        {/* Tabs */}
        {tabsExist && (
          <div className="flex overflow-x-auto border-b border-slate-700 pb-2">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={clsx(
                  'px-3 py-2 text-xs transition-colors font-sans whitespace-nowrap',
                  activeTab === index
                    ? 'text-white border-b-2 border-blue-500'
                    : 'text-zinc-400 hover:text-zinc-200'
                )}
              >
                {tab.name}
              </button>
            ))}
          </div>
        )}

        {/* Header with filename and copy button */}
        {(filename || showCopyButton) && (
          <div className="flex justify-between items-center py-2">
            {filename && (
              <div className="text-xs text-zinc-400 font-sans">{filename}</div>
            )}
            {showCopyButton && (
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors font-sans px-2 py-1 rounded hover:bg-slate-800"
                title={copied ? 'Copied!' : 'Copy code'}
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Code Block */}
      <div className="relative">
        <SyntaxHighlighter
          language={activeLanguage}
          style={atomDark}
          customStyle={{
            margin: 0,
            padding: 0,
            background: 'transparent',
            fontSize: '0.875rem',
            fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace'
          }}
          wrapLines={true}
          showLineNumbers={showLineNumbers}
          lineNumberStyle={{
            color: '#6b7280',
            fontSize: '0.75rem',
            paddingRight: '1rem',
            userSelect: 'none'
          }}
          lineProps={(lineNumber) => ({
            style: {
              backgroundColor: activeHighlightLines.includes(lineNumber)
                ? 'rgba(59, 130, 246, 0.1)'
                : 'transparent',
              display: 'block',
              width: '100%',
              borderLeft: activeHighlightLines.includes(lineNumber) 
                ? '3px solid #3b82f6'
                : '3px solid transparent',
              paddingLeft: '0.5rem'
            },
          })}
          PreTag="div"
        >
          {String(activeCode)}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}

export default EnhancedCodeBlock`

      default:
        return `// Component not found
// Please check the component name and try again`
    }
  }

  const fullComponentCode = getFullSourceCode(componentName || '')

  return (
    <DocsLayout>
      <div ref={containerRef} className="flex-1 min-w-0">
        <div className="component-page-content">
          {/* Header */}
          <div className="border-b px-4 md:px-8 py-4 md:py-6 transition-colors duration-300 bg-white border-secondary-200 dark:bg-secondary-900 dark:border-secondary-700">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary-900 dark:text-white break-words">
                {component.name}
              </h1>
              <span className="px-2 py-1 text-xs sm:text-sm font-medium bg-primary-500/20 text-primary-300 rounded-full w-fit">
                {component.category}
              </span>
            </div>
            <p className="text-base md:text-lg max-w-full md:max-w-4xl text-secondary-600 dark:text-secondary-300">
              {component.description}
            </p>
          </div>

          {/* Live Demo - Full Width */}
          <div className="border-b transition-colors duration-300 bg-gradient-to-br from-secondary-50 to-white border-secondary-200 dark:from-secondary-800 dark:to-secondary-900 dark:border-secondary-700">
            <div className="px-8 py-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-secondary-900 dark:text-white">Live Demo</h2>
              <button
                onClick={() => setDemoKey(prev => prev + 1)}
                className="flex items-center gap-2 px-4 py-2 bg-primary-500/20 text-primary-300 hover:bg-primary-500/30 rounded-lg transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Replay Animation
              </button>
            </div>
            <div className="px-8 pb-12">
              <div className="rounded-xl p-12 min-h-[400px] flex items-center justify-center border transition-colors duration-300 bg-white/80 border-secondary-300 dark:bg-secondary-900/50 dark:border-secondary-700">
                <div key={demoKey} className="w-full max-w-2xl">
                  {component.component}
                </div>
              </div>
            </div>
          </div>

          <div className="px-8 py-8 space-y-12">

            {/* Installation */}
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-secondary-900 dark:text-white">Installation</h2>
              <div className="card">
                <p className="text-secondary-600 dark:text-secondary-300 mb-4">
                  Install the library via npm:
                </p>
                <CodeBlock code="npm install react-gsap-animation-library" language="bash" />
              </div>
            </div>

            {/* Usage Examples */}
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-secondary-900 dark:text-white">Usage Examples</h2>
              <div className="space-y-6">
                {component.examples.map((example: any, index: number) => (
                  <div key={index} className="card">
                    <h3 className="text-lg font-semibold mb-4 text-secondary-900 dark:text-white">
                      {example.title}
                    </h3>
                    <CodeBlock code={example.code} language="jsx" />
                  </div>
                ))}
              </div>
            </div>

            {/* Complete Component Code */}
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-secondary-900 dark:text-white">Full Source Code</h2>
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-secondary-600 dark:text-secondary-300">
                    Complete component source code ready to copy:
                  </p>
                  <button
                    onClick={() => copyToClipboard(fullComponentCode)}
                    className={`p-2 rounded-lg transition-colors flex items-center justify-center ${
                      copied 
                        ? 'bg-green-500/20 text-green-300' 
                        : 'bg-primary-500/20 text-primary-300 hover:bg-primary-500/30'
                    }`}
                    title={copied ? 'Copied!' : 'Copy code'}
                  >
                    {copied ? (
                      // Check icon
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M9 12.75L11.25 15L15 9.75M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      // Copy icon
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M8 5.00005C7.01165 5.00005 6.49359 5.01782 6.09202 5.21799C5.71569 5.40973 5.40973 5.71569 5.21799 6.09202C5.01782 6.49359 5 7.01165 5 8.00005V16C5 16.9884 5.01782 17.5065 5.21799 17.908C5.40973 18.2843 5.71569 18.5903 6.09202 18.782C6.49359 18.9822 7.01165 19 8 19H16C16.9884 19 17.5065 18.9822 17.908 18.782C18.2843 18.5903 18.5903 18.2843 18.782 17.908C18.9822 17.5065 19 16.9884 19 16V8.00005C19 7.01165 18.9822 6.49359 18.782 6.09202C18.5903 5.71569 18.2843 5.40973 17.908 5.21799C17.5065 5.01782 16.9884 5.00005 16 5.00005H8Z"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="M8 3C9.9319 3 10.3983 3.00275 11.5277 3.048C12.6439 3.09263 13.2609 3.27677 13.7236 3.52786C14.2454 3.80611 14.6973 4.18982 14.9871 4.73056C15.2668 5.2387 15.4612 5.95139 15.4612 7V17H8C7.00319 17 6.90085 16.9927 6.5277 16.952C5.95139 16.8388 5.2387 16.6332 4.73056 16.2764C4.18982 15.9027 3.80611 15.4546 3.52786 14.9264C3.27677 14.4391 3.09263 13.7561 3.048 12.5277C3.00275 11.3017 3 9.9319 3 8V7C3 5.95139 3.1388 5.2387 3.52786 4.73056C3.80611 4.18982 4.24546 3.80611 4.73056 3.52786C5.2387 3.27677 5.95139 3.09263 7.4723 3.048C8.1098 3.00275 8.7927 3 8 3Z"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                <CodeBlock code={fullComponentCode} language="jsx" />
              </div>
            </div>

            {/* Props API */}
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-secondary-900 dark:text-white">Props</h2>
              <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                    <tr className="border-b transition-colors duration-300 border-secondary-200 dark:border-secondary-700">
                      <th className="text-left py-3 px-4 font-semibold text-secondary-900 dark:text-white">Prop</th>
                      <th className="text-left py-3 px-4 font-semibold text-secondary-900 dark:text-white">Type</th>
                      <th className="text-left py-3 px-4 font-semibold text-secondary-900 dark:text-white">Required</th>
                      <th className="text-left py-3 px-4 font-semibold text-secondary-900 dark:text-white">Default</th>
                      <th className="text-left py-3 px-4 font-semibold text-secondary-900 dark:text-white">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {component.props.map((prop: any, index: number) => (
                        <tr key={index} className="border-b transition-colors duration-300 border-secondary-200/50 dark:border-secondary-700/50">
                          <td className="py-3 px-4 font-mono text-primary-600 dark:text-primary-300">{prop.name}</td>
                          <td className="py-3 px-4 font-mono text-secondary-700 dark:text-secondary-300">{prop.type}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              prop.required 
                                ? 'bg-red-500/20 text-red-600 dark:text-red-300' 
                                : 'bg-secondary-200 text-secondary-700 dark:bg-secondary-600 dark:text-secondary-300'
                            }`}>
                              {prop.required ? 'Required' : 'Optional'}
                            </span>
                          </td>
                        <td className="py-3 px-4 font-mono text-secondary-600 dark:text-secondary-300">
                          {prop.default || '-'}
                        </td>
                        <td className="py-3 px-4 text-secondary-600 dark:text-secondary-300">{prop.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-8 border-t transition-colors duration-300 border-secondary-200 dark:border-secondary-700">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                View Source on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </DocsLayout>
  )
}

export default ComponentPage
