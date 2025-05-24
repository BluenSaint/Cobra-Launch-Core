import React from "react";
import EscalationControls from "./EscalationControls";

const AdminTimeline = ({ disputes }) => {
  return (
    <div className="admin-timeline">
      {disputes.map((dispute, index) => (
        <div key={index} className="timeline-card">
          <h3>{dispute.title}</h3>
          <p>Status: {dispute.status}</p>
          <EscalationControls dispute={dispute} />
        </div>
      ))}
    </div>
  );
};

export default AdminTimeline;
