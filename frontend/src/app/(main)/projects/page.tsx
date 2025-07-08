'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '../../../components/FeaturedProjects';
import axios from 'axios';

export default function Projects() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  // State for projects, filtering, and searching
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [visibleProjectCount, setVisibleProjectCount] = useState<number>(6);
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const searchRef = useRef<HTMLInputElement>(null);
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/api/projects`);
        setAllProjects(res.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [API_URL]);
  
  // Extract unique categories from projects
  const uniqueCategories = allProjects.length > 0
    ? ['All', ...Array.from(new Set(allProjects.map(project => project.category)))]
    : ['All', 'Frontend', 'Full Stack', 'Mobile', 'Backend'];

  // Apply filter and search when they change
  useEffect(() => {
    if (allProjects.length === 0) return;
    
    let results = allProjects;
    
    // Apply category filter
    if (filter !== 'All') {
      results = results.filter(project => project.category === filter);
    }
    
    // Apply search filter
    if (searchTerm) {
      const lowercaseSearch = searchTerm.toLowerCase();
      results = results.filter(project => 
        project.title.toLowerCase().includes(lowercaseSearch) ||
        project.description.toLowerCase().includes(lowercaseSearch) ||
        project.tech.some(tech => tech.toLowerCase().includes(lowercaseSearch))
      );
    }
    
    setFilteredProjects(results);
    setVisibleProjectCount(6); // Reset visible count when filter/search changes
  }, [filter, searchTerm, allProjects]);

  // Function to handle search clearing
  const clearSearch = () => {
    setSearchTerm('');
    if (searchRef.current) {
      searchRef.current.focus();
    }
  };

  // Function to load more projects
  const loadMoreProjects = () => {
    setVisibleProjectCount(prev => Math.min(prev + 3, filteredProjects.length));
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-8 md:px-16 lg:px-24">
      {/* Hero Section with Animated Background */}
      <div className="relative overflow-hidden rounded-2xl mb-16 max-w-6xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-lightBlue/20 z-0"></div>
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-10 z-0"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 py-16 px-8 md:px-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            My <span className="text-lightBlue">Projects</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Explore my portfolio of web applications, mobile apps, and software solutions.
            Each project represents a unique challenge and showcases different skills and technologies.
          </p>
        </motion.div>
      </div>

      {/* Filter and Search Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="max-w-6xl mx-auto mb-12"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            {uniqueCategories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  filter === category 
                    ? 'bg-lightBlue text-darkBlue font-bold shadow-lg shadow-lightBlue/20' 
                    : 'bg-blue-900/50 text-white/80 hover:bg-blue-800/80 border border-blue-700/30'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <div className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none transition-colors ${isSearchFocused ? 'text-lightBlue' : 'text-white/50'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              ref={searchRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder="Search projects..."
              className={`w-full pl-10 pr-10 py-2.5 bg-blue-900/50 border rounded-lg focus:outline-none focus:ring-2 text-white transition-all duration-300 ${
                isSearchFocused ? 'border-lightBlue focus:ring-lightBlue/50 bg-blue-900/70' : 'border-blue-700/50'
              }`}
            />
            {searchTerm && (
              <button 
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-white/50 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
        
        {/* Results Summary */}
        <div className="text-white/60 text-sm mb-6">
          {loading ? 'Loading projects...' : (
            <>
              Showing {Math.min(visibleProjectCount, filteredProjects.length)} of {filteredProjects.length} projects
              {searchTerm && ` matching "${searchTerm}"`}
              {filter !== 'All' && ` in ${filter}`}
            </>
          )}
        </div>
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lightBlue"></div>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center">
            <h3 className="text-xl text-red-500 mb-2">Error Loading Projects</h3>
            <p className="text-white/80">{error}</p>
          </div>
        ) : filteredProjects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.slice(0, visibleProjectCount).map((project, index) => (
                <ProjectCard 
                  key={project._id} 
                  project={project} 
                  index={index}
                  apiUrl={API_URL}
                />
              ))}
            </div>
            
            {/* Load More Button */}
            {visibleProjectCount < filteredProjects.length && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-12 text-center"
              >
                <button
                  onClick={loadMoreProjects}
                  className="px-6 py-3 bg-blue-900/70 border border-lightBlue/30 text-white font-medium rounded-lg hover:bg-blue-800/80 transition-colors flex items-center mx-auto"
                >
                  Load More
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </motion.div>
            )}
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-[300px] flex flex-col items-center justify-center bg-blue-900/20 border border-blue-800/30 rounded-xl p-8"
          >
            <svg className="w-16 h-16 text-lightBlue/50 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" />
            </svg>
            <h3 className="text-xl text-white/90 font-medium mb-2">No projects found</h3>
            <p className="text-white/60 text-center">
              Try changing your search term or filter.
            </p>
            {(searchTerm || filter !== 'All') && (
              <button 
                onClick={() => { setSearchTerm(''); setFilter('All'); }}
                className="mt-4 px-4 py-2 bg-lightBlue/20 hover:bg-lightBlue/30 text-lightBlue rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

// Project card component
interface ProjectCardProps {
  project: Project;
  index: number;
  apiUrl: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, apiUrl }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 } 
    },
    hover: {
      y: -10,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className="backdrop-blur-sm bg-darkBlue/40 rounded-xl overflow-hidden border border-lightBlue/20 group"
    >
      {/* Project Image with Overlay */}
      <div className="relative h-48 overflow-hidden">
        {/* Overlay with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-darkBlue to-transparent opacity-0 group-hover:opacity-100 z-10 transition-opacity duration-300"></div>
        
        {project.image ? (
          <div className="relative w-full h-full">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transform transition-transform duration-700 group-hover:scale-110"
              onError={(e) => {
                // Fallback for image loading errors
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.classList.add('bg-gradient-to-br', 'from-blue/40', 'to-lightBlue/20', 'flex', 'justify-center', 'items-center');
                
                // Add emoji based on project title
                const emoji = document.createElement('span');
                emoji.className = 'text-5xl';
                emoji.innerText = project.title.includes('Commerce') ? '🛒' : 
                              project.title.includes('Analytics') ? '📊' : 
                              project.title.includes('Fitness') ? '💪' : '💻';
                target.parentElement!.appendChild(emoji);
              }}
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue/40 to-lightBlue/20 flex items-center justify-center">
            <span className="text-5xl">
              {project.title.includes('Commerce') ? '🛒' : 
              project.title.includes('Analytics') ? '📊' : 
              project.title.includes('Fitness') ? '💪' : '💻'}
            </span>
          </div>
        )}
        
        {/* Category and Status Badges */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
          <span className="bg-lightBlue/80 text-darkBlue text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
            {project.category}
          </span>
          <span className={`text-white text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm ${
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
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>
        
        {/* Tech Stack Tags */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, idx) => (
              <span key={idx} className="text-xs px-2 py-1 bg-blue/30 text-white/90 rounded-full">
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-lightBlue/10">
          <div className="flex space-x-3">
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/80 hover:text-lightBlue transition-colors"
                aria-label="GitHub Repository"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            )}
            {project.demoUrl && (
              <a 
                href={project.demoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/80 hover:text-lightBlue transition-colors"
                aria-label="Live Demo"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
          
          <Link href={`/projects/${project.slug}`} className="text-lightBlue hover:text-white text-sm flex items-center font-medium transition-colors">
            View Details
            <svg className="ml-1.5 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}; 