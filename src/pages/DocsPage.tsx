// Mobile-responsive Docs page with slide-in sidebar drawer

import React from 'react';
import DocsLayout from '../components/layout/DocsLayout';

const DocsPage = () => (
  <DocsLayout>
    <h1 className="text-2xl md:text-3xl font-bold mb-4">Component Documentation</h1>
    <p className="mb-6 md:mb-8">
      Explore our comprehensive collection of animated React components. Each component comes with detailed documentation, customizable props, and copy-paste ready source code.
    </p>
    {/* Add your documentation content here */}
  </DocsLayout>
);

export default DocsPage;
