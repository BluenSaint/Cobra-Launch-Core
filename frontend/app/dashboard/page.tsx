"use client";

import React from "react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 min-h-screen p-4">
          <div className="mb-8">
            <h1 className="text-xl font-bold">Cobra Launch</h1>
            <p className="text-sm text-gray-400">Credit Repair Dashboard</p>
          </div>

          <nav className="space-y-2">
            {[
              { name: "Dashboard", icon: "📊" },
              { name: "Credit Reports", icon: "📝" },
              { name: "Disputes", icon: "⚠️" },
              { name: "Letters", icon: "✉️" },
              { name: "Education", icon: "📚" },
              { name: "Settings", icon: "⚙️" },
            ].map((item, index) => (
              <a
                key={index}
                href="#"
                className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md transition duration-200"
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </a>
            ))}
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-6">Welcome back, User</h1>

            {/* Credit score card */}
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Your Credit Score</h2>
              <div className="flex items-center">
                <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-2xl font-bold">
                  680
                </div>
                <div className="ml-6">
                  <p className="text-green-400">↑ 15 points this month</p>
                  <p className="text-gray-400 mt-1">Last updated: May 20, 2025</p>
                </div>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { title: "Active Disputes", value: "3", color: "bg-yellow-600" },
                { title: "Resolved Items", value: "7", color: "bg-green-600" },
                { title: "Pending Reviews", value: "2", color: "bg-purple-600" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className={`${stat.color} rounded-lg p-6`}
                >
                  <h3 className="text-lg font-medium mb-2">{stat.title}</h3>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Recent activity */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {[
                  { action: "Dispute filed", account: "Capital One", date: "May 22, 2025" },
                  { action: "Letter sent", account: "Experian", date: "May 18, 2025" },
                  { action: "Account updated", account: "TransUnion", date: "May 15, 2025" },
                  { action: "Item removed", account: "Equifax", date: "May 10, 2025" },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-b border-gray-700 pb-3"
                  >
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-400">{activity.account}</p>
                    </div>
                    <span className="text-sm text-gray-400">{activity.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
