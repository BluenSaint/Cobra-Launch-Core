'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ScorePanelProps {
  currentScore: number;
  potentialScore: number;
  bureauScores: {
    transunion: number;
    equifax: number;
    experian: number;
  };
}

export default function ScorePanel({
  currentScore = 620,
  potentialScore = 720,
  bureauScores = {
    transunion: 618,
    equifax: 625,
    experian: 617,
  },
}: Partial<ScorePanelProps>) {
  // Calculate the percentage for the circular progress
  const maxScore = 850;
  const scorePercentage = (currentScore / maxScore) * 100;
  const circumference = 40 * 2 * Math.PI;
  const strokeDashoffset = circumference - (scorePercentage / 100) * circumference;
  
  // Animation variants
  const scoreVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 } 
    }
  };
  
  // Determine credit score rating
  const getCreditRating = (score: number) => {
    if (score >= 800) return 'Excellent';
    if (score >= 740) return 'Very Good';
    if (score >= 670) return 'Good';
    if (score >= 580) return 'Fair';
    return 'Poor';
  };
  
  return (
    <motion.div 
      className="score-panel p-6 rounded-xl"
      initial="hidden"
      animate="visible"
      variants={scoreVariants}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Your Credit Score</h3>
        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">Updated Today</span>
      </div>
      
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle 
              className="text-gray-700" 
              strokeWidth="8" 
              stroke="currentColor" 
              fill="transparent" 
              r="40" 
              cx="50" 
              cy="50" 
            />
            <motion.circle 
              className="text-blue-500" 
              strokeWidth="8" 
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              strokeLinecap="round" 
              stroke="currentColor" 
              fill="transparent" 
              r="40" 
              cx="50" 
              cy="50" 
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <motion.span 
              className="text-3xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {currentScore}
            </motion.span>
            <div className="text-xs text-gray-400">{getCreditRating(currentScore)} Credit</div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-xs text-gray-400 mb-1">TransUnion</div>
          <motion.div 
            className="font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {bureauScores.transunion}
          </motion.div>
        </div>
        <div>
          <div className="text-xs text-gray-400 mb-1">Equifax</div>
          <motion.div 
            className="font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {bureauScores.equifax}
          </motion.div>
        </div>
        <div>
          <div className="text-xs text-gray-400 mb-1">Experian</div>
          <motion.div 
            className="font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {bureauScores.experian}
          </motion.div>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-700">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm">Potential After Repair</span>
          <span className="text-sm font-medium text-green-400">{potentialScore}+</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <motion.div 
            className="bg-green-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(potentialScore / maxScore) * 100}%` }}
            transition={{ duration: 1, delay: 0.8 }}
          />
        </div>
      </div>
    </motion.div>
  );
} 