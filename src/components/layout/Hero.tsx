'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="hero-section pt-32 pb-20 container-padding">
      <div className="container-width">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text and CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 font-heading">
              AI-Powered Credit <span className="gradient-text">Warfare.</span> <br />
              Legally Bulletproof.
            </h1>
            
            <p className="text-lg text-gray-300 mb-8 max-w-lg">
              Dispute inaccuracies, remove errors, and boost your score 2x faster. 
              100% FCRA/CROA compliant.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
              <Link 
                href="#upload" 
                className="btn-primary flex items-center justify-center"
              >
                Start Free Analysis
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              
              <Link 
                href="#features" 
                className="btn-secondary flex items-center justify-center"
              >
                Watch Demo
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full ring-2 ring-zinc-800 bg-zinc-700 flex items-center justify-center text-xs">JD</div>
                <div className="w-8 h-8 rounded-full ring-2 ring-zinc-800 bg-zinc-700 flex items-center justify-center text-xs">SM</div>
                <div className="w-8 h-8 rounded-full ring-2 ring-zinc-800 bg-zinc-700 flex items-center justify-center text-xs">RK</div>
              </div>
              <div className="text-sm text-gray-400">
                <span className="font-medium text-white">1,200+</span> clients improved their score last month
              </div>
            </div>
          </motion.div>
          
          {/* Right Column: Dashboard Preview */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-zinc-900/40 backdrop-blur-md rounded-xl border border-zinc-800/60 p-6 shadow-xl animate-float">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">Your Credit Score</h3>
                <span className="text-xs bg-zinc-800 text-gray-300 px-2 py-1 rounded">Updated Today</span>
              </div>
              
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-48 h-48">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle 
                      className="text-zinc-800" 
                      strokeWidth="8" 
                      stroke="currentColor" 
                      fill="transparent" 
                      r="40" 
                      cx="50" 
                      cy="50" 
                    />
                    <motion.circle 
                      className="text-accent" 
                      strokeWidth="8" 
                      strokeDasharray="251.2"
                      initial={{ strokeDashoffset: 251.2 }}
                      animate={{ strokeDashoffset: 75.36 }}
                      transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                      strokeLinecap="round" 
                      stroke="currentColor" 
                      fill="transparent" 
                      r="40" 
                      cx="50" 
                      cy="50" 
                    />
                  </svg>
                  <motion.div 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <span className="text-3xl font-bold">620</span>
                    <div className="text-xs text-gray-400">Fair Credit</div>
                  </motion.div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xs text-gray-400 mb-1">TransUnion</div>
                  <div className="font-medium">618</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">Equifax</div>
                  <div className="font-medium">625</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">Experian</div>
                  <div className="font-medium">617</div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-zinc-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Potential After Repair</span>
                  <span className="text-sm font-medium text-accent">720+</span>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-2">
                  <motion.div 
                    className="bg-accent h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '70%' }}
                    transition={{ duration: 1, delay: 1 }}
                  />
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/10 rounded-full blur-xl" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-accent/5 rounded-full blur-xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
} 