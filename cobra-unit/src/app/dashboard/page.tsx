import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Dashboard | CrestPad',
  description: 'Your credit repair dashboard',
};

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <main className="bg-gray-900 min-h-[calc(100vh-64px)]">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">Dashboard</h1>
              <p className="text-gray-400">Welcome to your credit repair journey</p>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                type="button"
                className="btn-primary"
              >
                Start New Analysis
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800 rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-medium text-white mb-4">Credit Score</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Current:</span>
                <span className="font-bold text-yellow-500">580</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5 mb-6">
                <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '58%' }}></div>
              </div>
              <p className="text-sm text-gray-400">Last update: 2 days ago</p>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-medium text-white mb-4">Disputes</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">In Progress:</span>
                  <span className="font-medium text-blue-400">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Resolved:</span>
                  <span className="font-medium text-green-500">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Escalated:</span>
                  <span className="font-medium text-red-500">1</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-medium text-white mb-4">Activity</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-white">Dispute letter sent to Experian</p>
                    <p className="text-xs text-gray-400">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-white">Credit report analyzed</p>
                    <p className="text-xs text-gray-400">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5"></div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-white">New account created</p>
                    <p className="text-xs text-gray-400">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 shadow-md mb-8">
            <h3 className="text-lg font-medium text-white mb-4">Next Steps</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  id="step-1"
                  name="step-1"
                  type="checkbox"
                  className="h-4 w-4 bg-gray-700 border-gray-600 rounded"
                />
                <label htmlFor="step-1" className="ml-3 text-gray-300">
                  Upload your credit reports from all three bureaus
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="step-2"
                  name="step-2"
                  type="checkbox"
                  className="h-4 w-4 bg-gray-700 border-gray-600 rounded"
                />
                <label htmlFor="step-2" className="ml-3 text-gray-300">
                  Review AI-generated dispute letters
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="step-3"
                  name="step-3"
                  type="checkbox"
                  className="h-4 w-4 bg-gray-700 border-gray-600 rounded"
                />
                <label htmlFor="step-3" className="ml-3 text-gray-300">
                  Schedule a consultation with a credit advisor
                </label>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 