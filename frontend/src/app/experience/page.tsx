'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// Experience type definition
interface Experience {
  company: string;
  position: string;
  period: string;
  location: string;
  description: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
  logo?: string;
  color: string;
  icon: string;
}

export default function Experience() {
  // Work experience data
  const experiences: Experience[] = [
    {
      company: 'SS Japan Limited Corporation',
      position: 'Mid-Senior Full Stack Engineer',
      period: '2020 - 2025 (Feb)',
      location: 'Tokyo, Japan',
      description: 'Led development of various systems including logistics platforms, car auction services, and financial applications.',
      responsibilities: [
        'Developed and maintained complex logistics systems for tracking vehicle shipments internationally',
        'Created car auction listing platforms with real-time bidding capabilities',
        'Built invoice management systems with multi-currency support',
        'Designed mobile app interfaces that connected with backend services',
        'Managed database architecture and performance optimization',
        'Collaborated with cross-functional teams for feature specification and implementation'
      ],
      achievements: [
        'Led a team of 10-20 developers across multiple projects',
        'Reduced system downtime by 35% through architectural improvements',
        'Implemented CI/CD pipelines that decreased deployment time by 70%',
        'Created component library that improved development speed by 40%',
        'Mentored junior developers and conducted technical training sessions'
      ],
      technologies: ['React', 'Next.js', 'Node.js', 'MongoDB', 'PostgreSQL', 'TypeScript', 'Tailwind CSS'],
      logo: '/images/logos/ss-japan.svg',
      color: 'from-blue-500/20 to-indigo-500/20',
      icon: '👨‍💻'
    },
    {
      company: 'SS Pakistan',
      position: 'Junior Software Developer',
      period: '2018 - 2020',
      location: 'Lahore, Pakistan',
      description: 'Worked on front-end development for corporate websites and internal tools, focusing on responsive design and cross-browser compatibility.',
      responsibilities: [
        'Developed and maintained client websites with responsive designs',
        'Created internal tools for company operations and reporting',
        'Implemented UI components based on design specifications',
        'Optimized website performance and ensured cross-browser compatibility',
        'Collaborated with designers to implement visual elements'
      ],
      achievements: [
        'Decreased page load times by 45% through optimization techniques',
        'Implemented reusable component system that reduced code duplication by 30%',
        'Received recognition for delivering high-quality work consistently',
        'Took initiative to learn backend technologies to become a full-stack developer'
      ],
      technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'jQuery', 'Bootstrap', 'MySQL'],
      logo: '/images/logos/ss-pakistan.svg',
      color: 'from-green-500/20 to-teal-500/20',
      icon: '💻'
    },
    {
      company: 'University of Lahore',
      position: 'Computer Science Degree',
      period: '2013 - 2017',
      location: 'Lahore, Pakistan',
      description: 'Completed Bachelor\'s degree in Computer Science with focus on web technologies and software engineering principles.',
      responsibilities: [
        'Learned fundamentals of programming and computer science',
        'Completed coursework in algorithms, data structures, and database design',
        'Participated in group projects for software development',
        'Studied networking, operating systems, and security principles'
      ],
      achievements: [
        'Graduated with honors in the top 10% of the class',
        'Developed final year project: an e-commerce platform with recommendation system',
        'Participated in coding competitions and hackathons',
        'Received scholarship for academic excellence'
      ],
      technologies: ['Java', 'C++', 'Python', 'HTML/CSS', 'JavaScript', 'SQL', 'Data Structures'],
      logo: '/images/logos/uol.svg',
      color: 'from-amber-500/20 to-orange-500/20',
      icon: '🎓'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
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
            Professional <span className="text-lightBlue">Experience</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            My journey as a developer, showcasing my professional growth, key responsibilities, 
            and achievements across different roles and organizations.
          </p>
        </motion.div>
      </div>

      {/* Experience Timeline */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto relative"
      >
        {/* Timeline line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500/40 via-lightBlue/40 to-blue-500/40 transform md:translate-x-[-50%] hidden md:block"></div>
        
        {experiences.map((exp, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            className={`mb-16 md:mb-24 relative ${index % 2 === 0 ? 'md:pr-12 md:text-right md:ml-auto md:mr-[50%]' : 'md:pl-12 md:ml-[50%]'}`}
          >
            {/* Timeline dot */}
            <div className={`hidden md:block absolute top-0 w-6 h-6 rounded-full bg-lightBlue border-4 border-darkBlue/80 shadow-glow z-10 ${
              index % 2 === 0 ? 'md:right-[-12px]' : 'md:left-[-12px]'
            }`}></div>
            
            {/* Timeline connector */}
            <div className={`hidden md:block absolute top-[12px] w-12 h-[2px] bg-gradient-to-r from-lightBlue/40 to-lightBlue/80 z-[5] ${
              index % 2 === 0 ? 'md:right-0' : 'md:left-0'
            }`}></div>
            
            {/* Content */}
            <motion.div 
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-blue-900/30 to-blue-950/30 backdrop-blur-sm rounded-xl p-8 border border-lightBlue/20 md:max-w-[95%] shadow-lg shadow-blue-900/10"
            >
              <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${exp.color} flex items-center justify-center mr-5 text-3xl flex-shrink-0 border border-white/10`}>
                    <span>{exp.icon}</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{exp.position}</h2>
                    <h3 className="text-xl text-lightBlue font-medium">{exp.company}</h3>
                  </div>
                </div>
                <div className={`flex flex-col ${index % 2 === 0 ? 'md:items-end' : 'md:items-start'}`}>
                  <div className="flex items-center text-white/80 mb-2 bg-blue-900/50 px-3 py-1 rounded-full border border-blue-800/50">
                    <svg className="w-4 h-4 mr-2 text-lightBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center text-white/80 bg-blue-900/50 px-3 py-1 rounded-full border border-blue-800/50">
                    <svg className="w-4 h-4 mr-2 text-lightBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>
              
              <div className={`text-white/80 mb-8 ${index % 2 === 0 ? 'md:text-right' : ''} bg-blue-900/20 p-4 rounded-lg border border-blue-800/30`}>
                <p>{exp.description}</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className={`${index % 2 === 0 ? 'md:text-right' : ''}`}>
                  <h4 className="text-lightBlue font-semibold mb-4 flex items-center text-lg">
                    {index % 2 === 0 && <span className="lg:hidden md:mr-2">🔹</span>}
                    <span>Key Responsibilities</span>
                    {index % 2 === 0 ? <span className="hidden lg:inline-block md:ml-2">🔹</span> : <span className="md:mr-2">🔹</span>}
                  </h4>
                  <ul className={`space-y-3 text-white/80 ${index % 2 === 0 ? 'md:list-inside' : ''}`}>
                    {exp.responsibilities.map((resp, idx) => (
                      <motion.li 
                        key={idx} 
                        className="flex items-start bg-blue-900/20 p-3 rounded-lg border border-blue-800/30 hover:border-lightBlue/30 transition-colors duration-300"
                        whileHover={{ x: index % 2 === 0 ? -5 : 5 }}
                      >
                        {index % 2 === 0 ? null : <span className="text-lightBlue mr-3 mt-1 flex-shrink-0">▹</span>}
                        <span>{resp}</span>
                        {index % 2 === 0 ? <span className="text-lightBlue ml-3 mt-1 flex-shrink-0">◃</span> : null}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                <div className={`${index % 2 === 0 ? 'md:text-right' : ''}`}>
                  <h4 className="text-lightBlue font-semibold mb-4 flex items-center text-lg">
                    {index % 2 === 0 && <span className="lg:hidden md:mr-2">🏆</span>}
                    <span>Key Achievements</span>
                    {index % 2 === 0 ? <span className="hidden lg:inline-block md:ml-2">🏆</span> : <span className="md:mr-2">🏆</span>}
                  </h4>
                  <ul className={`space-y-3 text-white/80 ${index % 2 === 0 ? 'md:list-inside' : ''}`}>
                    {exp.achievements.map((ach, idx) => (
                      <motion.li 
                        key={idx} 
                        className="flex items-start bg-blue-900/20 p-3 rounded-lg border border-blue-800/30 hover:border-lightBlue/30 transition-colors duration-300"
                        whileHover={{ x: index % 2 === 0 ? -5 : 5 }}
                      >
                        {index % 2 === 0 ? null : <span className="text-lightBlue mr-3 mt-1 flex-shrink-0">▹</span>}
                        <span>{ach}</span>
                        {index % 2 === 0 ? <span className="text-lightBlue ml-3 mt-1 flex-shrink-0">◃</span> : null}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className={`mt-8 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                <h4 className="text-lightBlue font-semibold mb-4 text-lg">Technologies Used</h4>
                <div className="flex flex-wrap gap-2 justify-start md:justify-normal">
                  {exp.technologies.map((tech, idx) => (
                    <motion.span 
                      key={idx} 
                      className="px-4 py-2 rounded-full bg-blue-900/50 text-white border border-blue-800/50 hover:border-lightBlue/50 hover:bg-blue-800/70 transition-all duration-300 shadow-sm"
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="max-w-4xl mx-auto mt-16 text-center"
      >
        <div className="bg-gradient-to-br from-blue-900/30 to-blue-950/30 backdrop-blur-sm rounded-xl p-8 border border-lightBlue/20 shadow-lg shadow-blue-900/10">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to collaborate?</h2>
          <p className="text-white/80 mb-6">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-lightBlue to-lightBlue/90 text-darkBlue font-bold rounded-lg hover:brightness-110 transition-all duration-300 shadow-lg shadow-blue-900/20"
              >
                Contact Me
              </motion.button>
            </Link>
            <Link href="/projects">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-transparent border-2 border-lightBlue text-lightBlue font-medium rounded-lg hover:bg-lightBlue/10 transition-all duration-300"
              >
                View My Work
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Download Resume */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="max-w-6xl mx-auto mt-12 flex justify-center"
      >
        <motion.a 
          href="#" 
          className="flex items-center bg-blue-900/30 px-6 py-3 rounded-full text-lightBlue hover:text-white hover:bg-blue-800/50 transition-all duration-300 border border-blue-800/50 hover:border-lightBlue/50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download Full Resume (PDF)
        </motion.a>
      </motion.div>
    </div>
  );
} 