import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 border-b border-gray-800 py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src="/images/bluecrest-logo.png" 
              alt="BlueCrest Financial Consultant" 
              width={150} 
              height={50} 
              className="h-10 w-auto"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-300 hover:text-white transition duration-300">
              Features
            </Link>
            <Link href="#how-it-works" className="text-gray-300 hover:text-white transition duration-300">
              How It Works
            </Link>
            <Link href="#pricing" className="text-gray-300 hover:text-white transition duration-300">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-gray-300 hover:text-white transition duration-300">
              Testimonials
            </Link>
            <Link href="#faq" className="text-gray-300 hover:text-white transition duration-300">
              FAQ
            </Link>
          </div>
          
          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link href="/login" className="hidden sm:inline-block text-gray-300 hover:text-white transition duration-300">
              Log In
            </Link>
            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition duration-300"
              >
                Get Started
              </motion.button>
            </Link>
            
            {/* Mobile Menu Button */}
            <button className="md:hidden text-gray-300 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
