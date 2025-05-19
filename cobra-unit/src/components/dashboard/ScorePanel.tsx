"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';

interface ScorePanelProps {
  currentScore?: number;
  potentialScore?: number;
  showPotential?: boolean;
  className?: string;
}

export function ScorePanel({
  currentScore = 580,
  potentialScore = 720,
  showPotential = true,
  className,
}: ScorePanelProps) {
  // Calculate score color based on value
  const getScoreColor = (score: number) => {
    if (score < 580) return 'text-red-500';
    if (score < 670) return 'text-yellow-500';
    if (score < 740) return 'text-blue-500';
    return 'text-green-500';
  };

  // Calculate progress bar width and color
  const getProgressWidth = (score: number) => {
    // Credit scores typically range from 300-850
    return `${Math.min(100, Math.max(0, ((score - 300) / 550) * 100))}%`;
  };

  const getProgressColor = (score: number) => {
    if (score < 580) return 'bg-red-500';
    if (score < 670) return 'bg-yellow-500';
    if (score < 740) return 'bg-blue-500';
    return 'bg-green-500';
  };

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row justify-between items-center pb-2">
        <CardTitle className="text-xl">Your Credit Score</CardTitle>
        <Badge variant="info">Simulation</Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400">Current</span>
              <span className={`font-bold text-2xl ${getScoreColor(currentScore)}`}>
                {currentScore}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <motion.div
                className={`h-2.5 rounded-full ${getProgressColor(currentScore)}`}
                style={{ width: getProgressWidth(currentScore) }}
                initial={{ width: 0 }}
                animate={{ width: getProgressWidth(currentScore) }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>

          {showPotential && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Potential</span>
                <span className={`font-bold text-2xl ${getScoreColor(potentialScore)}`}>
                  {potentialScore}+
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="relative">
                  <motion.div
                    className={`h-2.5 rounded-full ${getProgressColor(currentScore)}`}
                    style={{ width: getProgressWidth(currentScore) }}
                  />
                  <motion.div
                    className={`absolute top-0 h-2.5 rounded-full ${getProgressColor(potentialScore)} opacity-40`}
                    style={{ width: getProgressWidth(potentialScore) }}
                    initial={{ width: getProgressWidth(currentScore) }}
                    animate={{ width: getProgressWidth(potentialScore) }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                  />
                </div>
              </div>
            </div>
          )}

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
        </div>
      </CardContent>
    </Card>
  );
} 