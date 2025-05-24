import React from "react";
import EscalationControls from "./EscalationControls";

interface Dispute {
  title: string;
  status: string;
  [key: string]: any; // Allow for additional properties
}

interface AdminTimelineProps {
  disputes: Dispute[];
}

const AdminTimeline = ({ disputes }: AdminTimelineProps) => {
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
