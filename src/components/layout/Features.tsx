'use client';

import React from 'react';

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Powerful Credit Repair Features</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Everything you need to dispute inaccuracies and maximize your credit score.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="feature-card bg-gray-800 p-6 rounded-xl transition duration-300 ease-in-out">
            <div className="bg-blue-600/20 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Credit MRI</h3>
            <p className="text-gray-400">
              Deep analysis of your credit report to identify all potential issues affecting your score.
            </p>
          </div>
          
          {/* Feature 2 */}
          <div className="feature-card bg-gray-800 p-6 rounded-xl transition duration-300 ease-in-out">
            <div className="bg-purple-600/20 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Letter Generator</h3>
            <p className="text-gray-400">
              Automatically creates legally-optimized dispute letters tailored to each credit issue.
            </p>
          </div>
          
          {/* Feature 3 */}
          <div className="feature-card bg-gray-800 p-6 rounded-xl transition duration-300 ease-in-out">
            <div className="bg-red-600/20 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Escalation Engine</h3>
            <p className="text-gray-400">
              Automatically files complaints with CFPB and state AGs when bureaus violate FCRA rules.
            </p>
          </div>
          
          {/* Feature 4 */}
          <div className="feature-card bg-gray-800 p-6 rounded-xl transition duration-300 ease-in-out">
            <div className="bg-green-600/20 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Secure Vault</h3>
            <p className="text-gray-400">
              Military-grade encryption for all your documents and personal information.
            </p>
          </div>
          
          {/* Feature 5 */}
          <div className="feature-card bg-gray-800 p-6 rounded-xl transition duration-300 ease-in-out">
            <div className="bg-yellow-600/20 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Score Simulator</h3>
            <p className="text-gray-400">
              Predict how different actions will impact your score before making changes.
            </p>
          </div>
          
          {/* Feature 6 */}
          <div className="feature-card bg-gray-800 p-6 rounded-xl transition duration-300 ease-in-out">
            <div className="bg-indigo-600/20 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Client Dashboard</h3>
            <p className="text-gray-400">
              Real-time tracking of all disputes, responses, and score changes in one place.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 