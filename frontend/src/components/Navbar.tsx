import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav 
      className="bg-gray-900 py-4 px-4 md:px-6 lg:px-8"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-white font-grotesk font-bold text-xl">
            Project Cobra
          </Link>
          <div className="hidden md:flex ml-10 space-x-8">
            <Link href="#features" className="text-gray-300 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">
              How It Works
            </Link>
            <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="#faq" className="text-gray-300 hover:text-white transition-colors">
              FAQ
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
            Login
          </Link>
          <Link 
            href="/signup" 
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Sign Up
          </Link>
          <button className="md:hidden text-gray-300 hover:text-white">
            <span className="sr-only">Open menu</span>
            {/* Menu icon would go here */}
            ☰
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
