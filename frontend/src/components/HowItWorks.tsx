import React from 'react';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Upload Your Credit Report',
      description: 'Upload your credit report from any of the three major bureaus. Our OCR technology will automatically extract and analyze the data.',
    },
    {
      number: '02',
      title: 'Identify Disputes',
      description: 'Our system will highlight potential errors and inaccuracies in your credit report that can be disputed.',
    },
    {
      number: '03',
      title: 'Generate Compliant Letters',
      description: 'Create FCRA-compliant dispute letters with our AI-powered system that ensures all communications meet regulatory requirements.',
    },
    {
      number: '04',
      title: 'Track Progress',
      description: 'Monitor the status of your disputes in real-time and receive notifications when updates are available.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-grotesk text-white mb-4">How It Works</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our streamlined process makes credit report disputes simple and effective.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <div className="bg-gray-800 rounded-lg p-6 shadow-lg h-full">
                <div className="text-primary-500 text-4xl font-bold mb-4">{step.number}</div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 text-gray-600 text-2xl">
                  →
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
