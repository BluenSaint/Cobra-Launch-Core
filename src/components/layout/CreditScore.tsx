'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function CreditScore() {
  const [score, setScore] = useState(580);
  const [potentialScore, setPotentialScore] = useState(720);
  const [isSimulating, setIsSimulating] = useState(false);
  
  const handleSimulate = () => {
    if (isSimulating) return;
    
    setIsSimulating(true);
    
    // Reset score to starting value
    setScore(580);
    
    // Simulate score increase over time
    const duration = 2000; // ms
    const interval = 50; // ms
    const steps = duration / interval;
    const increment = (potentialScore - 580) / steps;
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      
      if (currentStep >= steps) {
        clearInterval(timer);
        setScore(potentialScore);
        setIsSimulating(false);
      } else {
        setScore(prev => Math.round(580 + (increment * currentStep)));
      }
    }, interval);
  };
  
  // Determine credit score rating
  const getCreditRating = (score: number) => {
    if (score >= 800) return 'Excellent';
    if (score >= 740) return 'Very Good';
    if (score >= 670) return 'Good';
    if (score >= 580) return 'Fair';
    return 'Poor';
  };
  
  const calculateProgressPercentage = (score: number) => {
    const min = 300;
    const max = 850;
    return ((score - min) / (max - min)) * 100;
  };
  
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">See How Much Your Score Can Improve</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            On average, our clients see a 70+ point increase in their credit scores within the first 90 days.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          <div className="w-full max-w-md">
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Your Estimated Score</h3>
                <p className="text-sm text-gray-400">
                  Watch how our AI-powered disputes can transform your credit score.
                </p>
              </div>
              
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-400">300</span>
                <span className="text-gray-400">850</span>
              </div>
              
              <div className="relative h-8 bg-gray-700 rounded-full mb-4 overflow-hidden">
                {/* Before Score */}
                <motion.div
                  className="absolute h-full bg-yellow-500 z-10"
                  style={{ width: `${calculateProgressPercentage(580)}%` }}
                  animate={{ opacity: isSimulating ? 0.4 : 1 }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Current Score */}
                <motion.div
                  className="absolute h-full bg-green-500 z-20"
                  initial={{ width: `${calculateProgressPercentage(580)}%` }}
                  animate={{ width: `${calculateProgressPercentage(score)}%` }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Score Marker */}
                <motion.div
                  className="absolute top-0 h-12 w-0.5 bg-white z-30 -mt-2"
                  initial={{ left: `${calculateProgressPercentage(580)}%` }}
                  animate={{ left: `${calculateProgressPercentage(score)}%` }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="absolute -ml-6 -mt-7 bg-gray-900 px-2 py-1 rounded text-sm font-bold">
                    {score}
                  </div>
                </motion.div>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm text-gray-400">Current Rating:</span>
                    <span className="ml-2 font-medium text-yellow-500">
                      Fair
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-400">Potential Rating:</span>
                    <span className="ml-2 font-medium text-green-500">
                      {getCreditRating(potentialScore)}
                    </span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleSimulate}
                disabled={isSimulating}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-75"
              >
                {isSimulating ? 'Simulating...' : 'Simulate Score Improvement'}
              </button>
              
              <div className="mt-4 text-center text-xs text-gray-500">
                Results based on average improvements. Individual results may vary.
              </div>
            </div>
          </div>
          
          <div className="w-full max-w-md">
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">How We Can Help</h3>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Remove Inaccurate Information</h4>
                    <p className="text-sm text-gray-400">
                      Our AI identifies and disputes errors, late payments, collections, and incorrect account information.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Fix Identity Errors</h4>
                    <p className="text-sm text-gray-400">
                      Correct mixed files, wrong personal information, and fraudulent accounts from identity theft.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Enforce FCRA Compliance</h4>
                    <p className="text-sm text-gray-400">
                      Hold credit bureaus accountable to the legal standards required when reporting your credit.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Smart Optimization</h4>
                    <p className="text-sm text-gray-400">
                      Get personalized advice on how to structure your accounts to maximize your score.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 