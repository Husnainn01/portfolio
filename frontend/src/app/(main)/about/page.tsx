'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function About() {
  const [activeSkillTab, setActiveSkillTab] = useState<string>('frontend');
  
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  const skillTabs = [
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'tools', name: 'Tools' },
    { id: 'soft', name: 'Soft Skills' },
  ];

  const renderSkillTab = (tabId: string) => {
    switch(tabId) {
      case 'frontend':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SkillCard name="React & Next.js" value={95} description="Expert in building modern, performant web applications with React and Next.js" />
              <SkillCard name="TypeScript" value={90} description="Strong typing and maintainable code architecture" />
              <SkillCard name="Tailwind CSS" value={95} description="Rapid UI development with responsive design patterns" />
              <SkillCard name="UI/UX Design" value={85} description="Creating intuitive user experiences and attractive interfaces" />
            </div>
          </div>
        );
      case 'backend':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SkillCard name="Node.js & Express" value={90} description="Building scalable server-side applications and REST APIs" />
              <SkillCard name="MongoDB" value={85} description="NoSQL database design and optimization" />
              <SkillCard name="PostgreSQL" value={80} description="Relational database management and complex queries" />
              <SkillCard name="API Design" value={90} description="RESTful and GraphQL API architecture and implementation" />
            </div>
          </div>
        );
      case 'tools':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SkillCard name="Git & GitHub" value={95} description="Version control, collaboration and CI/CD workflows" />
              <SkillCard name="Docker" value={75} description="Containerization for consistent development and deployment" />
              <SkillCard name="CI/CD" value={80} description="Automated testing and deployment pipelines" />
              <SkillCard name="AWS/Vercel" value={85} description="Cloud deployment and serverless architecture" />
            </div>
          </div>
        );
      case 'soft':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SkillCard name="Team Leadership" value={90} description="Leading development teams and mentoring junior developers" />
              <SkillCard name="Client Communication" value={95} description="Translating technical concepts for non-technical stakeholders" />
              <SkillCard name="Problem Solving" value={95} description="Analytical thinking and creative solutions to complex problems" />
              <SkillCard name="Project Management" value={85} description="Agile methodologies and efficient workflow optimization" />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-8 md:px-16 lg:px-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16 max-w-4xl mx-auto text-center"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          About <span className="text-lightBlue">Me</span>
        </h1>
        <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
          Full Stack Developer specializing in building exceptional digital experiences 
          with a focus on responsive design, performance, and intuitive user interfaces.
        </p>
      </motion.div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="lg:col-span-4"
          >
            <div className="sticky top-24 space-y-8">
              {/* Profile Photo */}
              <div className="relative rounded-xl overflow-hidden aspect-square mb-8 max-w-xs mx-auto lg:mx-0 border border-lightBlue/30 backdrop-blur-sm shadow-lg shadow-blue-900/20">
                <Image 
                  src="/logo1.png" 
                  alt="Professional headshot"
                  width={400}
                  height={400}
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-darkBlue/80 to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                  <h2 className="text-xl font-bold text-white mb-1">Husnain</h2>
                  <p className="text-lightBlue">Full Stack Developer</p>
                </div>
              </div>

              {/* Profile Info */}
              <div className="bg-blue-900/20 backdrop-blur-sm p-6 rounded-xl border border-lightBlue/20 shadow-lg shadow-blue-900/10">
                <h2 className="text-2xl font-bold text-lightBlue mb-4">Profile</h2>
                <div className="space-y-5">
                  <div>
                    <h3 className="text-white/70 text-sm uppercase tracking-wider mb-1 font-medium">Location</h3>
                    <p className="text-white font-medium">Nagoya, Japan</p>
                  </div>
                  <div>
                    <h3 className="text-white/70 text-sm uppercase tracking-wider mb-1 font-medium">Education</h3>
                    <p className="text-white font-medium">B.S. Computer Science</p>
                    <p className="text-white/70 text-sm">University of Lahore</p>
                  </div>
                  <div>
                    <h3 className="text-white/70 text-sm uppercase tracking-wider mb-1 font-medium">Focus Areas</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="px-2 py-1 bg-blue-800/40 rounded-md text-white/90 text-sm">Front-End</span>
                      <span className="px-2 py-1 bg-blue-800/40 rounded-md text-white/90 text-sm">Full Stack</span>
                      <span className="px-2 py-1 bg-blue-800/40 rounded-md text-white/90 text-sm">Backend</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white/70 text-sm uppercase tracking-wider mb-1 font-medium">Languages</h3>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-white">English</span>
                        <span className="text-lightBlue text-sm">Fluent</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white">Japanese</span>
                        <span className="text-lightBlue text-sm">Conversational</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="bg-blue-900/20 backdrop-blur-sm p-6 rounded-xl border border-lightBlue/20 shadow-lg shadow-blue-900/10">
                <h2 className="text-2xl font-bold text-lightBlue mb-4">Contact</h2>
                <a href="mailto:contact@husnaindev.com" className="flex items-center text-white hover:text-lightBlue transition-colors mb-4 group">
                  <svg className="w-5 h-5 mr-3 text-lightBlue group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  contact@husnaindev.com
                </a>
                <div className="flex space-x-4 mt-4">
                  <a href="https://github.com/Husnainn01" target="_blank" rel="noopener noreferrer" className="bg-blue-800/30 p-2 rounded-lg text-white hover:text-lightBlue hover:bg-blue-800/50 transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/in/hus-nain-1b52ba302" target="_blank" rel="noopener noreferrer" className="bg-blue-800/30 p-2 rounded-lg text-white hover:text-lightBlue hover:bg-blue-800/50 transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a href="https://www.upwork.com/freelancers/~014eba36cd6551d235?viewMode=1" target="_blank" rel="noopener noreferrer" className="bg-blue-800/30 p-2 rounded-lg text-white hover:text-lightBlue hover:bg-blue-800/50 transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="lg:col-span-8"
          >
            {/* Bio Section */}
            <section className="mb-16">
              <div className="bg-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-lightBlue/20 shadow-lg shadow-blue-900/10">
                <h2 className="text-3xl font-bold text-white mb-6 inline-flex items-center">
                  <span className="text-lightBlue mr-3">&lt;</span>
                  Professional Summary
                  <span className="text-lightBlue ml-3">/&gt;</span>
                </h2>
                <div className="text-white/90 space-y-4 leading-relaxed">
                  <p className="text-lg">
                    I'm a passionate Full Stack Developer with a strong foundation in both front-end and back-end technologies,
                    specializing in creating intuitive, dynamic user experiences and robust server-side applications.
                  </p>
                  <p>
                    With over 8 years of professional experience, I've had the opportunity to work on diverse projects
                    ranging from corporate websites to complex logistics systems and financial applications. My journey
                    has taken me from Pakistan to Japan, where I've collaborated with international teams and delivered
                    high-quality solutions across multiple domains.
                  </p>
                  <p>
                    I thrive in environments that challenge me to learn new technologies and methodologies. Whether working
                    independently or leading development teams, I focus on delivering scalable, maintainable code that solves
                    real business problems.
                  </p>
                </div>
              </div>
            </section>

            {/* Skills Section */}
            <section className="mb-16">
              <div className="bg-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-lightBlue/20 shadow-lg shadow-blue-900/10">
                <h2 className="text-3xl font-bold text-white mb-8 inline-flex items-center">
                  <span className="text-lightBlue mr-3">&lt;</span>
                  Technical Expertise
                  <span className="text-lightBlue ml-3">/&gt;</span>
                </h2>
                
                {/* Skill Tabs */}
                <div className="flex flex-wrap mb-8 border-b border-blue-800/50">
                  {skillTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveSkillTab(tab.id)}
                      className={`px-4 py-3 font-medium text-sm transition-colors relative ${
                        activeSkillTab === tab.id 
                          ? 'text-lightBlue' 
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      {tab.name}
                      {activeSkillTab === tab.id && (
                        <motion.div 
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-lightBlue"
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* Skills Content */}
                <div className="min-h-[300px]">
                  {renderSkillTab(activeSkillTab)}
                </div>
              </div>
            </section>

            {/* Professional Timeline */}
            <section>
              <div className="bg-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-lightBlue/20 shadow-lg shadow-blue-900/10">
                <h2 className="text-3xl font-bold text-white mb-8 inline-flex items-center">
                  <span className="text-lightBlue mr-3">&lt;</span>
                  Professional Journey
                  <span className="text-lightBlue ml-3">/&gt;</span>
                </h2>
                
                <motion.div 
                  className="relative pl-8 ml-4 space-y-16"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Timeline line */}
                  <div className="absolute top-6 bottom-6 left-[2px] w-[2px] bg-lightBlue/40"></div>
                  
                  {/* Current */}
                  <motion.div className="relative" variants={itemVariants}>
                    <div className="absolute -left-[41px] top-2 h-6 w-6 rounded-full bg-darkBlue border-2 border-lightBlue flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-lightBlue"></div>
                    </div>
                    <div className="mb-2 flex items-center">
                      <span className="text-lg text-lightBlue font-medium">Now</span>
                      <div className="h-[1px] bg-lightBlue/30 flex-grow ml-4"></div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Open to Opportunities</h3>
                    <div className="bg-blue-900/30 backdrop-blur-sm border border-lightBlue/10 rounded-lg p-6 mt-4">
                      <ul className="space-y-3 text-white/90">
                        <li className="flex items-start">
                          <span className="text-lightBlue mr-3 mt-1">💼</span>
                          <span>Seeking roles focused on Front-End or Full Stack Development.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-lightBlue mr-3 mt-1">▹</span>
                          <span>Passionate about building high-performance UI, intuitive UX, and scalable systems.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-lightBlue mr-3 mt-1">▹</span>
                          <span>Constantly learning new technologies like Three.js, Astro, and AI-integrated apps.</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                  
                  {/* 2023-2025 */}
                  <motion.div className="relative" variants={itemVariants}>
                    <div className="absolute -left-[41px] top-2 h-6 w-6 rounded-full bg-darkBlue border-2 border-lightBlue"></div>
                    <div className="mb-2 flex items-center">
                      <span className="text-lg text-lightBlue font-medium">2023 – 2025</span>
                      <div className="h-[1px] bg-lightBlue/30 flex-grow ml-4"></div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Personal Projects & Freelance Work</h3>
                    <div className="bg-blue-900/30 backdrop-blur-sm border border-lightBlue/10 rounded-lg p-6 mt-4">
                      <ul className="space-y-3 text-white/90">
                        <li className="flex items-start">
                          <span className="text-lightBlue mr-3 mt-1">🚀</span>
                          <span>Built and deployed multiple full-stack applications including:</span>
                        </li>
                        <li className="flex items-start ml-6">
                          <span className="text-lightBlue mr-3 mt-1">▹</span>
                          <span>Car Dealership Platform</span>
                        </li>
                        <li className="flex items-start ml-6">
                          <span className="text-lightBlue mr-3 mt-1">▹</span>
                          <span>Banking Web App</span>
                        </li>
                        <li className="flex items-start ml-6">
                          <span className="text-lightBlue mr-3 mt-1">▹</span>
                          <span>Inventory/Logistics System</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-lightBlue mr-3 mt-1">▹</span>
                          <span>Used modern tools: React, Next.js, TypeScript, MongoDB, and Vercel for deployment.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-lightBlue mr-3 mt-1">▹</span>
                          <span>Integrated payment systems, role-based access control, and real-time updates.</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                  
                  {/* 2020-2025 */}
                  <motion.div className="relative" variants={itemVariants}>
                    <div className="absolute -left-[41px] top-2 h-6 w-6 rounded-full bg-darkBlue border-2 border-lightBlue"></div>
                    <div className="mb-2 flex items-center">
                      <span className="text-lg text-lightBlue font-medium">2020 – 2025 (Feb)</span>
                      <div className="h-[1px] bg-lightBlue/30 flex-grow ml-4"></div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Mid-Senior Full Stack Engineer</h3>
                    <p className="text-white/70 text-lg">SS Japan Limited Corporation</p>
                    <div className="bg-blue-900/30 backdrop-blur-sm border border-lightBlue/10 rounded-lg p-6 mt-4">
                      <ul className="space-y-3 text-white/90">
                        <li className="flex items-start">
                          <span className="text-lightBlue mr-3 mt-1">🌏</span>
                          <span>Relocated to Japan and joined SS Japan Limited Corporation.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-lightBlue mr-3 mt-1">▹</span>
                          <span>Led development of logistics systems, car auction listing platforms, invoice management, and mobile app interfaces.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-lightBlue mr-3 mt-1">▹</span>
                          <span>Managed both front-end (React, Next.js, Tailwind) and backend (Node.js, MongoDB, PostgreSQL).</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-lightBlue mr-3 mt-1">▹</span>
                          <span>Took part in requirement gathering, client interviews, and team leadership (10–20 devs).</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-lightBlue mr-3 mt-1">▹</span>
                          <span>Delivered high-quality, scalable products in financial and automotive domains.</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                  
                  {/* Earlier positions in more condensed format */}
                  <motion.div className="relative" variants={itemVariants}>
                    <div className="absolute -left-[41px] top-2 h-6 w-6 rounded-full bg-darkBlue border-2 border-lightBlue"></div>
                    <div className="mb-2 flex items-center">
                      <span className="text-lg text-lightBlue font-medium">2017 – 2020</span>
                      <div className="h-[1px] bg-lightBlue/30 flex-grow ml-4"></div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Earlier Career & Education</h3>
                    <div className="space-y-6">
                      <div className="bg-blue-900/30 backdrop-blur-sm border border-lightBlue/10 rounded-lg p-6 mt-4">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="text-xl font-bold text-white">Junior Software Developer</h4>
                          <span className="text-lightBlue text-sm">2018 – 2020</span>
                        </div>
                        <p className="text-white/70 text-sm mb-3">SS Pakistan</p>
                        <p className="text-white/90">Front-end development with HTML, CSS, JavaScript, and PHP. Contributed to internal tools and corporate websites while beginning backend work with Node.js and MySQL.</p>
                      </div>
                      
                      <div className="bg-blue-900/30 backdrop-blur-sm border border-lightBlue/10 rounded-lg p-6">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="text-xl font-bold text-white">Computer Science Degree</h4>
                          <span className="text-lightBlue text-sm">2017</span>
                        </div>
                        <p className="text-white/70 text-sm mb-3">University of Lahore</p>
                        <p className="text-white/90">Graduated with a Bachelor's in Computer Science with a focus on web technologies and software engineering principles.</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </section>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Skill Card Component
const SkillCard = ({ name, value, description }: { name: string, value: number, description: string }) => {
  // Determine skill level label
  const getSkillLevel = (value: number) => {
    if (value >= 90) return 'Expert';
    if (value >= 80) return 'Advanced';
    if (value >= 70) return 'Proficient';
    if (value >= 50) return 'Intermediate';
    return 'Beginner';
  };

  return (
    <div className="bg-blue-900/40 backdrop-blur-sm border border-lightBlue/20 p-5 rounded-lg hover:shadow-lg hover:shadow-blue-900/10 transition-all duration-300">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-white">{name}</h3>
        <div className="flex items-center space-x-2">
          <div className="text-xs px-2 py-0.5 bg-blue-800/70 rounded text-white">{getSkillLevel(value)}</div>
          <div className="text-lightBlue text-sm font-medium">{value}%</div>
        </div>
      </div>
      <p className="text-white/70 text-sm mb-3">{description}</p>
      <div className="h-2 bg-blue-950 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-full bg-gradient-to-r from-blue-500 to-lightBlue rounded-full"
        ></motion.div>
      </div>
    </div>
  );
}; 