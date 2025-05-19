"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CTA() {
  return (
    <div className="bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-r from-blue-800 to-blue-600 rounded-xl p-8 md:p-12 overflow-hidden shadow-xl">
          {/* Animated dots background */}
          <div className="absolute inset-0" aria-hidden="true">
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full opacity-10"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
          
          <div className="relative z-10">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Start Your Credit Recovery Journey Today
              </h2>
              <p className="text-lg text-blue-100 mb-8 max-w-3xl mx-auto">
                Join thousands of clients who have successfully improved their credit scores and financial health. Our AI-powered platform is ready to help you.
              </p>
              <div className="flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/signup"
                    className="inline-block bg-white text-blue-700 font-medium py-3 px-8 rounded-lg text-lg shadow-lg hover:bg-blue-50 transition duration-300"
                  >
                    Get Your Free Credit Analysis
                  </Link>
                </motion.div>
              </div>
              <p className="text-blue-200 text-sm mt-4">
                No credit card required. 3-day free trial.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 