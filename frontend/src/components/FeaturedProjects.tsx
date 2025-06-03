'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// Project type definition
export interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  demoUrl: string;
  githubUrl: string;
  category: string;
}

interface FeaturedProjectsProps {
  projects: Project[];
}

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ projects }) => {
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
        
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
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
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
        <div className="absolute top-2 right-2 z-10">
          <span className="bg-blue/80 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
            {project.category}
          </span>
        </div>
        
        <div className="relative h-full w-full">
          {/* Use a placeholder image since we don't have actual images */}
          <div className="h-full w-full bg-gradient-to-br from-blue/40 to-lightBlue/20 flex items-center justify-center">
            <span className="text-4xl">
              {project.title.includes('Commerce') ? '🛒' : 
              project.title.includes('Analytics') ? '📊' : 
              project.title.includes('Fitness') ? '💪' : '💻'}
            </span>
          </div>
          
          {/* Uncomment this when you have actual images */}
          {/* <Image
            src={project.image}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 hover:scale-105"
          /> */}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-white/70 mb-4 text-sm">{project.description}</p>
        
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
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/80 hover:text-lightBlue transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            <a 
              href={project.demoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/80 hover:text-lightBlue transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
          <Link href={`/projects/${encodeURIComponent(project.title.toLowerCase().replace(/\s+/g, '-'))}`}>
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