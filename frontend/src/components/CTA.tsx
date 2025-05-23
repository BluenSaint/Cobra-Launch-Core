import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            {/* Background elements */}
            <div className="absolute inset-0 z-0 opacity-20">
              <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600 rounded-full filter blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-600 rounded-full filter blur-3xl"></div>
            </div>
            
            <div className="relative z-10 p-12 md:p-16 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Transform Your Credit Repair Process?
              </h2>
              <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
                Join thousands of credit repair professionals who are saving time, increasing success rates, and growing their businesses with Project Cobra.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/signup" className="inline-block">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white hover:bg-gray-100 text-blue-900 font-bold rounded-lg shadow-lg transition duration-300"
                  >
                    Start Free Trial
                  </motion.button>
                </Link>
                
                <Link href="#pricing" className="inline-block">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-transparent hover:bg-blue-800/30 text-white font-bold rounded-lg border-2 border-white/30 transition duration-300"
                  >
                    View Pricing
                  </motion.button>
                </Link>
              </div>
              
              <p className="mt-6 text-blue-200 text-sm">
                No credit card required. 14-day free trial.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
