'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '../../components/FeaturedProjects';

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
  
  // Projects data - in a real app this could come from an API or CMS
  const allProjects: Project[] = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with payment integration and inventory management. Features include user authentication, product catalog, shopping cart, and admin dashboard.',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
      image: '/images/projects/ecommerce.jpg',
      demoUrl: 'https://ecommerce-demo.example.com',
      githubUrl: 'https://github.com/username/ecommerce-project',
      category: 'Full Stack',
    },
    {
      title: 'Analytics Dashboard',
      description: 'Real-time data visualization dashboard for business metrics and KPIs. Includes customizable widgets, data filtering, and export capabilities for comprehensive data analysis.',
      tech: ['Next.js', 'D3.js', 'Firebase', 'Material UI'],
      image: '/images/projects/analytics.jpg',
      demoUrl: 'https://analytics-demo.example.com',
      githubUrl: 'https://github.com/username/analytics-dashboard',
      category: 'Frontend',
    },
    {
      title: 'Mobile Fitness App',
      description: 'Cross-platform mobile application for fitness tracking and personalized workouts. Features include workout planning, progress tracking, nutrition management, and social sharing.',
      tech: ['React Native', 'Redux', 'Node.js', 'Express', 'MongoDB'],
      image: '/images/projects/fitness.jpg',
      demoUrl: 'https://fitness-demo.example.com',
      githubUrl: 'https://github.com/username/fitness-app',
      category: 'Mobile',
    },
    {
      title: 'Corporate Intranet Portal',
      description: 'Internal company portal for document management, employee directory, announcements, and team collaboration. Includes role-based access control and real-time notifications.',
      tech: ['React', 'TypeScript', 'ASP.NET Core', 'SQL Server', 'SignalR'],
      image: '/images/projects/intranet.jpg',
      demoUrl: 'https://intranet-demo.example.com',
      githubUrl: 'https://github.com/username/intranet-portal',
      category: 'Full Stack',
    },
    {
      title: 'Portfolio Website',
      description: 'Modern portfolio website built with Next.js and Three.js featuring 3D elements, interactive animations, and responsive design. Includes dark mode, contact form, and blog integration.',
      tech: ['Next.js', 'Three.js', 'Framer Motion', 'Tailwind CSS'],
      image: '/images/projects/portfolio.jpg',
      demoUrl: 'https://portfolio-demo.example.com',
      githubUrl: 'https://github.com/username/portfolio-website',
      category: 'Frontend',
    },
    {
      title: 'Inventory Management System',
      description: 'Comprehensive inventory tracking system with barcode scanning, supplier management, stock level alerts, and reporting features. Optimized for both desktop and mobile use.',
      tech: ['Vue.js', 'Express', 'PostgreSQL', 'Docker', 'Chart.js'],
      image: '/images/projects/inventory.jpg',
      demoUrl: 'https://inventory-demo.example.com',
      githubUrl: 'https://github.com/username/inventory-system',
      category: 'Full Stack',
    }
  ];

  // State for filtering, searching and projects
  const [filter, setFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(allProjects);
  const [visibleProjectCount, setVisibleProjectCount] = useState<number>(6);
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const searchRef = useRef<HTMLInputElement>(null);
  
  const categories = ['All', 'Frontend', 'Full Stack', 'Mobile', 'Backend'];

  // Apply filter and search when they change
  useEffect(() => {
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
  }, [filter, searchTerm]);

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
            {categories.map((category) => (
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
          Showing {Math.min(visibleProjectCount, filteredProjects.length)} of {filteredProjects.length} projects
          {searchTerm && ` matching "${searchTerm}"`}
          {filter !== 'All' && ` in ${filter}`}
        </div>
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredProjects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.slice(0, visibleProjectCount).map((project, index) => (
                <ProjectCard key={index} project={project} index={index} />
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
            className="text-center py-16 bg-blue-900/30 rounded-xl border border-blue-700/30"
          >
            <svg className="w-16 h-16 text-blue-500/50 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-white/80 text-lg mb-2">No projects found</p>
            <p className="text-white/60 text-sm mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilter('All');
              }}
              className="px-4 py-2 bg-blue-800/70 text-white rounded-lg hover:bg-blue-700/80 transition-colors"
            >
              Reset Filters
            </button>
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
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.5, delay: index * 0.1 }
        }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="backdrop-blur-sm bg-gradient-to-b from-blue-900/40 to-darkBlue/60 rounded-xl overflow-hidden border border-lightBlue/20 hover:border-lightBlue/60 transition-all flex flex-col h-full group shadow-lg shadow-blue-900/20"
    >
      {/* Project Image with Overlay */}
      <div className="relative h-52 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-darkBlue/80 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="absolute top-3 right-3 z-20">
          <span className="bg-blue-900/80 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm border border-blue-700/50">
            {project.category}
          </span>
        </div>
        
        <div className="relative h-full w-full overflow-hidden">
          {/* Use a placeholder image since we don't have actual images */}
          <div className="h-full w-full bg-gradient-to-br from-blue/40 to-lightBlue/20 flex items-center justify-center transform transition-transform duration-500 group-hover:scale-110">
            <span className="text-6xl">
              {project.title.includes('Commerce') ? '🛒' : 
              project.title.includes('Analytics') ? '📊' : 
              project.title.includes('Fitness') ? '💪' : 
              project.title.includes('Inventory') ? '📦' :
              project.title.includes('Portfolio') ? '🎨' : '💻'}
            </span>
          </div>
          
          {/* Uncomment this when you have actual images */}
          {/* <Image
            src={project.image}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 group-hover:scale-110"
          /> */}
        </div>
        
        {/* Quick action buttons (visible on hover) */}
        <div className="absolute bottom-3 right-3 z-20 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a 
            href={project.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-blue-900/80 backdrop-blur-sm flex items-center justify-center border border-blue-800/50 hover:bg-lightBlue/80 hover:border-lightBlue transition-colors"
            aria-label="View source code on GitHub"
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
          <a 
            href={project.demoUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-blue-900/80 backdrop-blur-sm flex items-center justify-center border border-blue-800/50 hover:bg-lightBlue/80 hover:border-lightBlue transition-colors"
            aria-label="View live demo"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-lightBlue transition-colors">{project.title}</h3>
        <p className="text-white/70 mb-4 text-sm line-clamp-3">{project.description}</p>
        
        <div className="mb-4">
          <h4 className="text-lightBlue text-xs uppercase tracking-wider mb-2 font-medium">Technologies</h4>
          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 3).map((tech, idx) => (
              <span key={idx} className="text-xs px-2.5 py-1 bg-blue-800/40 text-white/90 rounded-full border border-blue-700/30">
                {tech}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="text-xs px-2.5 py-1 bg-blue-800/40 text-white/90 rounded-full border border-blue-700/30">
                +{project.tech.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* Footer with view details button */}
      <div className="px-6 pb-6">
        <Link href={`/projects/${encodeURIComponent(project.title.toLowerCase().replace(/\s+/g, '-'))}`}>
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-2.5 bg-gradient-to-r from-blue-800/80 to-blue-900/80 hover:from-lightBlue/80 hover:to-lightBlue text-white hover:text-darkBlue font-medium rounded-lg transition-all duration-300 flex items-center justify-center border border-blue-700/50 hover:border-transparent"
          >
            View Project Details
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}; 