'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    error: false,
    message: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [activeField, setActiveField] = useState<string | null>(null);

  // Reset success message after 5 seconds
  useEffect(() => {
    if (status.submitted && !status.error) {
      const timer = setTimeout(() => {
        setStatus(prev => ({ ...prev, submitted: false, message: '' }));
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [status.submitted, status.error]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', message: '' };
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
      isValid = false;
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleFocus = (fieldName: string) => {
    setActiveField(fieldName);
  };

  const handleBlur = () => {
    setActiveField(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setStatus({ submitted: false, submitting: true, error: false, message: '' });

    try {
      const response = await axios.post('http://localhost:5001/api/contact', formData);
      
      if (response.status === 200) {
        setStatus({
          submitted: true,
          submitting: false,
          error: false,
          message: 'Message sent successfully! I\'ll get back to you soon.',
        });
        
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      }
    } catch (error) {
      setStatus({
        submitted: false,
        submitting: false,
        error: true,
        message: 'Something went wrong. Please try again later.',
      });
    }
  };

  // Form field animation variants
  const formFieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      }
    }),
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-8 md:px-16 lg:px-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold font-aldrich text-lightBlue mb-2">Let's Connect</h1>
        <p className="text-white/80 text-lg max-w-2xl">
          Have a project in mind or want to work together? I'd love to hear from you!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative"
        >
          {/* Success message overlay */}
          <AnimatePresence>
            {status.submitted && !status.error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute inset-0 flex items-center justify-center bg-darkBlue/80 backdrop-blur-sm rounded-lg z-10"
              >
                <div className="bg-blue-900/90 border border-lightBlue/30 rounded-lg p-6 text-center max-w-md mx-auto">
                  <div className="mb-4 mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-green-500/20 border border-green-500">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-aldrich text-lightBlue mb-2">Message Sent!</h3>
                  <p className="text-white/80">{status.message}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="bg-blue-900/20 backdrop-blur-sm rounded-lg border border-lightBlue/20 p-6 md:p-8">
            <h2 className="text-2xl font-aldrich text-lightBlue mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                custom={0}
                variants={formFieldVariants}
                initial="hidden"
                animate="visible"
                className="relative"
              >
                <label 
                  htmlFor="name" 
                  className={`block text-sm font-medium mb-2 transition-colors duration-300 ${activeField === 'name' ? 'text-lightBlue' : 'text-white/90'}`}
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 bg-blue-950/50 border rounded-md focus:outline-none focus:ring-2 text-white transition-all duration-300 ${
                    errors.name ? 'border-red-500 focus:ring-red-500/50' : activeField === 'name' ? 'border-lightBlue focus:ring-lightBlue/50' : 'border-lightBlue/30'
                  }`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </motion.div>

              <motion.div
                custom={1}
                variants={formFieldVariants}
                initial="hidden"
                animate="visible"
                className="relative"
              >
                <label 
                  htmlFor="email" 
                  className={`block text-sm font-medium mb-2 transition-colors duration-300 ${activeField === 'email' ? 'text-lightBlue' : 'text-white/90'}`}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 bg-blue-950/50 border rounded-md focus:outline-none focus:ring-2 text-white transition-all duration-300 ${
                    errors.email ? 'border-red-500 focus:ring-red-500/50' : activeField === 'email' ? 'border-lightBlue focus:ring-lightBlue/50' : 'border-lightBlue/30'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </motion.div>

              <motion.div
                custom={2}
                variants={formFieldVariants}
                initial="hidden"
                animate="visible"
                className="relative"
              >
                <label 
                  htmlFor="subject" 
                  className={`block text-sm font-medium mb-2 transition-colors duration-300 ${activeField === 'subject' ? 'text-lightBlue' : 'text-white/90'}`}
                >
                  Subject (Optional)
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => handleFocus('subject')}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 bg-blue-950/50 border rounded-md focus:outline-none focus:ring-2 text-white transition-all duration-300 ${
                    activeField === 'subject' ? 'border-lightBlue focus:ring-lightBlue/50' : 'border-lightBlue/30'
                  }`}
                >
                  <option value="" className="bg-blue-900">Select a subject</option>
                  <option value="Job Opportunity" className="bg-blue-900">Job Opportunity</option>
                  <option value="Project Inquiry" className="bg-blue-900">Project Inquiry</option>
                  <option value="Collaboration" className="bg-blue-900">Collaboration</option>
                  <option value="Other" className="bg-blue-900">Other</option>
                </select>
              </motion.div>

              <motion.div
                custom={3}
                variants={formFieldVariants}
                initial="hidden"
                animate="visible"
                className="relative"
              >
                <label 
                  htmlFor="message" 
                  className={`block text-sm font-medium mb-2 transition-colors duration-300 ${activeField === 'message' ? 'text-lightBlue' : 'text-white/90'}`}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={handleBlur}
                  rows={6}
                  className={`w-full px-4 py-3 bg-blue-950/50 border rounded-md focus:outline-none focus:ring-2 text-white transition-all duration-300 resize-none ${
                    errors.message ? 'border-red-500 focus:ring-red-500/50' : activeField === 'message' ? 'border-lightBlue focus:ring-lightBlue/50' : 'border-lightBlue/30'
                  }`}
                  placeholder="Your message here..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </motion.div>

              <motion.button
                custom={4}
                variants={formFieldVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status.submitting}
                className={`px-6 py-3 bg-lightBlue text-darkBlue font-bold rounded-md transition-all duration-300 w-full ${
                  status.submitting ? 'opacity-80' : 'hover:bg-lightBlue/90'
                }`}
              >
                {status.submitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-darkBlue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </div>
                ) : 'Send Message'}
              </motion.button>

              {status.error && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-500/20 border border-red-500/40 rounded-md"
                >
                  <p className="text-red-500 text-sm">{status.message}</p>
                </motion.div>
              )}
            </form>
          </div>
        </motion.div>

        {/* Contact Information */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-blue-900/20 backdrop-blur-sm rounded-lg border border-lightBlue/20 p-6 md:p-8"
          >
            <h2 className="text-2xl font-aldrich text-lightBlue mb-6">Get In Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-800/30 p-3 rounded-full">
                  <svg className="w-6 h-6 text-lightBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">Email</h3>
                  <a href="mailto:contact@husnaindev.com" className="text-lightBlue hover:underline transition-colors">
                    contact@husnaindev.com
                  </a>
                  <p className="text-white/60 text-sm mt-1">Expect a response within 24-48 hours</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-blue-800/30 p-3 rounded-full">
                  <svg className="w-6 h-6 text-lightBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">Location</h3>
                  <p className="text-white/80">Nagoya, Japan</p>
                  <p className="text-white/60 text-sm mt-1">Available for remote work worldwide</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-blue-900/20 backdrop-blur-sm rounded-lg border border-lightBlue/20 p-6 md:p-8"
          >
            <h2 className="text-2xl font-aldrich text-lightBlue mb-6">Connect</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <a 
                href="https://github.com/Husnainn01" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-4 bg-blue-800/30 rounded-lg hover:bg-blue-800/50 transition-colors group"
              >
                <svg className="w-6 h-6 text-white group-hover:text-lightBlue transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                <span className="font-medium text-white group-hover:text-lightBlue transition-colors">GitHub</span>
              </a>
              
              <a 
                href="https://www.linkedin.com/in/hus-nain-1b52ba302" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-4 bg-blue-800/30 rounded-lg hover:bg-blue-800/50 transition-colors group"
              >
                <svg className="w-6 h-6 text-white group-hover:text-lightBlue transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span className="font-medium text-white group-hover:text-lightBlue transition-colors">LinkedIn</span>
              </a>
              
              <a 
                href="https://www.upwork.com/freelancers/~014eba36cd6551d235" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-4 bg-blue-800/30 rounded-lg hover:bg-blue-800/50 transition-colors group"
              >
                <svg className="w-6 h-6 text-white group-hover:text-lightBlue transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
                <span className="font-medium text-white group-hover:text-lightBlue transition-colors">Twitter</span>
              </a>
              
              <a 
                href="https://www.instagram.com/husnaindev/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-4 bg-blue-800/30 rounded-lg hover:bg-blue-800/50 transition-colors group"
              >
                <svg className="w-6 h-6 text-white group-hover:text-lightBlue transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.246c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                </svg>
                <span className="font-medium text-white group-hover:text-lightBlue transition-colors">Instagram</span>
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="bg-blue-900/20 backdrop-blur-sm rounded-lg border border-lightBlue/20 p-6 md:p-8"
          >
            <h2 className="text-2xl font-aldrich text-lightBlue mb-4">Availability</h2>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-white">Current Status:</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/20 text-green-400">
                  <span className="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
                  Available for Work
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white">Response Time:</span>
                <span className="text-white/80">24-48 hours</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white">Preferred Projects:</span>
                <span className="text-white/80">Web Apps, Mobile, Backend</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 