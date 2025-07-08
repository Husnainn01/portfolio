'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '../../../../components/FeaturedProjects';
import { useParams } from 'next/navigation';
import axios from 'axios';

export default function ProjectDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

  // Helper function to ensure URL has proper protocol
  const formatUrl = (url: string): string => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `https://${url}`;
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/api/projects/${slug}`);
        setProject(res.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching project:', err);
        setError('Failed to load project details');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProject();
    }
  }, [slug, API_URL]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen py-20 px-4 sm:px-8 md:px-16 lg:px-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-lightBlue"></div>
      </div>
    );
  }

  // Error state
  if (error || !project) {
    return (
      <div className="min-h-screen py-20 px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto bg-red-900/20 border border-red-500/30 rounded-lg p-8 text-center backdrop-blur-sm">
          <h1 className="text-3xl font-bold text-white mb-4">Project Not Found</h1>
          <p className="text-white/70 mb-6">
            {error || "The project you're looking for doesn't exist or has been removed."}
          </p>
          <Link href="/projects">
            <button className="px-6 py-3 bg-lightBlue text-darkBlue font-medium rounded-md hover:bg-white transition-colors">
              Back to Projects
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href="/projects">
          <button className="flex items-center text-white/70 hover:text-lightBlue transition-colors mb-8 group">
            <svg 
              className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Projects
          </button>
        </Link>

        {/* Project Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-aldrich">
            {project.title}
          </h1>
          <span className="inline-block px-4 py-2 bg-lightBlue/20 text-lightBlue rounded-full border border-lightBlue/30 backdrop-blur-sm">
            {project.category}
          </span>
        </motion.div>

        {/* Project Image */}
        {/* Project Image */}
        {project.image ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 rounded-xl overflow-hidden border border-lightBlue/20 shadow-2xl"
          >
            <div className="relative aspect-video w-full">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1000px"
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 rounded-xl overflow-hidden border border-lightBlue/20 shadow-2xl bg-gradient-to-br from-blue/40 to-lightBlue/20"
          >
            <div className="relative aspect-video w-full flex flex-col items-center justify-center p-8">
              <span className="text-6xl mb-4">
                {project.status === 'In Development' ? '🚧' :
                 project.status === 'Coming Soon' ? '⏳' :
                 project.status === 'On Hold' ? '⏸️' :
                 project.status === 'Completed' ? '✅' :
                 project.title.includes('Commerce') ? '🛒' : 
                 project.title.includes('Analytics') ? '📊' : 
                 project.title.includes('Fitness') ? '💪' : '💻'}
              </span>
              <p className="text-white/80 text-lg font-medium">
                {project.status === 'Live' ? 'Preview Coming Soon' : project.status}
              </p>
            </div>
          </motion.div>
        )}

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <div className="bg-darkBlue/60 backdrop-blur-sm rounded-xl border border-lightBlue/20 p-6">
            <h2 className="text-xl font-semibold text-lightBlue mb-4 text-center">
              Technologies Used
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {project.tech.map((tech, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-blue/30 text-white rounded-lg border border-blue/40 hover:bg-blue/40 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Project Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <div className="bg-darkBlue/60 backdrop-blur-sm rounded-xl border border-lightBlue/20 p-8">
            <h2 className="text-2xl font-semibold text-lightBlue mb-6 text-center">
              Project Overview
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-white/90 text-lg leading-relaxed text-justify">
                {project.description}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <div className="bg-darkBlue/60 backdrop-blur-sm rounded-xl border border-lightBlue/20 p-6">
            <div className="flex flex-wrap justify-center gap-4">
              {project.demoUrl ? (
                <a 
                  href={formatUrl(project.demoUrl)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-lightBlue text-darkBlue font-semibold rounded-lg hover:bg-white transition-colors flex items-center shadow-lg"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Live Demo
                </a>
              ) : (
                <div className="px-8 py-3 bg-gray-600/40 text-gray-300 font-semibold rounded-lg border border-gray-500/50 flex items-center shadow-lg cursor-not-allowed">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {project.status === 'Live' ? 'Coming Soon' : project.status}
                </div>
              )}
              
              {project.githubUrl ? (
                <a 
                  href={formatUrl(project.githubUrl)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-blue/40 text-white font-semibold rounded-lg border border-blue/60 hover:bg-blue/60 transition-colors flex items-center shadow-lg"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  View Source
                </a>
              ) : (
                <div className="px-8 py-3 bg-gray-600/40 text-gray-300 font-semibold rounded-lg border border-gray-500/50 flex items-center shadow-lg cursor-not-allowed">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  Private Repository
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 