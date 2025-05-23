import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <motion.section 
      className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-grotesk font-bold mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Streamline Credit Report Disputes
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          Automate your dispute process with AI-powered compliance validation and real-time tracking.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          <a href="/signup" className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-8 rounded-lg inline-block mr-4 transition-all">
            Get Started
          </a>
          <a href="#features" className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-8 rounded-lg inline-block transition-all">
            Learn More
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
