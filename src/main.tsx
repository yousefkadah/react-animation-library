import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import App from './App'
import './styles/globals.css'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        { index: true, lazy: async () => ({ Component: (await import('./docs/pages/HomePage')).default }) },
        {
          path: 'docs',
          lazy: async () => ({ Component: (await import('./docs/pages/DocsLayout')).default }),
          children: [
            { index: true, lazy: async () => ({ Component: (await import('./docs/pages/IntroductionPage')).default }) },
            { path: 'installation', lazy: async () => ({ Component: (await import('./docs/pages/InstallationPage')).default }) },
            { path: 'components', lazy: async () => ({ Component: (await import('./docs/pages/ComponentsIndexPage')).default }) },
            { path: 'components/:slug', lazy: async () => ({ Component: (await import('./docs/pages/ComponentPage')).default }) },
          ],
        },
        { path: '*', lazy: async () => ({ Component: (await import('./docs/pages/NotFoundPage')).default }) },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL.replace(/\/$/, '') || '/' },
)

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
