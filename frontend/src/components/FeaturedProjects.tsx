'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';

// Project type definition
export interface Project {
  _id: string;
  title: string;
  description: string;
  slug: string;
  tech: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  category: string;
  status?: string;
  featured: boolean;
}

interface FeaturedProjectsProps {
  projects?: Project[];
}

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ projects: initialProjects }) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects || []);
  const [loading, setLoading] = useState(!initialProjects);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

  useEffect(() => {
    const fetchProjects = async () => {
      if (initialProjects) {
        return; // Skip fetching if projects are provided as props
      }
      
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/api/projects/featured`);
        setProjects(res.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching featured projects:', err);
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [API_URL, initialProjects]);

  if (loading) {
    return (
      <section className="py-20 px-4 sm:px-8 md:px-16 lg:px-24 text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center font-aldrich">
            Featured Projects
          </h2>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lightBlue"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center font-aldrich">
            Featured Projects
          </h2>
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-center text-white">
            {error}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 sm:px-8 md:px-16 lg:px-24">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center font-aldrich">
          Featured Projects
        </h2>
        <p className="text-white/80 text-center mb-12 max-w-2xl mx-auto">
          A selection of my recent work showcasing my skills and expertise in web and mobile development.
        </p>
        
        {projects.length === 0 ? (
          <div className="text-center text-white/70">
            No featured projects found. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project._id} project={project} index={index} apiUrl={API_URL} />
            ))}
          </div>
        )}
        
        <div className="mt-12 text-center">
          <Link href="/projects">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-transparent border-2 border-lightBlue text-lightBlue font-medium rounded-md hover:bg-lightBlue/10 transition-colors"
            >
              View All Projects
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

// Project card component
interface ProjectCardProps {
  project: Project;
  index: number;
  apiUrl: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, apiUrl }) => {
  // Function to truncate description
  const truncateDescription = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  // Helper function to ensure URL has proper protocol
  const formatUrl = (url: string): string => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `https://${url}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="backdrop-blur-sm bg-darkBlue/40 rounded-lg overflow-hidden border border-lightBlue/20 hover:border-lightBlue/60 transition-all flex flex-col h-full"
    >
      {/* Project Image with Overlay */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
          <span className="bg-blue/80 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
            {project.category}
          </span>
          <span className={`text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm ${
            project.status === 'Live' ? 'bg-green-600/80' :
            project.status === 'In Development' ? 'bg-orange-600/80' :
            project.status === 'Coming Soon' ? 'bg-blue-600/80' :
            project.status === 'Completed' ? 'bg-purple-600/80' :
            project.status === 'On Hold' ? 'bg-gray-600/80' :
            'bg-green-600/80'
          }`}>
            {project.status || 'Live'}
          </span>
        </div>
        
        <div className="relative h-full w-full">
          {project.image ? (
            <div className="h-full w-full relative">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-500 hover:scale-105"
                onError={(e) => {
                  // Fallback for image loading errors
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.classList.add('bg-gradient-to-br', 'from-blue/40', 'to-lightBlue/20');
                  
                  // Add emoji based on project status or title
                  const emoji = document.createElement('span');
                  emoji.className = 'text-4xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
                  emoji.innerText = project.status === 'In Development' ? '🚧' :
                                   project.status === 'Coming Soon' ? '⏳' :
                                   project.status === 'On Hold' ? '⏸️' :
                                   project.status === 'Completed' ? '✅' :
                                   project.title.includes('Commerce') ? '🛒' : 
                                   project.title.includes('Analytics') ? '📊' : 
                                   project.title.includes('Fitness') ? '💪' : '💻';
                  target.parentElement!.appendChild(emoji);
                }}
              />
            </div>
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-blue/40 to-lightBlue/20 flex flex-col items-center justify-center p-4">
              <span className="text-3xl mb-2">
                {project.status === 'In Development' ? '🚧' :
                 project.status === 'Coming Soon' ? '⏳' :
                 project.status === 'On Hold' ? '⏸️' :
                 project.status === 'Completed' ? '✅' :
                 project.title.includes('Commerce') ? '🛒' : 
                 project.title.includes('Analytics') ? '📊' : 
                 project.title.includes('Fitness') ? '💪' : '💻'}
              </span>
              <span className="text-xs text-white/80 text-center">
                {project.status === 'Live' ? 'Preview Coming Soon' : project.status}
              </span>
            </div>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-white/70 mb-4 text-sm leading-relaxed">{truncateDescription(project.description)}</p>
        
        <div className="mb-4">
          <h4 className="text-lightBlue text-xs uppercase tracking-wider mb-2 font-medium">Technologies</h4>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, idx) => (
              <span key={idx} className="text-xs px-2 py-1 bg-blue/30 text-white/90 rounded-full">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer with links */}
      <div className="p-4 border-t border-lightBlue/20 mt-auto">
        <div className="flex justify-between items-center">
          <div className="flex space-x-3">
            {project.githubUrl ? (
              <a 
                href={formatUrl(project.githubUrl)} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/80 hover:text-lightBlue transition-colors"
                title="View Source Code"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            ) : (
              <div className="text-white/40 cursor-not-allowed" title="Private Repository">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            {project.demoUrl ? (
              <a 
                href={formatUrl(project.demoUrl)} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/80 hover:text-lightBlue transition-colors"
                title="View Live Demo"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ) : (
              <div className="text-white/40 cursor-not-allowed" title="Demo Coming Soon">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            )}
          </div>
          <Link href={`/projects/${project.slug}`}>
            <button className="text-lightBlue hover:text-white text-sm font-medium transition-colors flex items-center">
              View Details 
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedProjects; 