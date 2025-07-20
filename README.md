# React GSAP Animation Library

A powerful React animation component library built with GSAP, inspired by Aceternity UI. Create stunning, performant animations with copy-paste components.

## 🚀 Features

- **GSAP Powered**: Built on the industry-standard GSAP animation library
- **TypeScript Ready**: Full TypeScript support with comprehensive type definitions
- **Copy & Paste**: Get complete source code for each component
- **Highly Customizable**: Extensive props and styling options
- **Production Ready**: Battle-tested components with performance optimizations
- **Responsive**: All animations optimized for mobile devices
- **Modern Stack**: Built with React 18, TypeScript, and Tailwind CSS

## 🌐 Live Demo

Visit our [GitHub Pages demo](https://yousefkadah.github.io/react-animation-library/) to see all components in action!

## 📦 Installation

```bash
npm install react-gsap-animation-library gsap
```

Or with yarn:
```bash
yarn add react-gsap-animation-library gsap
```

## 🎯 Quick Start

```jsx
import React from 'react'
import { TypewriterEffect, AnimatedCard, FloatingParticles } from 'react-gsap-animation-library'

function App() {
  return (
    <div className="relative min-h-screen">
      <FloatingParticles />
      <div className="relative z-10 p-8">
        <TypewriterEffect 
          text="Welcome to React GSAP UI!" 
          speed={100} 
        />
        <AnimatedCard 
          title="3D Card" 
          description="Hover me for 3D effects!"
        />
      </div>
    </div>
  )
}
```

## 🧩 Available Components

### Text Effects
- **TypewriterEffect** - Animated typing effect with cursor
- **TextReveal** - Text that reveals on scroll with various animations
- **GradientText** - Animated gradient text effects

### Card Components
- **AnimatedCard** - Interactive 3D card with tilt effects
- **GlareCard** - Card with mouse-following glare effect
- **FlipCard** - Card that flips to reveal back content

### Background Effects
- **FloatingParticles** - Connected particle system background
- **WaveBackground** - Animated wave patterns
- **GradientAnimation** - Animated gradient backgrounds

### UI Components
- **LoadingSpinner** - Customizable loading animations
- **AnimatedButton** - Button with hover and click animations
- **ProgressBar** - Animated progress indicators

## 📖 Documentation

Visit our [documentation site](http://localhost:3000/docs) to explore all components with live demos, API references, and copy-paste code examples.

## 🎨 Component Categories

### Text Effects
Perfect for headlines, hero sections, and dynamic content presentation.

### Card Components
Interactive cards with sophisticated hover effects and 3D transformations.

### Background Effects
Ambient animations and particle systems for stunning backgrounds.

### UI Components
Essential UI elements enhanced with smooth animations.

## 🔧 Development

```bash
# Clone the repository
git clone https://github.com/your-username/react-gsap-animation-library.git

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Build library
npm run build:lib
```

## 📝 TypeScript Support

All components are built with TypeScript and include comprehensive type definitions:

```tsx
interface TypewriterEffectProps {
  text: string
  speed?: number
  className?: string
  onComplete?: () => void
}
```

## 🎯 Performance

- **60fps animations** - Smooth performance on all devices
- **Hardware acceleration** - GPU-optimized transformations
- **Minimal bundle size** - Tree-shakeable components
- **Memory efficient** - Proper cleanup and optimization

## 🌟 Examples

### Hero Section with Particles
```jsx
<div className="relative h-screen">
  <FloatingParticles />
  <div className="relative z-10 flex items-center justify-center h-full">
    <TypewriterEffect 
      text="Beautiful Animations Made Simple" 
      className="text-4xl font-bold"
    />
  </div>
</div>
```

### Interactive Card Grid
```jsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {cards.map((card) => (
    <AnimatedCard
      key={card.id}
      title={card.title}
      description={card.description}
    />
  ))}
</div>
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [GSAP](https://greensock.com/) - The animation library that powers everything
- [Aceternity UI](https://ui.aceternity.com/) - Inspiration for component designs
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Additional animation utilities

## 📞 Support

- 📖 [Documentation](http://localhost:3000/docs)
- 🐛 [Report Bug](https://github.com/your-username/react-gsap-animation-library/issues)
- 💡 [Request Feature](https://github.com/your-username/react-gsap-animation-library/issues)
- 💬 [Discussions](https://github.com/your-username/react-gsap-animation-library/discussions)

---

Made with ❤️ and GSAP
