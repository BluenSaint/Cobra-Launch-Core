import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Project Cobra has completely transformed our credit repair business. We've increased our dispute volume by 300% while maintaining the same staff size.",
      author: "Michael Johnson",
      title: "CEO, Credit Restoration Experts",
      avatar: "/images/testimonial-1.jpg"
    },
    {
      quote: "The multi-engine OCR technology is incredible. It extracts data from credit reports with near-perfect accuracy, saving us countless hours of manual work.",
      author: "Sarah Williams",
      title: "Operations Manager, FixMy Credit",
      avatar: "/images/testimonial-2.jpg"
    },
    {
      quote: "Our success rate has increased from 62% to 87% since implementing Project Cobra. The AI-powered dispute suggestions are a game-changer.",
      author: "David Chen",
      title: "Founder, CreditLift Solutions",
      avatar: "/images/testimonial-3.jpg"
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
    <section id="testimonials" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Hear from credit repair professionals who have transformed their businesses with Project Cobra.
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
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index} 
              className="bg-gray-900 rounded-xl p-8 border border-gray-700 relative"
              variants={itemVariants}
            >
              {/* Quote icon */}
              <div className="absolute -top-5 -left-5 bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              
              {/* Testimonial content */}
              <div className="mb-6">
                <p className="text-gray-300 italic">"{testimonial.quote}"</p>
              </div>
              
              {/* Author info */}
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden mr-4 flex items-center justify-center text-gray-500 font-bold">
                  {testimonial.avatar ? (
                    <Image 
                      src={testimonial.avatar} 
                      alt={testimonial.author} 
                      width={48} 
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    testimonial.author.charAt(0)
                  )}
                </div>
                <div>
                  <h4 className="text-white font-bold">{testimonial.author}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Stats section */}
        <motion.div 
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-gray-900 rounded-xl p-8 border border-gray-700">
            <div className="text-4xl font-bold text-blue-500 mb-2">87%</div>
            <p className="text-gray-300">Average dispute success rate</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-8 border border-gray-700">
            <div className="text-4xl font-bold text-blue-500 mb-2">3.2M+</div>
            <p className="text-gray-300">Disputes processed</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-8 border border-gray-700">
            <div className="text-4xl font-bold text-blue-500 mb-2">72%</div>
            <p className="text-gray-300">Reduction in processing time</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
