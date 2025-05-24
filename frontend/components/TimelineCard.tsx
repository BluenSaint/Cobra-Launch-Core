import React from "react";
import { generateLetter } from "../lib/letter-generator";
import { getRecommendedAction } from "../lib/ai-commander";

interface Dispute {
  title: string;
  status: string;
  sentDate: string | Date;
  creditor: string;
  violationType: string;
  [key: string]: unknown; // Allow for additional properties
}

interface TimelineCardProps {
  dispute: Dispute;
}

const TimelineCard = ({ dispute }: TimelineCardProps) => {
  const handleGenerateLetter = () => {
    const letter = generateLetter(dispute);
    // Open modal with letter preview
    console.log("Generated Letter:", letter);
  };

  const action = getRecommendedAction(dispute);

  return (
    <div className="timeline-card">
      <h3>{dispute.title}</h3>
      <p>Status: {dispute.status}</p>
      {["NO RESPONSE", "READY TO ESCALATE"].includes(dispute.status) && (
        <button onClick={handleGenerateLetter}>Generate Letter</button>
      )}
      <span className={`ai-status-tag ${action.action}`}>AI: {action.reason}</span>
    </div>
  );
};

export default TimelineCard;
