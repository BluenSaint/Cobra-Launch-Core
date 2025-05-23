import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const TrustBar = () => {
  const partners = [
    { name: 'Experian', logo: '/images/experian-logo.svg' },
    { name: 'TransUnion', logo: '/images/transunion-logo.svg' },
    { name: 'Equifax', logo: '/images/equifax-logo.svg' },
    { name: 'CFPB', logo: '/images/cfpb-logo.svg' },
    { name: 'FCRA', logo: '/images/fcra-logo.svg' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="bg-gray-900 py-12 border-t border-b border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h3 className="text-gray-400 text-lg font-medium">Trusted by credit repair professionals nationwide</h3>
        </div>
        
        <motion.div 
          className="flex flex-wrap justify-center items-center gap-8 md:gap-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Placeholder for partner logos */}
          {partners.map((partner, index) => (
            <motion.div 
              key={index}
              className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition duration-300"
              variants={itemVariants}
            >
              <div className="h-12 flex items-center justify-center">
                {/* Fallback to text if image is not available */}
                <span className="text-gray-400 text-xl font-semibold">{partner.name}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-12 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gray-800 rounded-full">
            <div className="flex -space-x-1 mr-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-gray-800 bg-blue-600 flex items-center justify-center">
                  <span className="sr-only">User avatar</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-300">
              <span className="font-bold">10,000+</span> users improving their credit scores
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
