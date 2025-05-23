import React from 'react';
import { motion } from 'framer-motion';

const FAQ = () => {
  const faqs = [
    {
      question: "How does the OCR technology work?",
      answer: "Our OCR technology uses advanced machine learning algorithms to scan and extract data from credit reports. It can identify account information, payment history, inquiries, and potential errors with high accuracy."
    },
    {
      question: "Is my data secure on the platform?",
      answer: "Yes, we take security seriously. All data is encrypted both in transit and at rest. We use industry-standard security protocols and regular security audits to ensure your information remains protected."
    },
    {
      question: "How long does the dispute process typically take?",
      answer: "The dispute process varies depending on the complexity and number of items being disputed. Typically, you can expect initial responses from credit bureaus within 30-45 days. Our platform helps you track and manage this timeline efficiently."
    },
    {
      question: "Can I use Project Cobra for business purposes?",
      answer: "Absolutely! Our Enterprise plan is specifically designed for credit repair companies, financial advisors, and other professionals who manage disputes for multiple clients."
    },
    {
      question: "What makes your dispute letters FCRA compliant?",
      answer: "Our Rust-based compliance engine validates all dispute communications against the latest FCRA regulations. It checks for required language, prohibited phrases, and ensures all necessary information is included in each letter."
    },
    {
      question: "Do you offer a free trial?",
      answer: "Yes, we offer a 14-day free trial on all our plans. You can test the full functionality of the platform before committing to a subscription."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-grotesk text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Find answers to common questions about our platform and services.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 rounded-lg p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <h3 className="text-xl font-bold text-white mb-3">{faq.question}</h3>
              <p className="text-gray-300">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
