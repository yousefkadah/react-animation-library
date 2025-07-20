import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Homepage from './pages/Homepage'
import DocsPage from './pages/DocsPage'
import ComponentPage from './pages/ComponentPage'

function App() {
  return (
    <div className="min-h-screen transition-colors duration-300 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/docs/:componentName" element={<ComponentPage />} />
      </Routes>
    </div>
  )
}

export default App
