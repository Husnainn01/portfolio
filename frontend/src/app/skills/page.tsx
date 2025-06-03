'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Skill type definition
interface Skill {
  name: string;
  level: number;
  icon?: string;
}

// Category type definition
interface SkillCategory {
  name: string;
  description: string;
  skills: Skill[];
  icon: string;
  color: string;
}

export default function Skills() {
  // Skills data grouped by categories
  const skillCategories: SkillCategory[] = [
    {
      name: 'Frontend Development',
      description: 'Building responsive and interactive user interfaces with modern JavaScript frameworks',
      icon: '🎨',
      color: 'from-blue-500/20 to-indigo-500/20',
      skills: [
        { name: 'React', level: 95, icon: '⚛️' },
        { name: 'Next.js', level: 90, icon: '▲' },
        { name: 'TypeScript', level: 90, icon: '🔷' },
        { name: 'JavaScript', level: 95, icon: '🟡' },
        { name: 'HTML5 & CSS3', level: 95, icon: '🌐' },
        { name: 'Tailwind CSS', level: 95, icon: '🎨' },
        { name: 'Framer Motion', level: 85, icon: '🎞️' },
        { name: 'Three.js', level: 75, icon: '🧊' },
        { name: 'Redux', level: 85, icon: '🔄' },
        { name: 'Responsive Design', level: 90, icon: '📱' },
      ],
    },
    {
      name: 'Backend Development',
      description: 'Creating robust server-side applications and APIs to power web applications',
      icon: '⚙️',
      color: 'from-green-500/20 to-emerald-500/20',
      skills: [
        { name: 'Node.js', level: 90, icon: '📦' },
        { name: 'Express', level: 90, icon: '🚂' },
        { name: 'MongoDB', level: 85, icon: '🍃' },
        { name: 'PostgreSQL', level: 80, icon: '🐘' },
        { name: 'REST API Design', level: 90, icon: '🔗' },
        { name: 'GraphQL', level: 75, icon: '⬡' },
        { name: 'Authentication', level: 85, icon: '🔐' },
        { name: 'Websockets', level: 80, icon: '🔌' },
      ],
    },
    {
      name: 'DevOps & Tools',
      description: 'Deploying and maintaining applications with modern DevOps practices',
      icon: '🚀',
      color: 'from-purple-500/20 to-violet-500/20',
      skills: [
        { name: 'Git & GitHub', level: 95, icon: '🐙' },
        { name: 'Docker', level: 75, icon: '🐳' },
        { name: 'CI/CD', level: 80, icon: '🔄' },
        { name: 'AWS', level: 85, icon: '☁️' },
        { name: 'Vercel', level: 90, icon: '▲' },
        { name: 'Netlify', level: 85, icon: '📡' },
        { name: 'Testing', level: 80, icon: '🧪' },
        { name: 'Performance Optimization', level: 85, icon: '⚡' },
      ],
    },
    {
      name: 'UI/UX Design',
      description: 'Creating intuitive and visually appealing user interfaces and experiences',
      icon: '🎭',
      color: 'from-pink-500/20 to-rose-500/20',
      skills: [
        { name: 'User Research', level: 75, icon: '🔍' },
        { name: 'Wireframing', level: 85, icon: '📝' },
        { name: 'Prototyping', level: 80, icon: '📱' },
        { name: 'Figma', level: 75, icon: '🎨' },
        { name: 'Design Systems', level: 80, icon: '🧩' },
        { name: 'Accessibility', level: 85, icon: '♿' },
        { name: 'Responsive Design', level: 90, icon: '📐' },
        { name: 'Animation', level: 80, icon: '✨' },
      ],
    },
    {
      name: 'Mobile Development',
      description: 'Building cross-platform mobile applications for iOS and Android',
      icon: '📱',
      color: 'from-sky-500/20 to-blue-500/20',
      skills: [
        { name: 'React Native', level: 85, icon: '📱' },
        { name: 'Expo', level: 80, icon: '🔮' },
        { name: 'Native APIs', level: 75, icon: '🔌' },
        { name: 'App Deployment', level: 80, icon: '🚀' },
        { name: 'Offline Storage', level: 85, icon: '💾' },
        { name: 'Push Notifications', level: 75, icon: '🔔' },
      ],
    },
  ];

  // State to track active category
  const [activeCategory, setActiveCategory] = useState<string>(skillCategories[0].name);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Get current active category
  const currentCategory = skillCategories.find(category => category.name === activeCategory);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
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
            Technical <span className="text-lightBlue">Skills</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            A comprehensive overview of my technical expertise and proficiency in various technologies,
            frameworks, and tools that I use to build exceptional digital experiences.
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Skills Categories Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="lg:col-span-4 xl:col-span-3"
          >
            <div className="sticky top-24 space-y-3">
              {skillCategories.map((category, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveCategory(category.name)}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-300 flex items-center ${
                    activeCategory === category.name
                      ? 'bg-gradient-to-r from-blue-900/70 to-blue-800/70 border-l-4 border-lightBlue shadow-lg shadow-blue-900/20'
                      : 'bg-blue-900/30 hover:bg-blue-800/50 border-l-4 border-transparent'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mr-4 text-2xl`}>
                    {category.icon}
                  </div>
                  <div>
                    <h3 className={`font-bold ${
                      activeCategory === category.name ? 'text-lightBlue' : 'text-white'
                    }`}>
                      {category.name}
                    </h3>
                    <p className="text-white/60 text-sm line-clamp-1">
                      {category.description}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Skills Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="lg:col-span-8 xl:col-span-9"
          >
            <AnimatePresence mode="wait">
              {skillCategories.map((category) => (
                activeCategory === category.name && (
                <motion.div 
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-gradient-to-br from-blue-900/30 to-blue-950/30 backdrop-blur-sm rounded-xl p-8 border border-lightBlue/20 mb-8 shadow-lg shadow-blue-900/10">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-4xl flex-shrink-0`}>
                        {category.icon}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">
                          {category.name}
                        </h2>
                        <p className="text-white/70">{category.description}</p>
                      </div>
                    </div>
                    
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="space-y-5 mt-8"
                    >
                      {category.skills.map((skill, index) => (
                        <motion.div 
                          key={index} 
                          variants={itemVariants}
                          onMouseEnter={() => setHoveredSkill(skill.name)}
                          onMouseLeave={() => setHoveredSkill(null)}
                          className="group"
                        >
                          <div className="flex justify-between mb-2">
                            <div className="flex items-center">
                              {skill.icon && (
                                <span className="text-xl mr-2 group-hover:scale-110 transition-transform inline-block">
                                  {skill.icon}
                                </span>
                              )}
                              <span className="text-white font-medium group-hover:text-lightBlue transition-colors">
                                {skill.name}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="text-sm font-medium px-2 py-0.5 rounded-full bg-blue-900/50 text-lightBlue border border-blue-800/50 group-hover:bg-lightBlue/20 transition-colors">
                                {skill.level}%
                              </div>
                              <div className="text-white/70 text-sm">
                                {skill.level >= 90 ? 'Expert' : 
                                 skill.level >= 80 ? 'Advanced' : 
                                 skill.level >= 70 ? 'Proficient' : 
                                 skill.level >= 60 ? 'Intermediate' : 'Beginner'}
                              </div>
                            </div>
                          </div>
                          <div className="h-2.5 bg-blue-900/50 rounded-full overflow-hidden border border-blue-800/30">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ 
                                duration: 1.2, 
                                delay: 0.1 * index,
                                ease: "easeOut" 
                              }}
                              className={`h-full ${
                                hoveredSkill === skill.name 
                                  ? 'bg-gradient-to-r from-lightBlue to-blue-400 shadow-glow'
                                  : 'bg-gradient-to-r from-lightBlue/70 to-lightBlue'
                              } rounded-full relative`}
                            >
                              {hoveredSkill === skill.name && (
                                <motion.div 
                                  className="absolute top-0 right-0 bottom-0 w-4 bg-white/30"
                                  animate={{ 
                                    x: [0, 20, 0],
                                    opacity: [0, 1, 0] 
                                  }}
                                  transition={{ 
                                    repeat: Infinity, 
                                    duration: 1.5,
                                    ease: "easeInOut" 
                                  }}
                                />
                              )}
                            </motion.div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>

                  {/* Skill Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.skills.map((skill, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ y: -5, scale: 1.02 }}
                        transition={{ delay: 0.1 * index }}
                        className="bg-gradient-to-br from-blue-900/30 to-blue-950/40 backdrop-blur-sm rounded-xl p-5 border border-blue-800/30 hover:border-lightBlue/50 transition-all duration-300 shadow-lg shadow-blue-900/5 hover:shadow-blue-900/20"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mr-3 text-xl`}>
                              {skill.icon || category.icon}
                            </div>
                            <h3 className="font-bold text-white">{skill.name}</h3>
                          </div>
                          <div className="h-8 w-8 rounded-full bg-blue-900/50 border border-blue-800/50 text-lightBlue text-sm flex items-center justify-center font-medium">
                            {skill.level}
                          </div>
                        </div>
                        <div className="mt-4 h-1.5 bg-blue-900/50 rounded-full overflow-hidden border border-blue-800/30">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1.5, delay: 0.1 * index }}
                            className="h-full bg-gradient-to-r from-lightBlue/70 to-lightBlue"
                          ></motion.div>
                        </div>
                        <div className="mt-3 flex justify-between items-center">
                          <span className="text-white/60 text-sm">
                            {skill.level >= 90 ? 'Expert' : 
                             skill.level >= 80 ? 'Advanced' : 
                             skill.level >= 70 ? 'Proficient' : 
                             skill.level >= 60 ? 'Intermediate' : 'Beginner'}
                          </span>
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg key={star} className={`w-3.5 h-3.5 ${star <= Math.floor(skill.level/20) ? 'text-lightBlue' : 'text-blue-900/50'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                )
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Learning Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="max-w-6xl mx-auto mt-20"
      >
        <div className="bg-gradient-to-br from-blue-900/30 to-blue-950/30 backdrop-blur-sm rounded-xl p-8 border border-lightBlue/20 shadow-lg shadow-blue-900/10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center flex-shrink-0 text-3xl">
              🧠
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Always Learning</h2>
              <p className="text-white/80 mb-6">
                I'm continuously expanding my skill set and staying up-to-date with the latest technologies.
                Currently exploring:
              </p>
              <div className="flex flex-wrap gap-3">
                {['Web3 & Blockchain', 'AI Integration', 'Advanced Three.js', 'Microservices Architecture'].map((tech, index) => (
                  <motion.span 
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-4 py-2 rounded-full bg-blue-900/50 text-white border border-blue-800/50 hover:border-lightBlue/50 hover:bg-blue-800/70 transition-all duration-300 shadow-sm"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 