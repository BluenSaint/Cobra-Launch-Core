import React from 'react';
import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScorePanel from '@/components/dashboard/ScorePanel';
import UploadFlow from '@/components/dashboard/UploadFlow';

export const metadata: Metadata = {
  title: 'Dashboard - Project Cobra',
  description: 'Monitor your credit score, upload reports, and track dispute progress.',
};

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-8">Your Dashboard</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <ScorePanel />
            </div>
            
            <div className="lg:col-span-2">
              <UploadFlow />
            </div>
          </div>
          
          {/* Activity Feed */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="text-center py-8 text-gray-400">
                No recent activity yet. Upload your first credit report to get started.
              </div>
            </div>
          </div>
          
          {/* Dispute Progress */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Dispute Progress</h2>
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="text-center py-8 text-gray-400">
                You haven't started any disputes yet. We'll track your progress here.
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 