import React from 'react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Project Cobra helped me remove 3 incorrect items from my credit report in just 45 days. My score jumped by 87 points!",
      author: "Sarah J.",
      role: "Small Business Owner",
      image: "👩‍💼"
    },
    {
      quote: "The compliance validation feature saved me from making critical mistakes in my dispute letters. This platform is a game-changer.",
      author: "Michael T.",
      role: "Financial Advisor",
      image: "👨‍💼"
    },
    {
      quote: "As a credit repair specialist, I've tried many tools, but Project Cobra's automation and accuracy are unmatched in the industry.",
      author: "Elena R.",
      role: "Credit Repair Specialist",
      image: "👩‍💻"
    }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-grotesk text-white mb-4">What Our Clients Say</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Thousands of users have improved their credit scores with Project Cobra.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 rounded-lg p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <div className="text-4xl mb-4">{testimonial.image}</div>
              <p className="text-gray-300 italic mb-4">"{testimonial.quote}"</p>
              <div>
                <p className="text-white font-medium">{testimonial.author}</p>
                <p className="text-gray-400 text-sm">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
