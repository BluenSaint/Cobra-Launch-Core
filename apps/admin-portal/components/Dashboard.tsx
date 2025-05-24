import React from "react";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Credit Score</h3>
          <p className="stat-value">720</p>
          <p className="stat-change positive">+15 since last month</p>
        </div>
        <div className="stat-card">
          <h3>Active Disputes</h3>
          <p className="stat-value">3</p>
          <p className="stat-status">In Progress</p>
        </div>
        <div className="stat-card">
          <h3>Documents</h3>
          <p className="stat-value">7</p>
          <p className="stat-status">All Verified</p>
        </div>
      </div>
    </div>
  );
}
