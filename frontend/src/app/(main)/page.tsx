'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import FeaturedProjects from '../../components/FeaturedProjects';
import axios from 'axios';

interface Profile {
  name: string;
  title: string;
  subtitle: string;
  bio: string;
}

interface Skill {
  _id: string;
  name: string;
  items: string[];
  order: number;
}

export default function Home() {
  const [profile, setProfile] = useState<Profile>({
    name: '',
    title: 'Full Stack Developer',
    subtitle: 'Building exceptional digital experiences',
    bio: 'I specialize in creating robust, scalable applications with modern tech stacks. I am a full stack developer with a passion for building exceptional digital experiences.'
  });
  
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch profile data
        const profileRes = await axios.get(`${API_URL}/api/profile`);
        setProfile(profileRes.data);
        
        // Fetch skills data
        const skillsRes = await axios.get(`${API_URL}/api/skills`);
        setSkills(skillsRes.data);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load some content');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API_URL]);

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
            Hello, I'm {profile.name}
          </h2>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-white">
            {profile.title}
          </h1>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 text-white/90">
            {profile.subtitle}
          </h3>
          <p className="text-white/80 text-lg mb-8 max-w-2xl leading-relaxed">
            {profile.bio}
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
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-lightBlue"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {skills.length > 0 ? (
                skills.map((category) => (
                  <motion.div 
                    key={category._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
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
                ))
              ) : (
                // Fallback skills if no data from API
                [
                  { name: 'Frontend Development', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
                  { name: 'Backend Development', items: ['Node.js', 'Express', 'MongoDB', 'REST APIs'] },
                  { name: 'DevOps & Tools', items: ['Git', 'Docker', 'CI/CD', 'AWS'] }
                ].map((category, index) => (
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
                ))
              )}
            </div>
          )}
        </motion.div>
      </section>

      {/* Featured Projects Section */}
      <FeaturedProjects />

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