import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <motion.div 
      className="min-h-screen bg-gray-950"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Dashboard Header */}
      <header className="bg-gray-900 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-grotesk font-bold text-white">Project Cobra</h1>
            <nav className="ml-10 flex space-x-8">
              <Link href="/dashboard" className="text-white font-medium">Dashboard</Link>
              <Link href="/dashboard/disputes" className="text-gray-300 hover:text-white">Disputes</Link>
              <Link href="/dashboard/reports" className="text-gray-300 hover:text-white">Reports</Link>
              <Link href="/dashboard/settings" className="text-gray-300 hover:text-white">Settings</Link>
            </nav>
          </div>
          <div>
            <button className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-white">
              <span className="sr-only">View notifications</span>
              {/* Notification icon would go here */}
            </button>
            <button className="ml-3 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white">
              <span className="sr-only">User menu</span>
              <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
                U
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-2xl font-grotesk font-bold text-white mb-6">Dashboard</h2>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-medium text-gray-300 mb-2">Active Disputes</h3>
              <p className="text-3xl font-bold text-white">0</p>
            </div>
            <div className="bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-medium text-gray-300 mb-2">Resolved Disputes</h3>
              <p className="text-3xl font-bold text-white">0</p>
            </div>
            <div className="bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-medium text-gray-300 mb-2">Success Rate</h3>
              <p className="text-3xl font-bold text-white">0%</p>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h3 className="text-lg font-medium text-white mb-4">Recent Activity</h3>
            <div className="text-center py-8">
              <p className="text-gray-400">No recent activity to display.</p>
              <button className="mt-4 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded">
                Create New Dispute
              </button>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-medium text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded flex items-center">
                <span className="mr-2">+</span> Upload Credit Report
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded flex items-center">
                <span className="mr-2">+</span> Create Dispute Letter
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded flex items-center">
                <span className="mr-2">+</span> Schedule Follow-up
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded flex items-center">
                <span className="mr-2">+</span> View Analytics
              </button>
            </div>
          </div>
        </motion.div>
      </main>
    </motion.div>
  );
}
