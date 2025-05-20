import React from 'react';
import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import UploadFlow from '@/components/dashboard/UploadFlow';

export const metadata: Metadata = {
  title: 'Upload Credit Report - Project Cobra',
  description: 'Upload your credit report for AI analysis and dispute recommendations.',
};

export default function UploadPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-4">Upload Credit Report</h1>
          <p className="text-lg text-gray-400 mb-8 max-w-3xl">
            Upload your credit report for our AI to analyze and identify potential errors and FCRA violations.
          </p>
          
          <div className="max-w-3xl">
            <UploadFlow />
          </div>
          
          <div className="mt-12 bg-gray-800 rounded-xl p-6 max-w-3xl">
            <h2 className="text-xl font-bold mb-4">How to Get Your Credit Report</h2>
            <p className="text-gray-400 mb-4">
              You're entitled to one free credit report every 12 months from each of the three major consumer reporting agencies.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-600/20 p-2 rounded-lg mr-3 mt-1">
                  <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium mb-1">AnnualCreditReport.com</h3>
                  <p className="text-sm text-gray-400">
                    The official site to get your free annual credit reports from all three bureaus. Visit <a href="https://www.annualcreditreport.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">AnnualCreditReport.com</a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-600/20 p-2 rounded-lg mr-3 mt-1">
                  <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Credit Karma</h3>
                  <p className="text-sm text-gray-400">
                    Offers free credit monitoring and report from TransUnion and Equifax. Visit <a href="https://www.creditkarma.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">CreditKarma.com</a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-600/20 p-2 rounded-lg mr-3 mt-1">
                  <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Experian</h3>
                  <p className="text-sm text-gray-400">
                    Offers a free credit report directly from Experian. Visit <a href="https://www.experian.com/freecreditreport" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Experian.com</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 