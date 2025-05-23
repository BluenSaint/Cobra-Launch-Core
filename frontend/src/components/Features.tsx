import React from 'react';
import { motion } from 'framer-motion';

const Features = () => {
  const features = [
    {
      title: 'AI-Powered OCR',
      description: 'Automatically extract and analyze credit report data with advanced OCR technology.',
      icon: '🔍'
    },
    {
      title: 'FCRA Compliance',
      description: 'Ensure all dispute communications adhere to FCRA regulations with our compliance engine.',
      icon: '📋'
    },
    {
      title: 'Real-time Tracking',
      description: 'Monitor the status of your disputes in real-time with comprehensive analytics.',
      icon: '📊'
    },
    {
      title: 'Secure Document Storage',
      description: 'Store all your credit reports and dispute documents in our secure, encrypted platform.',
      icon: '🔒'
    },
    {
      title: 'Automated Follow-ups',
      description: 'Schedule and send automated follow-ups to credit bureaus and creditors.',
      icon: '⏱️'
    },
    {
      title: 'Comprehensive Reporting',
      description: 'Generate detailed reports on dispute progress and credit score improvements.',
      icon: '📈'
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-grotesk text-white mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our platform combines cutting-edge technology with regulatory expertise to streamline your credit dispute process.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 rounded-lg p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
