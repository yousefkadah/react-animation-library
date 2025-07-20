// Shared layout for Docs and Component pages with responsive sidebar

import React, { useState } from 'react';
import DocsSidebar from './DocsSidebar';

interface DocsLayoutProps {
  children: React.ReactNode;
}

const DocsLayout: React.FC<DocsLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen relative">
      {/* Hamburger button for mobile */}
      <div className="md:hidden relative z-50">
        <button
          className="absolute top-4 left-4 p-2 rounded-lg bg-white dark:bg-secondary-900 shadow-lg border border-secondary-200 dark:border-secondary-700"
          aria-label="Open navigation"
          onClick={() => setSidebarOpen(true)}
        >
          <svg className="w-6 h-6 text-secondary-900 dark:text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Slide-in sidebar drawer for mobile */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-30"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close navigation overlay"
          />
          <aside className="fixed top-0 left-0 z-40 w-64 h-full bg-white dark:bg-secondary-900 border-r border-secondary-200 dark:border-secondary-700 shadow-lg transition-transform duration-300 transform translate-x-0 md:hidden">
            <div className="flex justify-end p-4">
              <button
                className="p-2 rounded-lg bg-secondary-100 dark:bg-secondary-800"
                aria-label="Close navigation"
                onClick={() => setSidebarOpen(false)}
              >
                <svg className="w-6 h-6 text-secondary-900 dark:text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <DocsSidebar mobile={true} onNavigate={() => setSidebarOpen(false)} />
          </aside>
        </>
      )}

      {/* Sidebar for md+ screens */}
      <aside className="hidden md:block">
        <DocsSidebar />
      </aside>

      <main className="flex-1 p-4 md:p-8">
        {children}
      </main>
    </div>
  );
};

export default DocsLayout;
