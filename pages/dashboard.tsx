import React from "react";
import { getSession } from "next-auth/react";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard. Your credit disputes are displayed below.</p>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Active Disputes</h3>
          <p className="stat-number">3</p>
        </div>
        <div className="stat-card">
          <h3>Resolved Items</h3>
          <p className="stat-number">2</p>
        </div>
        <div className="stat-card">
          <h3>Credit Score</h3>
          <p className="stat-number">612</p>
        </div>
      </div>

      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <ul>
          <li>Dispute filed with Experian - May 20, 2025</li>
          <li>Credit score updated - May 18, 2025</li>
          <li>New document uploaded - May 15, 2025</li>
        </ul>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default Dashboard;
