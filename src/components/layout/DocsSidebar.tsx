import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { clsx } from 'clsx'

const DocsSidebar = () => {
  const { componentName } = useParams<{ componentName: string }>()

  const componentCategories = [
    {
      category: 'Text Effects',
      components: [
        { name: 'Typewriter Effect', slug: 'typewriter' },
        { name: 'Text Reveal', slug: 'text-reveal' },
        { name: 'Gradient Text', slug: 'gradient-text' }
      ]
    },
    {
      category: 'Card Components',
      components: [
        { name: '3D Card', slug: 'card-3d' },
        { name: 'Glare Card', slug: 'glare-card' },
        { name: 'Flip Card', slug: 'flip-card' }
      ]
    },
    {
      category: 'Background Effects',
      components: [
        { name: 'Floating Particles', slug: 'particles' },
        { name: 'Wave Background', slug: 'wave-background' },
        { name: 'Background Gradient', slug: 'background-gradient' },
        { name: 'Parallax', slug: 'parallax' }
      ]
    },
    {
      category: 'UI Components',
      components: [
        { name: 'Loading Spinner', slug: 'spinner' },
        { name: 'Progress Bar', slug: 'progress-bar' },
        { name: 'Count Up Animation', slug: 'count-up' },
        { name: 'Enhanced Code Block', slug: 'enhanced-code-block' }
      ]
    },
    {
      category: 'Animation Utilities',
      components: [
        { name: 'Fade In', slug: 'fade-in' },
        { name: 'Slide In', slug: 'slide-in' }
      ]
    }
  ]

  return (
    <aside className="w-64 h-screen sticky top-16 overflow-y-auto transition-colors duration-300 bg-white border-r border-secondary-200 dark:bg-secondary-900 dark:border-secondary-700 flex-shrink-0">
      <div className="p-6">
        <div className="mb-8">
          <Link 
            to="/docs" 
            className="flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors mb-4"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to Overview
          </Link>
          <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">Components</h2>
        </div>

        <nav className="space-y-6">
          {componentCategories.map((category) => (
            <div key={category.category}>
              <h3 className="text-sm font-medium uppercase tracking-wider mb-3 text-secondary-600 dark:text-secondary-300">
                {category.category}
              </h3>
              <ul className="space-y-1">
                {category.components.map((component) => (
                  <li key={component.slug}>
                    <Link
                      to={`/docs/${component.slug}`}
                      className={clsx(
                        'block px-3 py-2 text-sm rounded-lg transition-colors',
                        componentName === component.slug
                          ? 'bg-primary-500/20 text-primary-300 border-l-2 border-primary-400'
                          : 'text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-white hover:bg-secondary-100 dark:hover:bg-secondary-800'
                      )}
                    >
                      {component.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="mt-8 pt-6 border-t transition-colors duration-300 border-secondary-200 dark:border-secondary-700">
          <div className="rounded-lg p-4 transition-colors duration-300 bg-secondary-100 dark:bg-secondary-800">
            <h4 className="text-sm font-medium mb-2 text-secondary-900 dark:text-white">Quick Install</h4>
            <code className="text-xs px-2 py-1 rounded transition-colors duration-300 text-secondary-600 bg-white dark:text-secondary-300 dark:bg-secondary-900">
              npm install react-gsap-animation-library
            </code>
          </div>
        </div>

        <div className="mt-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-colors text-sm text-secondary-600 dark:text-secondary-400 hover:text-primary-400"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            View on GitHub
          </a>
        </div>
      </div>
    </aside>
  )
}

export default DocsSidebar
