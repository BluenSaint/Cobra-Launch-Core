'use client';

import React from 'react';

export default function TrustBar() {
  return (
    <section className="bg-gray-800 py-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-8 mb-4 md:mb-0">
            <div className="flex items-center">
              <div className="bg-blue-500 rounded-full p-1 mr-2">
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm font-medium">FCRA Compliant</span>
            </div>
            <div className="flex items-center">
              <div className="bg-green-500 rounded-full p-1 mr-2">
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span className="text-sm font-medium">Bank-Level Encryption</span>
            </div>
            <div className="flex items-center">
              <div className="bg-purple-500 rounded-full p-1 mr-2">
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-sm font-medium">CROA Certified</span>
            </div>
          </div>
          <div className="relative w-full md:w-auto overflow-hidden">
            <div className="trust-tag whitespace-nowrap text-sm text-gray-400">
              <span className="mx-8">As seen in Fintech Today</span>
              <span className="mx-8">Audited by James Legal Firm LLC</span>
              <span className="mx-8">Featured on CreditTech Podcast</span>
              <span className="mx-8">Trusted by 10,000+ clients</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 