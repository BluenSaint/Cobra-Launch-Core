import React from 'react';
import { motion } from 'framer-motion';

const TrustBar = () => {
  const logos = [
    { name: 'Company 1', logo: '🏢' },
    { name: 'Company 2', logo: '🏛️' },
    { name: 'Company 3', logo: '🏙️' },
    { name: 'Company 4', logo: '🏤' },
    { name: 'Company 5', logo: '🏬' },
  ];

  return (
    <section className="py-12 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-center text-gray-400 mb-8">Trusted by industry leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {logos.map((company, index) => (
              <motion.div
                key={index}
                className="flex items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <span className="text-3xl mr-2">{company.logo}</span>
                <span className="text-gray-300 font-medium">{company.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBar;
