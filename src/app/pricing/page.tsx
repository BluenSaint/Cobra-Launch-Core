import React from 'react';
import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Pricing from '@/components/layout/Pricing';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Pricing - Project Cobra',
  description: 'Choose the credit repair plan that fits your needs. All plans include our 100% legal guarantee.',
};

export default function PricingPage() {
  return (
    <div className="min-h-screen dark antialiased">
      <Navbar />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Pricing Plans</h1>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Choose the credit repair plan that fits your needs. All plans include our AI-powered analysis and dispute system.
            </p>
          </div>
        </div>
        <Pricing />
        
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-800 p-8 rounded-xl">
                <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Is there a contract or commitment?</h3>
                    <p className="text-gray-400">
                      No. All plans are month-to-month and you can cancel anytime without penalty.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">How fast will I see results?</h3>
                    <p className="text-gray-400">
                      Most clients see initial changes within 30-45 days. Credit bureaus have up to 30 days to respond to disputes.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Do you offer a guarantee?</h3>
                    <p className="text-gray-400">
                      Yes. If we don't get at least 3 negative items removed in the first 90 days, we'll refund that month's payment.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Can I upgrade or downgrade my plan?</h3>
                    <p className="text-gray-400">
                      Yes, you can change your plan at any time. Changes take effect on your next billing cycle.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 p-8 rounded-xl">
                <h2 className="text-2xl font-bold mb-4">Compare Credit Services</h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-3 px-2">Feature</th>
                        <th className="py-3 px-2">Project Cobra</th>
                        <th className="py-3 px-2">Traditional Services</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-700">
                        <td className="py-3 px-2 text-gray-300">AI-Powered Analysis</td>
                        <td className="py-3 px-2 text-center text-green-500">✓</td>
                        <td className="py-3 px-2 text-center text-red-500">✗</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-3 px-2 text-gray-300">Real-time Updates</td>
                        <td className="py-3 px-2 text-center text-green-500">✓</td>
                        <td className="py-3 px-2 text-center text-red-500">✗</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-3 px-2 text-gray-300">CFPB Escalation</td>
                        <td className="py-3 px-2 text-center text-green-500">✓</td>
                        <td className="py-3 px-2 text-center text-gray-500">Sometimes</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-3 px-2 text-gray-300">Cancel Anytime</td>
                        <td className="py-3 px-2 text-center text-green-500">✓</td>
                        <td className="py-3 px-2 text-center text-red-500">✗</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-3 px-2 text-gray-300">Dispute Letters</td>
                        <td className="py-3 px-2 text-center text-green-500">Unlimited</td>
                        <td className="py-3 px-2 text-center text-gray-500">Limited</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-2 text-gray-300">Business Credit Building</td>
                        <td className="py-3 px-2 text-center text-green-500">✓</td>
                        <td className="py-3 px-2 text-center text-red-500">✗</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 