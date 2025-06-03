'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import FeaturedProjects, { Project } from '../components/FeaturedProjects';

export default function Home() {
  // Skills showcase
  const skills = [
    { name: 'Frontend Development', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
    { name: 'Backend Development', items: ['Node.js', 'Express', 'MongoDB', 'REST APIs'] },
    { name: 'DevOps & Tools', items: ['Git', 'Docker', 'CI/CD', 'AWS'] }
  ];

  // Featured projects with enhanced details
  const projects: Project[] = [
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
    }
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 max-w-3xl backdrop-blur-sm bg-darkBlue/40 p-8 rounded-lg border border-lightBlue/20"
        >
          <h2 className="text-lightBlue text-xl md:text-2xl font-aldrich mb-4">
            Hello, I'm John Doe
          </h2>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-white">
            Full Stack Developer
          </h1>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 text-white/90">
            Building exceptional digital experiences
          </h3>
          <p className="text-white/80 text-lg mb-8 max-w-2xl leading-relaxed">
            I specialize in creating robust, scalable applications with modern tech stacks.
            With expertise in both frontend and backend technologies, I deliver seamless, 
            high-performance solutions that solve real business problems.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/projects">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-lightBlue text-darkBlue font-bold rounded-md hover:bg-white transition-colors"
              >
                View Portfolio
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-transparent border-2 border-lightBlue text-lightBlue font-medium rounded-md hover:bg-lightBlue/10 transition-colors"
              >
                Contact Me
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 sm:px-8 md:px-16 lg:px-24 backdrop-blur-sm bg-darkBlue/40">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center font-aldrich">
            <span className="text-lightBlue">&lt;</span> Technical Expertise <span className="text-lightBlue">/&gt;</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((category, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-blue/50 border border-lightBlue/30 rounded-lg p-6 hover:border-lightBlue/60 transition-all"
              >
                <h3 className="text-xl font-bold text-lightBlue mb-4">{category.name}</h3>
                <ul className="space-y-2">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="text-white/90 flex items-center">
                      <span className="text-lightBlue mr-2">▹</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Featured Projects Section */}
      <FeaturedProjects projects={projects} />

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-8 md:px-16 lg:px-24 backdrop-blur-sm bg-darkBlue/60">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to bring your ideas to life?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Let's collaborate to create exceptional digital experiences that solve real problems.
          </p>
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-lightBlue text-darkBlue font-bold rounded-md hover:bg-white transition-colors"
            >
              Get in Touch
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
