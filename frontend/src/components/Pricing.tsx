import React from 'react';
import { motion } from 'framer-motion';

const Pricing = () => {
  const plans = [
    {
      name: 'Basic',
      price: '$29',
      period: 'per month',
      description: 'Perfect for individuals with simple credit report disputes.',
      features: [
        'Up to 5 disputes per month',
        'Basic OCR document scanning',
        'FCRA-compliant letter templates',
        'Email support',
        '30-day dispute tracking'
      ],
      cta: 'Get Started',
      highlighted: false
    },
    {
      name: 'Professional',
      price: '$79',
      period: 'per month',
      description: 'Ideal for individuals with complex credit situations.',
      features: [
        'Unlimited disputes',
        'Advanced OCR with data extraction',
        'Custom FCRA-compliant letter generation',
        'Priority email & chat support',
        '90-day dispute tracking',
        'Credit score monitoring'
      ],
      cta: 'Get Started',
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: '$199',
      period: 'per month',
      description: 'For credit repair companies and financial advisors.',
      features: [
        'Unlimited disputes',
        'Client management dashboard',
        'Advanced analytics and reporting',
        'White-label options',
        'Dedicated account manager',
        'API access',
        'Custom integrations'
      ],
      cta: 'Contact Sales',
      highlighted: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-grotesk text-white mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose the plan that fits your needs. All plans include our core dispute management features.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`rounded-lg overflow-hidden shadow-lg ${plan.highlighted ? 'ring-2 ring-primary-500' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <div className={`p-6 ${plan.highlighted ? 'bg-gray-800' : 'bg-gray-900'}`}>
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="ml-1 text-gray-400">{plan.period}</span>
                </div>
                <p className="text-gray-300 mb-6">{plan.description}</p>
                <button 
                  className={`w-full py-2 px-4 rounded-md font-medium ${
                    plan.highlighted 
                      ? 'bg-primary-600 hover:bg-primary-700 text-white' 
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
              <div className="bg-gray-800 p-6">
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <span className="text-primary-500 mr-2">✓</span>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
