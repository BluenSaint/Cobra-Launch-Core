import React from 'react';
import { motion } from 'framer-motion';

const FAQ = () => {
  const faqs = [
    {
      question: "How does Project Cobra's OCR technology work?",
      answer: "Our multi-engine OCR technology combines AWS Textract, Google Vision, and OpenCV to extract data from credit reports with over 99% accuracy. The system automatically identifies account information, balances, payment history, and other relevant details, eliminating manual data entry and reducing human error."
    },
    {
      question: "Is Project Cobra compliant with FCRA regulations?",
      answer: "Yes, Project Cobra is fully FCRA-compliant. Our proprietary Rust-powered compliance engine validates all dispute letters against the latest FCRA regulations to ensure they meet legal requirements. This helps maximize the effectiveness of disputes while maintaining full regulatory compliance."
    },
    {
      question: "Can I white-label Project Cobra for my credit repair business?",
      answer: "Yes, our Infinity plan includes white-labeling capabilities. You can customize the client portal with your branding, logo, and colors to provide a seamless experience for your clients. This allows you to offer a professional, branded solution while leveraging our powerful technology."
    },
    {
      question: "How does billing work? Are there any long-term contracts?",
      answer: "Project Cobra offers simple, transparent monthly billing with no long-term contracts. You can upgrade, downgrade, or cancel your subscription at any time. We offer three plans: Shield ($85/month), Elite ($150/month), and Infinity ($399/month), each designed for different business needs and volumes."
    },
    {
      question: "What kind of support do you offer?",
      answer: "All plans include email support. The Elite plan adds priority email and chat support, while the Infinity plan includes a dedicated account manager. Our support team consists of credit repair experts who can assist with both technical issues and strategic advice for complex disputes."
    },
    {
      question: "How does the automated follow-up system work?",
      answer: "Our automated follow-up system tracks the status of each dispute and automatically generates follow-up letters if credit bureaus fail to respond within the legally required 30-day timeframe. This ensures that bureaus comply with their obligations under the FCRA and helps maintain pressure on unresponsive creditors."
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
    <section id="faq" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Find answers to common questions about Project Cobra and how it can help your credit repair business.
            </p>
          </motion.div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {faqs.map((faq, index) => (
            <motion.div 
              key={index} 
              className="bg-gray-800 rounded-xl p-8 border border-gray-700"
              variants={itemVariants}
            >
              <h3 className="text-xl font-bold text-white mb-4">{faq.question}</h3>
              <p className="text-gray-400">{faq.answer}</p>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-gray-400 mb-6">
            Still have questions? Our team is here to help.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
          >
            Contact Support
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
