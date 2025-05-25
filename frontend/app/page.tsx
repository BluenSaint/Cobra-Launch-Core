"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HomePage() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
            Project Cobra
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            AI-powered credit repair platform that delivers results 3x faster than traditional methods
          </p>
          <p className="text-lg mb-10 text-gray-400">
            Join over 10,000+ clients who have improved their credit scores by an average of 87 points
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="/login"
                className="block w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
              >
                Start Free Trial
              </a>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="#pricing"
                className="block w-full sm:w-auto bg-transparent border border-blue-500 text-blue-400 hover:bg-blue-900/20 font-bold py-3 px-8 rounded-lg transition duration-300"
              >
                View Pricing
              </a>
            </motion.div>
          </div>
          
          {/* Trust Badges */}
          <div className="mt-12 mb-16">
            <p className="text-sm uppercase tracking-wider text-gray-500 mb-4">Trusted by industry leaders</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
              {/* Placeholder for logos - in production these would be actual images */}
              <div className="h-8 w-24 bg-gray-700 rounded-md"></div>
              <div className="h-8 w-32 bg-gray-700 rounded-md"></div>
              <div className="h-8 w-28 bg-gray-700 rounded-md"></div>
              <div className="h-8 w-20 bg-gray-700 rounded-md"></div>
              <div className="h-8 w-24 bg-gray-700 rounded-md"></div>
            </div>
          </div>
        </motion.div>

        {/* Key Features */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        >
          {[
            {
              title: "AI-Powered Dispute Engine",
              description: "Our proprietary algorithm identifies 2.4x more dispute opportunities than manual review",
              icon: "🤖"
            },
            {
              title: "Credit Score Accelerator™",
              description: "Patented technology that prioritizes actions with the highest impact on your score",
              icon: "📈"
            },
            {
              title: "Enterprise-Grade Security",
              description: "Bank-level encryption and FCRA-compliant processes protect your sensitive data",
              icon: "🔒"
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h2 className="text-xl font-bold mb-3 text-blue-300">{feature.title}</h2>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-800/50 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Project Cobra Works</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our data-driven approach delivers measurable results through a simple 3-step process
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Upload & Analyze",
                description: "Connect your credit accounts or upload reports. Our AI analyzes and identifies all potential dispute opportunities."
              },
              {
                step: "02",
                title: "Optimize & Dispute",
                description: "Our system generates customized dispute letters and prioritizes actions for maximum impact on your score."
              },
              {
                step: "03",
                title: "Track & Improve",
                description: "Monitor progress in real-time and receive AI-powered recommendations to further improve your credit profile."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-blue-500/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 border border-blue-500/30">
                  <span className="text-2xl font-bold text-blue-400">{step.step}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">{step.title}</h3>
                <p className="text-gray-400 text-center">{step.description}</p>
                
                {/* Connector line between steps */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent -z-10 transform -translate-x-1/2"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Transparent Pricing</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Choose the plan that fits your needs with no hidden fees
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Shield",
                price: "$85",
                period: "/month",
                description: "Perfect for individuals looking to address specific credit issues",
                features: [
                  "2 disputes per month",
                  "Basic credit monitoring",
                  "Email support",
                  "Mobile app access"
                ],
                cta: "Get Started",
                popular: false
              },
              {
                name: "Elite",
                price: "$150",
                period: "/month",
                description: "Comprehensive solution for active credit improvement",
                features: [
                  "Unlimited disputes",
                  "Advanced credit monitoring",
                  "1 tradeline boost",
                  "Priority email & chat support",
                  "Personalized improvement plan"
                ],
                cta: "Get Started",
                popular: true
              },
              {
                name: "Infinity",
                price: "$399",
                period: "/month",
                description: "Enterprise-grade solution for maximum results",
                features: [
                  "Unlimited disputes",
                  "Premium credit monitoring",
                  "2 tradeline boosts",
                  "24/7 dedicated support",
                  "Custom dispute strategies",
                  "Legal escalation support",
                  "Identity theft protection"
                ],
                cta: "Contact Sales",
                popular: false
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`bg-gray-800/50 backdrop-blur-sm rounded-xl border ${plan.popular ? 'border-blue-500' : 'border-gray-700'} overflow-hidden relative`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    MOST POPULAR
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-end mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-400 ml-1">{plan.period}</span>
                  </div>
                  <p className="text-gray-400 mb-6">{plan.description}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-green-400 mr-2">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <a
                      href={plan.popular ? "/login" : "#contact"}
                      className={`block w-full text-center py-3 px-6 rounded-lg font-bold transition duration-300 ${
                        plan.popular 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                          : 'bg-gray-700 hover:bg-gray-600 text-white'
                      }`}
                    >
                      {plan.cta}
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-10 text-gray-400">
            <p>All plans include a 14-day money-back guarantee. Enterprise plans available.</p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-800/50 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              See how Project Cobra has transformed our clients' financial futures
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                quote: "My credit score jumped 112 points in just 45 days. The AI-powered recommendations were spot on.",
                author: "Michael T.",
                role: "Small Business Owner",
                score: "+112 pts"
              },
              {
                quote: "After trying three other credit repair services with minimal results, Project Cobra delivered in weeks what others couldn't in months.",
                author: "Sarah L.",
                role: "Real Estate Agent",
                score: "+94 pts"
              },
              {
                quote: "The enterprise solution helped us improve credit scores for over 500 employees as part of our financial wellness program.",
                author: "David K.",
                role: "HR Director, Fortune 500 Company",
                score: "Enterprise"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-900/80 p-8 rounded-xl border border-gray-700 relative"
              >
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl">"</span>
                </div>
                <p className="text-lg mb-6 italic text-gray-300">{testimonial.quote}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold">{testimonial.author}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                  {testimonial.score !== "Enterprise" && (
                    <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-bold">
                      {testimonial.score}
                    </div>
                  )}
                  {testimonial.score === "Enterprise" && (
                    <div className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-bold">
                      Enterprise
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Integration & Partners */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Seamless Integrations</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Project Cobra connects with the tools and services you already use
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 max-w-5xl mx-auto">
            {Array(6).fill(0).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800 h-20 rounded-lg flex items-center justify-center"
              >
                <div className="w-12 h-12 bg-gray-700 rounded-md"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-900/50 to-teal-900/50 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Credit?</h2>
            <p className="text-xl text-gray-300 mb-10">
              Join thousands of satisfied clients and start your journey to better credit today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="/login"
                  className="block w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-lg transition duration-300 text-lg"
                >
                  Start Free Trial
                </a>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="#contact"
                  className="block w-full sm:w-auto bg-transparent border border-white/30 hover:bg-white/10 text-white font-bold py-4 px-10 rounded-lg transition duration-300 text-lg"
                >
                  Schedule Demo
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Trust & Security */}
      <div className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-5 h-5 bg-gray-700 rounded-full"></div>
              <span>FCRA Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-5 h-5 bg-gray-700 rounded-full"></div>
              <span>256-bit Encryption</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-5 h-5 bg-gray-700 rounded-full"></div>
              <span>SOC 2 Certified</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-5 h-5 bg-gray-700 rounded-full"></div>
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-5 h-5 bg-gray-700 rounded-full"></div>
              <span>CCPA Compliant</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Project Cobra</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Press</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Enterprise</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Partners</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Guides</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">API</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Status</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Terms</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Security</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© 2025 Project Cobra. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
