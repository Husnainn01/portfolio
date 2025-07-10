import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-8 md:px-16 lg:px-24 flex items-center justify-center">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-lightBlue mx-auto mb-4"></div>
          <p className="text-white/70 text-lg">Loading project details...</p>
        </div>
        
        {/* Skeleton loader */}
        <div className="space-y-8">
          <div className="bg-darkBlue/60 rounded-xl p-6 animate-pulse">
            <div className="h-8 bg-lightBlue/20 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-6 bg-lightBlue/10 rounded w-1/2 mx-auto"></div>
          </div>
          
          <div className="bg-darkBlue/60 rounded-xl p-6 animate-pulse">
            <div className="aspect-video bg-lightBlue/20 rounded-lg mb-4"></div>
          </div>
          
          <div className="bg-darkBlue/60 rounded-xl p-6 animate-pulse">
            <div className="h-6 bg-lightBlue/20 rounded w-1/3 mx-auto mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-lightBlue/10 rounded"></div>
              <div className="h-4 bg-lightBlue/10 rounded"></div>
              <div className="h-4 bg-lightBlue/10 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 