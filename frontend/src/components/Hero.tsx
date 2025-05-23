import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative w-full bg-gradient-to-b from-gray-900 to-blue-950 py-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-600 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Hero content */}
          <div className="flex-1 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Automate Your Credit Dispute Process with <span className="text-blue-400">Project Cobra</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8">
                Our AI-powered platform streamlines credit report disputes, increases success rates, and helps you rebuild your financial future faster than ever before.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup" className="inline-block">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg transition duration-300"
                  >
                    Get Started Free
                  </motion.button>
                </Link>
                
                <Link href="#how-it-works" className="inline-block">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-transparent hover:bg-gray-800 text-white font-bold rounded-lg border-2 border-gray-600 transition duration-300"
                  >
                    How It Works
                  </motion.button>
                </Link>
              </div>
              
              <div className="mt-8 flex items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-blue-900 bg-gray-800 flex items-center justify-center text-xs text-white font-bold">
                      {i}
                    </div>
                  ))}
                </div>
                <p className="ml-4 text-gray-400">
                  <span className="text-blue-400 font-bold">2,500+</span> disputes successfully resolved
                </p>
              </div>
            </motion.div>
          </div>
          
          {/* Hero image */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative w-full max-w-lg mx-auto">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-xl opacity-75"></div>
              <div className="relative bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
                <Image
                  src="/images/dashboard-preview.png"
                  alt="Project Cobra Dashboard"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                  priority
                />
              </div>
              
              {/* Floating stats card */}
              <motion.div
                className="absolute -bottom-6 -left-6 bg-gray-900 p-4 rounded-lg border border-gray-800 shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Success Rate</p>
                    <p className="text-white font-bold text-xl">87%</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Floating notification card */}
              <motion.div
                className="absolute -top-6 -right-6 bg-gray-900 p-4 rounded-lg border border-gray-800 shadow-xl max-w-[200px]"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-600/20 rounded-full flex items-center justify-center mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Dispute Approved!</p>
                    <p className="text-gray-400 text-xs">Account removed from your report</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
