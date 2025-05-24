import React, { useState } from "react";
import { toast } from "react-toastify";

const Dashboard = ({ user }) => {
  const [isFreezeModalOpen, setIsFreezeModalOpen] = useState(false);

  const handleRequestUpdate = () => {
    toast("Update requested!");
  };

  const handleFreezeAccount = () => {
    setIsFreezeModalOpen(true);
  };

  const closeModal = () => {
    setIsFreezeModalOpen(false);
  };

  return (
    <div className="dashboard">
      <h1>Welcome, {user.firstName}!</h1>
      <button onClick={handleRequestUpdate}>Request Update</button>
      <div className="score-trends">
        <h2>Score Trends</h2>
        <p>Placeholder for score trends</p>
      </div>
      <div className="active-disputes">
        <h2>Active Disputes</h2>
        <p>Placeholder for active disputes</p>
      </div>
      <div className="alerts">
        <h2>Alerts</h2>
        <p>Placeholder for alerts</p>
      </div>
      <button className="cta-freeze-account" onClick={handleFreezeAccount}>
        Freeze Account
      </button>

      {isFreezeModalOpen && (
        <div className="modal">
          <h2>Account freeze requested.</h2>
          <button onClick={closeModal}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
