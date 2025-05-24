"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const LandingPage = () => {
  // State for mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div id="landing" className="min-h-screen tactical-grid">
      {/* Navigation */}
      <nav className="bg-black bg-opacity-80 backdrop-blur-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <motion.img 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="h-8 w-auto glow" 
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgNTAiPjxwYXRoIGZpbGw9IiMwMDY2ZmYiIGQ9Ik0xODAgMTBjLTEwIDAtMTAgMTAtMjAgMTBTMTMwIDAgMTIwIDAgODAgMzAgNzAgMzAgNTAgMTAgNDAgMTAgMCAyMCAwIDMwdjEwYzAgMTAgMTAgMTAgMjAgMTBzMTAtMTAgMjAtMTAgMzAgMjAgNDAgMjAgNDAtMjAgNTAtMjAgMTAtMTAgMjAtMTBzMTAgMTAgMjAgMTBoMTBjMTAgMCAxMC0xMCAyMC0xMHMxMC0xMCAyMC0xMGMxMCAwIDEwIDEwIDAgMjBzLTEwIDEwLTIwIDEwLTEwLTEwLTIwLTEwLTMwIDIwLTQwIDIwLTMwLTIwLTQwLTIwLTEwIDEwLTIwIDEwLTEwLTEwLTIwLTEwLTEwIDEwLTEwIDIwYzAgMTAgMTAgMTAgMjAgMTBzMjAtMTAgMzAtMTAgMzAgMTAgNDAgMTAgNDAtMTAgNTAtMTBjMTAgMCAxMCAxMCAwIDIweiIvPjwvc3ZnPg==" 
                  alt="Blue Crest Logo" 
                />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a href="#features" className="px-3 py-2 rounded-md text-sm font-medium hover:text-accent transition">Features</a>
                  <a href="#how-it-works" className="px-3 py-2 rounded-md text-sm font-medium hover:text-accent transition">How It Works</a>
                  <a href="#pricing" className="px-3 py-2 rounded-md text-sm font-medium hover:text-accent transition">Pricing</a>
                  <a href="#testimonials" className="px-3 py-2 rounded-md text-sm font-medium hover:text-accent transition">Testimonials</a>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <a href="/login" className="px-4 py-2 rounded-md text-sm font-medium border border-primary hover:bg-primary hover:bg-opacity-20 transition">Login</a>
                <a href="/signup" className="ml-3 px-4 py-2 rounded-md text-sm font-medium bg-primary hover:bg-opacity-80 transition">Sign Up</a>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button 
                type="button" 
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black bg-opacity-90 backdrop-blur-md"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#features" className="block px-3 py-2 rounded-md text-base font-medium hover:text-accent transition">Features</a>
              <a href="#how-it-works" className="block px-3 py-2 rounded-md text-base font-medium hover:text-accent transition">How It Works</a>
              <a href="#pricing" className="block px-3 py-2 rounded-md text-base font-medium hover:text-accent transition">Pricing</a>
              <a href="#testimonials" className="block px-3 py-2 rounded-md text-base font-medium hover:text-accent transition">Testimonials</a>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-800">
              <div className="px-2 space-y-1">
                <a href="/login" className="block px-3 py-2 rounded-md text-base font-medium hover:text-accent transition">Login</a>
                <a href="/signup" className="block px-3 py-2 rounded-md text-base font-medium hover:text-accent transition">Sign Up</a>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="relative pt-32 pb-20 px-4 sm:px-6 lg:pt-40 lg:pb-28 lg:px-8"
      >
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <motion.h1 
              variants={fadeIn}
              className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl font-space"
            >
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="block text-primary"
              >
                PROJECT COBRA
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="block"
              >
                Credit Warfare System
              </motion.span>
            </motion.h1>
            <motion.p 
              variants={fadeIn}
              className="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
            >
              AI-powered credit dispute automation with military-grade precision. Remove inaccuracies, escalate violations, and reclaim your financial freedom.
            </motion.p>
            <motion.div 
              variants={fadeIn}
              className="mt-10 sm:flex sm:justify-center"
            >
              <div className="rounded-md shadow">
                <a 
                  href="/signup" 
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-opacity-80 md:py-4 md:text-lg md:px-10 transition-all glow-box"
                >
                  Start Credit Warfare
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        id="features" 
        className="py-12 bg-black bg-opacity-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <motion.h2 
              variants={fadeIn}
              className="text-base text-primary font-semibold tracking-wide uppercase"
            >
              Tactical Advantages
            </motion.h2>
            <motion.p 
              variants={fadeIn}
              className="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl font-space"
            >
              AI-Powered Credit Warfare Suite
            </motion.p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <motion.div 
                variants={fadeIn}
                className="bg-gray-900 bg-opacity-50 p-6 rounded-lg glow-box hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.03 }}
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                  <i className="fas fa-robot text-xl"></i>
                </div>
                <div className="mt-5">
                  <h3 className="text-lg leading-6 font-medium">AI Dispute Engine</h3>
                  <p className="mt-2 text-base text-gray-300">
                    Our neural networks analyze your credit reports with military precision, identifying 93% more dispute-worthy items than human reviewers.
                  </p>
                </div>
              </motion.div>

              {/* Feature 2 */}
              <motion.div 
                variants={fadeIn}
                className="bg-gray-900 bg-opacity-50 p-6 rounded-lg glow-box hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.03 }}
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                  <i className="fas fa-fighter-jet text-xl"></i>
                </div>
                <div className="mt-5">
                  <h3 className="text-lg leading-6 font-medium">Escalation Protocol</h3>
                  <p className="mt-2 text-base text-gray-300">
                    Automatic escalation to CFPB and State AG offices when creditors violate FCRA timelines. Our system never backs down.
                  </p>
                </div>
              </motion.div>

              {/* Feature 3 */}
              <motion.div 
                variants={fadeIn}
                className="bg-gray-900 bg-opacity-50 p-6 rounded-lg glow-box hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.03 }}
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                  <i className="fas fa-shield-alt text-xl"></i>
                </div>
                <div className="mt-5">
                  <h3 className="text-lg leading-6 font-medium">24/7 Monitoring</h3>
                  <p className="mt-2 text-base text-gray-300">
                    Real-time alerts for new inquiries, collections, or score changes. We watch your back so you don't have to.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* How It Works Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        id="how-it-works" 
        className="py-12 tactical-grid"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <motion.h2 
              variants={fadeIn}
              className="text-base text-primary font-semibold tracking-wide uppercase"
            >
              Mission Protocol
            </motion.h2>
            <motion.p 
              variants={fadeIn}
              className="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl font-space"
            >
              How The System Operates
            </motion.p>
          </div>

          <div className="mt-10">
            <div className="relative">
              <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                {/* Step 1 */}
                <motion.div 
                  variants={fadeIn}
                  className="bg-gray-900 bg-opacity-80 p-6 rounded-lg relative z-10 hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="flex items-center">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold">
                      1
                    </div>
                    <h3 className="ml-4 text-lg leading-6 font-medium">Upload Documents</h3>
                  </div>
                  <p className="mt-4 text-base text-gray-300">
                    Securely upload your credit reports, ID, and proof of address. Our OCR technology extracts and structures all data.
                  </p>
                </motion.div>

                {/* Step 2 */}
                <motion.div 
                  variants={fadeIn}
                  className="bg-gray-900 bg-opacity-80 p-6 rounded-lg relative z-10 hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="flex items-center">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold">
                      2
                    </div>
                    <h3 className="ml-4 text-lg leading-6 font-medium">AI Analysis</h3>
                  </div>
                  <p className="mt-4 text-base text-gray-300">
                    Our TensorFlow models scan for FCRA violations, inaccuracies, and dispute opportunities with 98.7% accuracy.
                  </p>
                </motion.div>

                {/* Step 3 */}
                <motion.div 
                  variants={fadeIn}
                  className="bg-gray-900 bg-opacity-80 p-6 rounded-lg relative z-10 hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="flex items-center">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold">
                      3
                    </div>
                    <h3 className="ml-4 text-lg leading-6 font-medium">Automated Warfare</h3>
                  </div>
                  <p className="mt-4 text-base text-gray-300">
                    System generates legally perfect dispute letters, sends to bureaus, and escalates when necessary - all automatically.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Pricing Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        id="pricing" 
        className="py-12 bg-black bg-opacity-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <motion.h2 
              variants={fadeIn}
              className="text-base text-primary font-semibold tracking-wide uppercase"
            >
              Deployment Packages
            </motion.h2>
            <motion.p 
              variants={fadeIn}
              className="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl font-space"
            >
              Strategic Pricing Tiers
            </motion.p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Tier 1 */}
              <motion.div 
                variants={fadeIn}
                className="bg-gray-900 bg-opacity-70 p-6 rounded-lg border border-gray-800 hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.03 }}
              >
                <h3 className="text-lg leading-6 font-medium">COBRA SHIELD</h3>
                <p className="mt-4">
                  <span className="text-4xl font-bold">$85</span>
                  <span className="text-base font-medium text-gray-300">/month</span>
                </p>
                <p className="mt-4 text-sm text-gray-300">
                  Basic credit warfare package for standard disputes
                </p>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-start">
                    <i className="fas fa-check text-primary mt-1 mr-2"></i>
                    <span className="text-sm">5 dispute letters per month</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-primary mt-1 mr-2"></i>
                    <span className="text-sm">AI-powered dispute generation</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-primary mt-1 mr-2"></i>
                    <span className="text-sm">Credit monitoring alerts</span>
                  </li>
                  <li className="flex items-start text-gray-500">
                    <i className="fas fa-times mt-1 mr-2"></i>
                    <span className="text-sm">No CFPB escalations</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <a href="/signup?plan=shield" className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 transition-all duration-300">
                    Deploy Shield
                  </a>
                </div>
              </motion.div>

              {/* Tier 2 */}
              <motion.div 
                variants={fadeIn}
                className="bg-gray-900 bg-opacity-70 p-6 rounded-lg border-2 border-primary relative glow-box hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                  RECOMMENDED
                </div>
                <h3 className="text-lg leading-6 font-medium">COBRA ELITE</h3>
                <p className="mt-4">
                  <span className="text-4xl font-bold">$150</span>
                  <span className="text-base font-medium text-gray-300">/month</span>
                </p>
                <p className="mt-4 text-sm text-gray-300">
                  Advanced tactical package for serious credit warfare
                </p>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-start">
                    <i className="fas fa-check text-primary mt-1 mr-2"></i>
                    <span className="text-sm">Unlimited dispute letters</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-primary mt-1 mr-2"></i>
                    <span className="text-sm">Priority AI analysis</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-primary mt-1 mr-2"></i>
                    <span className="text-sm">Automatic CFPB escalations</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-primary mt-1 mr-2"></i>
                    <span className="text-sm">24/7 monitoring & alerts</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <a href="/signup?plan=elite" className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-opacity-80 transition-all duration-300">
                    Deploy Elite
                  </a>
                </div>
              </motion.div>

              {/* Tier 3 */}
              <motion.div 
                variants={fadeIn}
                className="bg-gray-900 bg-opacity-70 p-6 rounded-lg border border-gray-800 hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.03 }}
              >
                <h3 className="text-lg leading-6 font-medium">COBRA INFINITY</h3>
                <p className="mt-4">
                  <span className="text-4xl font-bold">$399</span>
                  <span className="text-base font-medium text-gray-300">/month</span>
                </p>
                <p className="mt-4 text-sm text-gray-300">
                  Full-spectrum credit dominance for high-net-worth individuals
                </p>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-start">
                    <i className="fas fa-check text-primary mt-1 mr-2"></i>
                    <span className="text-sm">All Elite features plus:</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-primary mt-1 mr-2"></i>
                    <span className="text-sm">Dedicated dispute strategist</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-primary mt-1 mr-2"></i>
                    <span className="text-sm">Same-day dispute processing</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-primary mt-1 mr-2"></i>
                    <span className="text-sm">Attorney review of all letters</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <a href="/signup?plan=infinity" className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 transition-all duration-300">
                    Deploy Infinity
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        id="testimonials" 
        className="py-12 tactical-grid"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <motion.h2 
              variants={fadeIn}
              className="text-base text-primary font-semibold tracking-wide uppercase"
            >
              Mission Reports
            </motion.h2>
            <motion.p 
              variants={fadeIn}
              className="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl font-space"
            >
              Success Stories From The Field
            </motion.p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Testimonial 1 */}
              <motion.div 
                variants={fadeIn}
                className="bg-gray-900 bg-opacity-70 p-6 rounded-lg border border-gray-800 hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
                    <span className="text-lg font-bold">JD</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium">James D.</h4>
                    <div className="flex text-yellow-400">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                  </div>
                </div>
                <p className="text-gray-300">
                  "Project Cobra removed 7 collections from my report in just 45 days. My score jumped 137 points and I was able to refinance my mortgage, saving $450/month."
                </p>
              </motion.div>

              {/* Testimonial 2 */}
              <motion.div 
                variants={fadeIn}
                className="bg-gray-900 bg-opacity-70 p-6 rounded-lg border border-gray-800 hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
                    <span className="text-lg font-bold">SM</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium">Sarah M.</h4>
                    <div className="flex text-yellow-400">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star-half-alt"></i>
                    </div>
                  </div>
                </div>
                <p className="text-gray-300">
                  "After identity theft destroyed my credit, Project Cobra helped me remove 23 fraudulent accounts. Their CFPB escalation process was a game-changer when bureaus initially refused."
                </p>
              </motion.div>

              {/* Testimonial 3 */}
              <motion.div 
                variants={fadeIn}
                className="bg-gray-900 bg-opacity-70 p-6 rounded-lg border border-gray-800 hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
                    <span className="text-lg font-bold">RK</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium">Robert K.</h4>
                    <div className="flex text-yellow-400">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                  </div>
                </div>
                <p className="text-gray-300">
                  "As a small business owner, I needed perfect credit to secure expansion funding. Project Cobra's Infinity tier got me from 680 to 790 in 90 days. Worth every penny."
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
        className="py-16 bg-primary bg-opacity-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl font-space">
              <span className="block">Ready to reclaim your financial freedom?</span>
              <span className="block text-primary">Deploy Project Cobra today.</span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <a href="/signup" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-opacity-80 transition-all duration-300 glow-box">
                  Get started
                </a>
              </div>
              <div className="ml-3 inline-flex rounded-md shadow">
                <a href="#how-it-works" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-gray-900 hover:bg-gray-800 transition-all duration-300">
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="bg-black bg-opacity-80">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-gray-300 hover:text-white">About</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Resources</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Knowledge Base</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">FCRA Guide</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Privacy</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Terms</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Disclaimer</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Connect</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Contact</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Support</a></li>
                <li>
                  <div className="flex space-x-6">
                    <a href="#" className="text-gray-400 hover:text-white">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
              &copy; 2025 Blue Crest Financial. All rights reserved. Project Cobra is a credit education platform, not a law firm.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
