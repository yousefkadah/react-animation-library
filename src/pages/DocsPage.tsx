import React from 'react';
import DocsSidebar from '../components/layout/DocsSidebar';

const DocsPage = () => {
  return (
    <div className="flex min-h-screen">
      <DocsSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-4">Component Documentation</h1>
        <p className="mb-8">Explore our comprehensive collection of animated React components. Each component comes with detailed documentation, customizable props, and copy-paste ready source code.</p>
        {/* Add your documentation content here */}
      </main>
    </div>
  );
};

export default DocsPage;
