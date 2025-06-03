'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the SolarSystemScene component with no SSR to avoid hydration issues
const SolarSystemScene = dynamic(() => import('@/components/GalaxyScene'), {
  ssr: false,
  loading: () => <div className="w-full h-screen flex items-center justify-center text-white/50">Loading solar system...</div>
});

export default function BackgroundProvider() {
  return (
    <div className="fixed inset-0 -z-10">
      <SolarSystemScene />
    </div>
  );
} 