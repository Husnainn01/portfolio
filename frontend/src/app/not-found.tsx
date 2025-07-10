'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-8 md:px-16 lg:px-24 flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-darkBlue/60 backdrop-blur-sm rounded-xl border border-lightBlue/20 p-8"
        >
          <div className="text-6xl mb-6">🔍</div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-aldrich">
            Page Not Found
          </h1>
          
          <p className="text-white/70 text-lg mb-8 leading-relaxed">
            The page you're looking for doesn't exist. This might be a project detail page that couldn't be loaded.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <button className="px-6 py-3 bg-lightBlue text-darkBlue font-semibold rounded-lg hover:bg-white transition-colors">
                Go Home
              </button>
            </Link>
            
            <Link href="/projects">
              <button className="px-6 py-3 bg-blue/40 text-white font-semibold rounded-lg border border-blue/60 hover:bg-blue/60 transition-colors">
                View Projects
              </button>
            </Link>
          </div>
          
          <div className="mt-8 text-white/50 text-sm">
            <p>If you're seeing this for a project page, there might be an issue with the dynamic routing.</p>
            <p>Current URL: <span className="font-mono bg-blue/20 px-2 py-1 rounded">{typeof window !== 'undefined' ? window.location.pathname : ''}</span></p>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 