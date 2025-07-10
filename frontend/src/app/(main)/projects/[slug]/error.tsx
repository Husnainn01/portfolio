'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-8 md:px-16 lg:px-24 flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-red-900/20 border border-red-500/30 rounded-xl p-8 backdrop-blur-sm"
        >
          <div className="text-6xl mb-6">⚠️</div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 font-aldrich">
            Something went wrong!
          </h1>
          
          <p className="text-white/70 text-lg mb-6 leading-relaxed">
            There was an error loading this project page. This could be due to:
          </p>
          
          <ul className="text-white/60 text-left mb-8 space-y-2">
            <li>• The project doesn't exist</li>
            <li>• Network connection issues</li>
            <li>• Server temporarily unavailable</li>
            <li>• Invalid project slug</li>
          </ul>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="px-6 py-3 bg-red-600/80 text-white font-semibold rounded-lg hover:bg-red-700/80 transition-colors"
            >
              Try Again
            </button>
            
            <Link href="/projects">
              <button className="px-6 py-3 bg-lightBlue text-darkBlue font-semibold rounded-lg hover:bg-white transition-colors">
                Back to Projects
              </button>
            </Link>
          </div>
          
          <div className="mt-8 text-white/40 text-sm">
            <p>Error: {error.message}</p>
            {error.digest && (
              <p className="font-mono bg-red-900/20 px-2 py-1 rounded mt-2">
                Digest: {error.digest}
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 