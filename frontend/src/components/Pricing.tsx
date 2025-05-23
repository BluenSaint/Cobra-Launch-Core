import React from 'react';
import { motion } from 'framer-motion';

const Pricing = () => {
  const plans = [
    {
      name: 'Shield',
      price: '$85',
      period: 'per month',
      description: 'Perfect for individuals starting their credit repair journey',
      features: [
        'Up to 5 disputes per month',
        'Basic OCR credit report scanning',
        'FCRA-compliant dispute letters',
        'Email support',
        'Basic dispute tracking',
        'Monthly credit score updates'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Elite',
      price: '$150',
      period: 'per month',
      description: 'Ideal for serious credit repair professionals',
      features: [
        'Up to 15 disputes per month',
        'Advanced multi-engine OCR',
        'AI-powered dispute reason suggestions',
        'Priority email & chat support',
        'Advanced analytics dashboard',
        'Automated follow-ups',
        'Weekly credit score updates'
      ],
      cta: 'Get Started',
      popular: true
    },
    {
      name: 'Infinity',
      price: '$399',
      period: 'per month',
      description: 'For credit repair businesses with multiple clients',
      features: [
        'Unlimited disputes',
        'Enterprise-grade OCR with 99.8% accuracy',
        'White-labeled client portal',
        'Dedicated account manager',
        'CFPB & AG complaint automation',
        'Advanced escalation strategies',
        'Daily credit score updates',
        'Multi-user access'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    <section id="pricing" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Choose the plan that fits your needs. No hidden fees, no long-term contracts.
            </p>
          </motion.div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {plans.map((plan, index) => (
            <motion.div 
              key={index} 
              className={`relative rounded-xl overflow-hidden ${plan.popular ? 'border-2 border-blue-500' : 'border border-gray-700'}`}
              variants={itemVariants}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 text-sm font-bold">
                  Most Popular
                </div>
              )}
              
              <div className={`p-8 ${plan.popular ? 'bg-gray-800' : 'bg-gray-800/50'}`}>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 ml-2">{plan.period}</span>
                </div>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 px-6 rounded-lg font-bold transition duration-300 ${
                    plan.popular 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                >
                  {plan.cta}
                </motion.button>
              </div>
              
              <div className="p-8 bg-gray-900">
                <h4 className="text-lg font-semibold text-white mb-4">What's included:</h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 bg-gray-800 rounded-xl p-8 border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Need a custom solution?</h3>
              <p className="text-gray-400">
                Contact our sales team to discuss a tailored plan for your specific requirements.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 md:mt-0 bg-transparent hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg border border-gray-600 transition duration-300"
            >
              Contact Sales
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
