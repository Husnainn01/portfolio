'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '../../../../components/FeaturedProjects';
import { useParams } from 'next/navigation';
import axios from 'axios';

// Extended project interface with additional fields
interface ProjectDetails extends Project {
  longDescription?: string;
  features?: string[];
  challenges?: string[];
  solutions?: string[];
  screenshots?: string[];
}

export default function ProjectDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/api/projects/${slug}`);
        
        // Transform the API response to match our ProjectDetails interface
        const projectData: ProjectDetails = {
          ...res.data,
          // Add optional fields with defaults if they don't exist in the API response
          longDescription: res.data.longDescription || res.data.description,
          features: res.data.features || [],
          challenges: res.data.challenges || [],
          solutions: res.data.solutions || []
        };
        
        setProject(projectData);
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
        <div className="max-w-4xl mx-auto bg-blue-900/20 border border-red-500/20 rounded-lg p-8 text-center">
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

  // Tabs for project content
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features', hidden: !project.features?.length },
    { id: 'challenges', label: 'Challenges & Solutions', hidden: !project.challenges?.length && !project.solutions?.length },
    // Add more tabs as needed
  ].filter(tab => !tab.hidden);

  return (
    <div className="min-h-screen py-20 px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link href="/projects">
          <button className="flex items-center text-white/70 hover:text-lightBlue transition-colors mb-8 group">
            <svg 
              className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Projects
          </button>
        </Link>
        
        {/* Project Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white">{project.title}</h1>
            <span className="px-4 py-1.5 bg-blue-900/60 text-white rounded-full border border-blue-700/50">
              {project.category}
            </span>
          </div>
          
          <p className="text-xl text-white/80 mb-8 leading-relaxed">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-3 mb-8">
            {project.tech.map((tech, index) => (
              <span 
                key={index}
                className="px-3 py-1.5 bg-blue-800/40 text-white/90 rounded-md border border-blue-700/30"
              >
                {tech}
              </span>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-4">
            {project.demoUrl && (
              <a 
                href={project.demoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-lightBlue text-darkBlue font-medium rounded-md hover:bg-white transition-colors flex items-center"
              >
                Live Demo
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-blue-900/60 text-white font-medium rounded-md border border-blue-800/50 hover:bg-blue-800/80 transition-colors flex items-center"
              >
                View Source
                <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            )}
          </div>
        </motion.div>
        
        {/* Project Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 rounded-2xl overflow-hidden border border-blue-800/30 shadow-xl shadow-blue-900/20"
        >
          <div className="relative aspect-video w-full h-auto">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                className="object-cover"
                priority
                onError={(e) => {
                  // Fallback for image loading errors
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.classList.add('bg-gradient-to-br', 'from-blue/40', 'to-lightBlue/20', 'flex', 'justify-center', 'items-center');
                  
                  // Add emoji based on project title
                  const emoji = document.createElement('span');
                  emoji.className = 'text-9xl';
                  emoji.innerText = project.title.includes('Commerce') ? '🛒' : 
                                project.title.includes('Analytics') ? '📊' : 
                                project.title.includes('Fitness') ? '💪' : '💻';
                  target.parentElement!.appendChild(emoji);
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue/40 to-lightBlue/20 flex items-center justify-center">
                <span className="text-9xl">
                  {project.title.includes('Commerce') ? '🛒' : 
                  project.title.includes('Analytics') ? '📊' : 
                  project.title.includes('Fitness') ? '💪' : '💻'}
                </span>
              </div>
            )}
          </div>
        </motion.div>
        
        {/* Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {/* Tab Navigation */}
          <div className="mb-8 border-b border-blue-800/30">
            <div className="flex space-x-8 overflow-x-auto pb-px">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-lightBlue text-lightBlue font-medium'
                      : 'border-transparent text-white/60 hover:text-white/90'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="mt-8">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="prose prose-lg max-w-none prose-invert">
                    <p className="text-white/80 text-lg leading-relaxed whitespace-pre-line">
                      {project.longDescription || project.description}
                    </p>
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'features' && (
                <motion.div
                  key="features"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Key Features</h2>
                  <ul className="space-y-4">
                    {project.features?.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-lightBlue mr-3 mt-1">✓</span>
                        <span className="text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
              
              {activeTab === 'challenges' && (
                <motion.div
                  key="challenges"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-6">Challenges</h2>
                      <ul className="space-y-4">
                        {project.challenges?.map((challenge, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-red-400 mr-3 mt-1">⚠</span>
                            <span className="text-white/80">{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-6">Solutions</h2>
                      <ul className="space-y-4">
                        {project.solutions?.map((solution, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-400 mr-3 mt-1">⚙</span>
                            <span className="text-white/80">{solution}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 