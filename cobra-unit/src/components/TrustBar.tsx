"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BADGES } from '@/lib/compliance';

const trustTags = [
  "As seen in Fintech Today",
  "Audited by Legal Experts",
  "Trusted by 10,000+ Clients",
  "A+ Rating with the BBB"
];

export default function TrustBar() {
  const [currentTagIndex, setCurrentTagIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagIndex((prevIndex) => (prevIndex + 1) % trustTags.length);
    }, 3500);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="bg-gray-800 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            {BADGES.map((badge, index) => (
              <div 
                key={index}
                className="flex items-center bg-gray-700 px-4 py-2 rounded-full"
                aria-label={badge.description}
              >
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-white font-medium">{badge.name}</span>
              </div>
            ))}
          </div>
          
          <div className="h-6 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTagIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-sm font-medium text-gray-300"
              >
                {trustTags[currentTagIndex]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
} 