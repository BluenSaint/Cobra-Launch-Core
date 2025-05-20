'use client';

import React from 'react';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How Project Cobra Works</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Our AI-powered system makes credit repair simple, fast, and legally compliant.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition duration-300 ease-in-out">
            <div className="flex items-center mb-4">
              <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4">1</div>
              <h3 className="text-xl font-medium">Upload Your Credit Report</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Securely upload your credit report from any bureau or connect directly with Credit Karma or Experian.
            </p>
            <div className="flex justify-center">
              <div className="bg-gray-700 p-3 rounded-lg">
                <svg className="h-10 w-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition duration-300 ease-in-out">
            <div className="flex items-center mb-4">
              <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4">2</div>
              <h3 className="text-xl font-medium">AI Scans for Violations</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Our proprietary AI analyzes your report for inaccuracies, outdated information, and FCRA violations.
            </p>
            <div className="flex justify-center">
              <div className="bg-gray-700 p-3 rounded-lg">
                <svg className="h-10 w-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition duration-300 ease-in-out">
            <div className="flex items-center mb-4">
              <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4">3</div>
              <h3 className="text-xl font-medium">Review & Approve Letters</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Our system generates legally-optimized dispute letters for your review before submission.
            </p>
            <div className="flex justify-center">
              <div className="bg-gray-700 p-3 rounded-lg">
                <svg className="h-10 w-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Step 4 */}
          <div className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition duration-300 ease-in-out">
            <div className="flex items-center mb-4">
              <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4">4</div>
              <h3 className="text-xl font-medium">Send Online or Mail</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Submit disputes electronically or print certified mail-ready letters with tracking.
            </p>
            <div className="flex justify-center">
              <div className="bg-gray-700 p-3 rounded-lg">
                <svg className="h-10 w-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Step 5 */}
          <div className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition duration-300 ease-in-out">
            <div className="flex items-center mb-4">
              <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4">5</div>
              <h3 className="text-xl font-medium">Track Weekly Updates</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Monitor dispute progress with real-time updates and bureau response tracking.
            </p>
            <div className="flex justify-center">
              <div className="bg-gray-700 p-3 rounded-lg">
                <svg className="h-10 w-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Step 6 */}
          <div className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition duration-300 ease-in-out">
            <div className="flex items-center mb-4">
              <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4">6</div>
              <h3 className="text-xl font-medium">Auto-Escalate to CFPB/AG</h3>
            </div>
            <p className="text-gray-400 mb-4">
              If bureaus don&apos;t respond properly, we automatically escalate to regulators for resolution.
            </p>
            <div className="flex justify-center">
              <div className="bg-gray-700 p-3 rounded-lg">
                <svg className="h-10 w-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 