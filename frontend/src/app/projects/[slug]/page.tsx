'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '../../../components/FeaturedProjects';
import { useParams } from 'next/navigation';

// Mock project data - in a real app, this would come from a database or API
const projectsData: (Project & { 
  longDescription?: string;
  features?: string[];
  challenges?: string[];
  solutions?: string[];
  screenshots?: string[];
})[] = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with payment integration and inventory management. Features include user authentication, product catalog, shopping cart, and admin dashboard.',
    longDescription: 'This comprehensive e-commerce platform provides businesses with everything they need to sell products online. The application features a responsive front-end built with React and Redux for state management, while the backend uses Node.js with Express to handle API requests and MongoDB for data storage. The platform includes a secure payment processing system integrated with Stripe, real-time inventory tracking, and a robust admin dashboard for managing products, orders, and customer data.',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
    image: '/images/projects/ecommerce.jpg',
    demoUrl: 'https://ecommerce-demo.example.com',
    githubUrl: 'https://github.com/username/ecommerce-project',
    category: 'Full Stack',
    features: [
      'User authentication and account management',
      'Product catalog with search and filtering',
      'Shopping cart and checkout process',
      'Payment processing with Stripe',
      'Order tracking and history',
      'Admin dashboard for inventory management',
      'Responsive design for all devices'
    ],
    challenges: [
      'Implementing secure payment processing',
      'Managing complex state across the application',
      'Ensuring real-time inventory updates',
      'Creating an intuitive admin interface'
    ],
    solutions: [
      'Used Stripe\'s secure API for payment processing',
      'Implemented Redux for centralized state management',
      'Set up MongoDB change streams for real-time updates',
      'Designed a user-friendly admin dashboard with data visualization'
    ],
    screenshots: [
      '/images/projects/ecommerce-1.jpg',
      '/images/projects/ecommerce-2.jpg',
      '/images/projects/ecommerce-3.jpg'
    ]
  },
  {
    title: 'Analytics Dashboard',
    description: 'Real-time data visualization dashboard for business metrics and KPIs. Includes customizable widgets, data filtering, and export capabilities for comprehensive data analysis.',
    longDescription: 'This analytics dashboard provides businesses with real-time insights into their performance metrics and KPIs. Built with Next.js for server-side rendering and optimized performance, the dashboard features interactive data visualizations created with D3.js. The application pulls data from various sources through a Firebase backend, allowing for real-time updates and historical data analysis. Users can customize their dashboard with drag-and-drop widgets, filter data by various parameters, and export reports in multiple formats.',
    tech: ['Next.js', 'D3.js', 'Firebase', 'Material UI'],
    image: '/images/projects/analytics.jpg',
    demoUrl: 'https://analytics-demo.example.com',
    githubUrl: 'https://github.com/username/analytics-dashboard',
    category: 'Frontend',
    features: [
      'Real-time data visualization',
      'Customizable dashboard widgets',
      'Advanced filtering and data selection',
      'Export options (PDF, CSV, Excel)',
      'User role management',
      'Data source integration',
      'Responsive design for desktop and tablet'
    ],
    challenges: [
      'Handling large datasets efficiently',
      'Creating responsive and interactive visualizations',
      'Implementing real-time updates',
      'Designing an intuitive user interface'
    ],
    solutions: [
      'Implemented data chunking and virtualization for performance',
      'Used D3.js with React hooks for efficient rendering',
      'Leveraged Firebase real-time database for live updates',
      'Designed with Material UI components for consistency'
    ],
    screenshots: [
      '/images/projects/analytics-1.jpg',
      '/images/projects/analytics-2.jpg',
      '/images/projects/analytics-3.jpg'
    ]
  },
  {
    title: 'Mobile Fitness App',
    description: 'Cross-platform mobile application for fitness tracking and personalized workouts. Features include workout planning, progress tracking, nutrition management, and social sharing.',
    longDescription: 'This cross-platform mobile fitness application helps users achieve their health and fitness goals through personalized workout plans, progress tracking, and nutrition management. Built with React Native for both iOS and Android, the app provides a seamless user experience with native-like performance. The backend is powered by Node.js and MongoDB, with real-time features implemented using Socket.io. Users can create custom workout routines, track their progress with interactive charts, log their nutrition, and connect with friends for motivation and challenges.',
    tech: ['React Native', 'Redux', 'Node.js', 'Express', 'MongoDB'],
    image: '/images/projects/fitness.jpg',
    demoUrl: 'https://fitness-demo.example.com',
    githubUrl: 'https://github.com/username/fitness-app',
    category: 'Mobile',
    features: [
      'Personalized workout plans',
      'Exercise library with video demonstrations',
      'Progress tracking with charts and statistics',
      'Nutrition logging and meal planning',
      'Social features for sharing and challenges',
      'Offline mode for workouts without internet',
      'Integration with fitness wearables'
    ],
    challenges: [
      'Creating a smooth cross-platform experience',
      'Implementing complex animations for exercise demonstrations',
      'Managing offline data synchronization',
      'Optimizing battery usage with background tracking'
    ],
    solutions: [
      'Used React Native for consistent cross-platform development',
      'Implemented custom animations with React Native Reanimated',
      'Created robust offline-first architecture with local storage',
      'Optimized background processes for minimal battery impact'
    ],
    screenshots: [
      '/images/projects/fitness-1.jpg',
      '/images/projects/fitness-2.jpg',
      '/images/projects/fitness-3.jpg'
    ]
  },
  {
    title: 'Corporate Intranet Portal',
    description: 'Internal company portal for document management, employee directory, announcements, and team collaboration. Includes role-based access control and real-time notifications.',
    longDescription: 'This corporate intranet portal serves as a centralized hub for internal company resources, communication, and collaboration. Built with React and TypeScript on the frontend and ASP.NET Core on the backend, the portal provides robust security features with role-based access control. The system includes document management with version control, a comprehensive employee directory, company announcements, team workspaces, and project management tools. Real-time notifications and chat functionality are implemented using SignalR for instant communication.',
    tech: ['React', 'TypeScript', 'ASP.NET Core', 'SQL Server', 'SignalR'],
    image: '/images/projects/intranet.jpg',
    demoUrl: 'https://intranet-demo.example.com',
    githubUrl: 'https://github.com/username/intranet-portal',
    category: 'Full Stack',
    features: [
      'Document management with version control',
      'Employee directory with organization chart',
      'Company announcements and news',
      'Team workspaces and project management',
      'Real-time notifications and chat',
      'Meeting room booking system',
      'Advanced search across all content'
    ],
    challenges: [
      'Implementing complex permission systems',
      'Creating an efficient document management system',
      'Ensuring high performance with large amounts of data',
      'Integrating with existing company systems'
    ],
    solutions: [
      'Designed hierarchical role-based access control system',
      'Implemented document versioning with optimized storage',
      'Used virtual scrolling and data pagination for performance',
      'Created flexible API adapters for system integration'
    ],
    screenshots: [
      '/images/projects/intranet-1.jpg',
      '/images/projects/intranet-2.jpg',
      '/images/projects/intranet-3.jpg'
    ]
  },
  {
    title: 'Portfolio Website',
    description: 'Modern portfolio website built with Next.js and Three.js featuring 3D elements, interactive animations, and responsive design. Includes dark mode, contact form, and blog integration.',
    longDescription: 'This portfolio website showcases my work and skills through a modern, interactive design. Built with Next.js for optimal performance and SEO, the site features 3D elements created with Three.js to provide an engaging user experience. The design is fully responsive and includes both light and dark modes. The site includes project showcases, a skills section, a contact form with validation, and an integrated blog built with a headless CMS. Animations are implemented using Framer Motion for smooth transitions and interactions.',
    tech: ['Next.js', 'Three.js', 'Framer Motion', 'Tailwind CSS'],
    image: '/images/projects/portfolio.jpg',
    demoUrl: 'https://portfolio-demo.example.com',
    githubUrl: 'https://github.com/username/portfolio-website',
    category: 'Frontend',
    features: [
      'Interactive 3D elements and animations',
      'Dark and light mode themes',
      'Responsive design for all devices',
      'Project showcase with detailed case studies',
      'Skills and experience timeline',
      'Contact form with validation',
      'Blog with content management system'
    ],
    challenges: [
      'Optimizing 3D performance across devices',
      'Creating a seamless theme switching experience',
      'Ensuring accessibility with interactive elements',
      'Balancing visual appeal with performance'
    ],
    solutions: [
      'Implemented lazy loading and level of detail for 3D elements',
      'Used CSS variables and context API for theme management',
      'Followed WCAG guidelines for accessible design',
      'Optimized assets and implemented code splitting'
    ],
    screenshots: [
      '/images/projects/portfolio-1.jpg',
      '/images/projects/portfolio-2.jpg',
      '/images/projects/portfolio-3.jpg'
    ]
  },
  {
    title: 'Inventory Management System',
    description: 'Comprehensive inventory tracking system with barcode scanning, supplier management, stock level alerts, and reporting features. Optimized for both desktop and mobile use.',
    longDescription: 'This inventory management system helps businesses track and manage their stock efficiently. Built with Vue.js on the frontend and Express with PostgreSQL on the backend, the system provides comprehensive inventory tracking capabilities. Features include barcode scanning for quick item lookup, supplier management, automated stock level alerts, purchase order generation, and detailed reporting with data visualization. The application is containerized with Docker for easy deployment and scalability.',
    tech: ['Vue.js', 'Express', 'PostgreSQL', 'Docker', 'Chart.js'],
    image: '/images/projects/inventory.jpg',
    demoUrl: 'https://inventory-demo.example.com',
    githubUrl: 'https://github.com/username/inventory-system',
    category: 'Full Stack',
    features: [
      'Barcode scanning and QR code generation',
      'Supplier management and order tracking',
      'Stock level monitoring and alerts',
      'Purchase order automation',
      'Detailed reporting and analytics',
      'User management with role-based access',
      'Mobile-responsive interface'
    ],
    challenges: [
      'Designing an efficient database schema for inventory',
      'Implementing barcode scanning on multiple devices',
      'Creating a system that works offline and syncs later',
      'Generating meaningful reports from large datasets'
    ],
    solutions: [
      'Designed optimized database schema with proper indexing',
      'Used HTML5 camera API with fallback options',
      'Implemented offline-first architecture with sync queue',
      'Created data aggregation pipeline for efficient reporting'
    ],
    screenshots: [
      '/images/projects/inventory-1.jpg',
      '/images/projects/inventory-2.jpg',
      '/images/projects/inventory-3.jpg'
    ]
  }
];

export default function ProjectDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const [project, setProject] = useState<(typeof projectsData)[0] | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Find the project that matches the slug
    const projectTitle = slug.replace(/-/g, ' ');
    const foundProject = projectsData.find(
      p => p.title.toLowerCase() === projectTitle
    );
    
    setProject(foundProject || null);
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl flex items-center">
          <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-lightBlue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading project details...
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen py-20 px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <svg className="w-20 h-20 text-blue-500/50 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="text-3xl font-bold text-white mb-6">Project Not Found</h1>
          <p className="text-white/80 mb-8">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/projects">
            <button className="px-6 py-3 bg-lightBlue text-darkBlue font-bold rounded-md hover:bg-white transition-colors flex items-center mx-auto">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              Back to Projects
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4 sm:px-8 md:px-16 lg:px-24">
      {/* Back button */}
      <div className="max-w-6xl mx-auto mb-8">
        <Link href="/projects">
          <motion.button 
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center text-white/70 hover:text-lightBlue transition-colors group"
          >
            <svg className="w-5 h-5 mr-2 group-hover:text-lightBlue transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Projects
          </motion.button>
        </Link>
      </div>

      {/* Project Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto mb-12"
      >
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900/40 to-darkBlue/60 border border-lightBlue/20 p-8 md:p-12">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-10"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <span className="text-lightBlue text-sm bg-blue-900/80 px-3 py-1.5 rounded-full border border-blue-700/50">
                  {project.category}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-2">
                  {project.title}
                </h1>
              </div>
              <div className="flex space-x-4 mt-6 md:mt-0">
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-blue-900/80 text-white rounded-lg border border-blue-700/50 hover:bg-blue-800/90 transition-colors flex items-center shadow-lg shadow-blue-900/20"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  Source Code
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={project.demoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-gradient-to-r from-lightBlue/90 to-lightBlue text-darkBlue font-bold rounded-lg border border-lightBlue/50 hover:brightness-110 transition-all flex items-center shadow-lg shadow-blue-900/20"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Live Demo
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Project Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="max-w-6xl mx-auto mb-12 rounded-xl overflow-hidden shadow-xl shadow-blue-900/20"
      >
        <div className="w-full h-96 bg-gradient-to-br from-blue-800/40 to-lightBlue/20 flex items-center justify-center relative">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-10"></div>
          <span className="text-8xl relative z-10">
            {project.title.includes('Commerce') ? '🛒' : 
            project.title.includes('Analytics') ? '📊' : 
            project.title.includes('Fitness') ? '💪' : 
            project.title.includes('Inventory') ? '📦' :
            project.title.includes('Portfolio') ? '🎨' : '💻'}
          </span>
        </div>
        {/* Uncomment when you have actual images */}
        {/* <Image 
          src={project.image} 
          alt={project.title}
          width={1200}
          height={600}
          className="w-full h-auto object-cover"
        /> */}
      </motion.div>

      {/* Navigation Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="max-w-6xl mx-auto mb-8 border-b border-lightBlue/20 overflow-x-auto scrollbar-hide"
      >
        <nav className="flex pb-px min-w-max">
          {['overview', 'features', 'challenges', 'tech', 'gallery'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 mr-2 whitespace-nowrap transition-all duration-300 relative ${
                activeTab === tab
                  ? 'text-lightBlue font-medium'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {activeTab === tab && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-lightBlue"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          ))}
        </nav>
      </motion.div>

      {/* Content Sections */}
      <div className="max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-blue-900/30 to-blue-950/30 backdrop-blur-sm rounded-xl p-8 border border-lightBlue/20 shadow-lg shadow-blue-900/10"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-lightBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Project Overview
              </h2>
              <p className="text-white/80 leading-relaxed mb-8 text-lg">
                {project.longDescription || project.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div className="bg-blue-900/20 rounded-lg p-6 border border-blue-800/30">
                  <h3 className="text-xl font-bold text-lightBlue mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    Project Type
                  </h3>
                  <p className="text-white/80">{project.category}</p>
                </div>
                <div className="bg-blue-900/20 rounded-lg p-6 border border-blue-800/30">
                  <h3 className="text-xl font-bold text-lightBlue mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Timeline
                  </h3>
                  <p className="text-white/80">Completed in 2023</p>
                </div>
                <div className="bg-blue-900/20 rounded-lg p-6 border border-blue-800/30">
                  <h3 className="text-xl font-bold text-lightBlue mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    My Role
                  </h3>
                  <p className="text-white/80">Lead Developer</p>
                </div>
                <div className="bg-blue-900/20 rounded-lg p-6 border border-blue-800/30">
                  <h3 className="text-xl font-bold text-lightBlue mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Team Size
                  </h3>
                  <p className="text-white/80">3 Developers</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Features Tab */}
          {activeTab === 'features' && (
            <motion.div
              key="features"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-blue-900/30 to-blue-950/30 backdrop-blur-sm rounded-xl p-8 border border-lightBlue/20 shadow-lg shadow-blue-900/10"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-lightBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                Key Features
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {project.features?.map((feature, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start bg-blue-900/20 p-4 rounded-lg border border-blue-800/30"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: index * 0.1, duration: 0.3 }
                    }}
                  >
                    <div className="flex-shrink-0 h-8 w-8 rounded-md bg-lightBlue/20 flex items-center justify-center mt-1 mr-4">
                      <svg className="h-5 w-5 text-lightBlue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-white/90">{feature}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Challenges Tab */}
          {activeTab === 'challenges' && (
            <motion.div
              key="challenges"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-blue-900/30 to-blue-950/30 backdrop-blur-sm rounded-xl p-8 border border-lightBlue/20 shadow-lg shadow-blue-900/10"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-lightBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Challenges & Solutions
              </h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-lightBlue mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Challenges
                  </h3>
                  <div className="space-y-4">
                    {project.challenges?.map((challenge, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ 
                          opacity: 1, 
                          x: 0,
                          transition: { delay: index * 0.1, duration: 0.3 }
                        }}
                        className="flex items-start bg-blue-900/20 p-4 rounded-lg border border-blue-800/30"
                      >
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-800/70 flex items-center justify-center mt-1 mr-4">
                          <span className="text-lightBlue font-bold text-sm">{index + 1}</span>
                        </div>
                        <p className="text-white/90">{challenge}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-lightBlue mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Solutions
                  </h3>
                  <div className="space-y-4">
                    {project.solutions?.map((solution, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ 
                          opacity: 1, 
                          x: 0,
                          transition: { delay: index * 0.1 + 0.2, duration: 0.3 }
                        }}
                        className="flex items-start bg-blue-900/20 p-4 rounded-lg border border-blue-800/30"
                      >
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-lightBlue/20 flex items-center justify-center mt-1 mr-4">
                          <svg className="h-5 w-5 text-lightBlue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <p className="text-white/90">{solution}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Technologies Tab */}
          {activeTab === 'tech' && (
            <motion.div
              key="tech"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-blue-900/30 to-blue-950/30 backdrop-blur-sm rounded-xl p-8 border border-lightBlue/20 shadow-lg shadow-blue-900/10"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-lightBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Technologies Used
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.tech.map((tech, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-gradient-to-br from-blue-800/30 to-blue-900/50 rounded-lg p-5 backdrop-blur-sm border border-blue-700/30 hover:border-lightBlue/30 transition-all duration-300 group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: index * 0.1, duration: 0.4 }
                    }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-lg bg-blue-800/50 flex items-center justify-center mr-4 group-hover:bg-lightBlue/20 transition-colors duration-300">
                        <span className="text-3xl">
                          {tech.includes('React') ? '⚛️' : 
                           tech.includes('Node') ? '📦' : 
                           tech.includes('Mongo') ? '🍃' :
                           tech.includes('Vue') ? '🟢' :
                           tech.includes('SQL') ? '🗄️' :
                           tech.includes('TypeScript') ? '🔷' :
                           tech.includes('Docker') ? '🐳' :
                           tech.includes('Express') ? '🚂' : '💻'}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-lightBlue transition-colors">{tech}</h3>
                        <p className="text-white/60 text-sm mt-1">
                          {tech.includes('React') ? 'Frontend JavaScript library' : 
                           tech.includes('Node.js') ? 'JavaScript runtime' : 
                           tech.includes('MongoDB') ? 'NoSQL database' :
                           tech.includes('PostgreSQL') ? 'Relational database' :
                           tech.includes('Vue.js') ? 'Progressive JS framework' :
                           tech.includes('TypeScript') ? 'Typed JavaScript' :
                           tech.includes('Express') ? 'Web framework for Node.js' :
                           tech.includes('Next.js') ? 'React framework' :
                           tech.includes('Docker') ? 'Containerization platform' :
                           tech.includes('Stripe') ? 'Payment processing' :
                           tech.includes('Redux') ? 'State management' :
                           tech.includes('D3.js') ? 'Data visualization' :
                           tech.includes('Firebase') ? 'Development platform' :
                           tech.includes('Material UI') ? 'React UI library' :
                           tech.includes('Chart.js') ? 'JavaScript charts' :
                           tech.includes('Tailwind') ? 'Utility-first CSS' :
                           tech.includes('Three.js') ? '3D graphics library' :
                           tech.includes('Framer Motion') ? 'Animation library' :
                           'Core technology'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-blue-900/30 to-blue-950/30 backdrop-blur-sm rounded-xl p-8 border border-lightBlue/20 shadow-lg shadow-blue-900/10"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-lightBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Project Gallery
              </h2>
              
              {/* Image placeholders */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((num) => (
                  <motion.div 
                    key={num}
                    className="aspect-video bg-gradient-to-br from-blue-800/40 to-lightBlue/20 rounded-lg overflow-hidden flex items-center justify-center border border-blue-700/30 group hover:border-lightBlue/30 transition-all duration-300 cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: num * 0.1, duration: 0.4 }
                    }}
                    whileHover={{ 
                      scale: 1.03,
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    <div className="text-center p-4 relative z-10">
                      <span className="text-5xl mb-3 block transform transition-transform duration-300 group-hover:scale-110">
                        {project.title.includes('Commerce') ? '🛒' : 
                         project.title.includes('Analytics') ? '📊' : 
                         project.title.includes('Fitness') ? '💪' : 
                         project.title.includes('Inventory') ? '📦' :
                         project.title.includes('Portfolio') ? '🎨' : '💻'}
                      </span>
                      <p className="text-white font-medium group-hover:text-lightBlue transition-colors">Screenshot {num}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Uncomment when you have actual images */}
              {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.screenshots?.map((screenshot, index) => (
                  <motion.div 
                    key={index} 
                    className="rounded-lg overflow-hidden border border-blue-700/30 hover:border-lightBlue/30 transition-all duration-300"
                    whileHover={{ 
                      scale: 1.03,
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    <Image 
                      src={screenshot} 
                      alt={`${project.title} screenshot ${index + 1}`}
                      width={400}
                      height={225}
                      className="w-full h-auto"
                    />
                  </motion.div>
                ))}
              </div> */}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Next Project */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="max-w-6xl mx-auto mt-16 pt-8 border-t border-lightBlue/20"
      >
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-white">Explore More Projects</h3>
            <p className="text-white/70">Check out my other work</p>
          </div>
          <Link href="/projects">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-blue-800/80 to-blue-900/80 hover:from-lightBlue/80 hover:to-lightBlue text-white hover:text-darkBlue font-medium rounded-lg transition-all duration-300 border border-blue-700/50 hover:border-transparent flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              View All Projects
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
} 