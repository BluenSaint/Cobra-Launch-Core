"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div className="relative bg-gray-900 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-blue-900"></div>
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500 bg-opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 5 + 1}px`,
              height: `${Math.random() * 5 + 1}px`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      
      <div className="relative container-section py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              AI-Powered Credit Repair, Legally Guaranteed
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Dispute inaccuracies, remove errors, and boost your score 2x faster. 100% FCRA/CROA compliant.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/signup" 
                className="btn-primary"
              >
                Start Free Analysis
              </Link>
              <Link 
                href="/features" 
                className="btn-secondary"
              >
                Explore Features
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-lg bg-gray-800 p-6 shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Your Credit Score</h3>
              <span className="px-2 py-1 rounded bg-blue-600 text-white text-sm">Simulation</span>
            </div>
            
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400">Current</span>
              <span className="font-bold text-yellow-500">580</span>
            </div>
            
            <div className="w-full bg-gray-700 rounded-full h-2.5 mb-6">
              <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '58%' }}></div>
            </div>
            
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400">Potential</span>
              <span className="font-bold text-green-500">720+</span>
            </div>
            
            <div className="w-full bg-gray-700 rounded-full h-2.5 mb-6">
              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '72%' }}></div>
            </div>
            
            <div className="border-t border-gray-700 pt-4 mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Errors detected:</span>
                <span className="text-white">12</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-gray-400">Time to resolve:</span>
                <span className="text-white">45-60 days</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 