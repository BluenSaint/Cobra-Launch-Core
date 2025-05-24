import React, { useState } from "react";
import { motion } from "framer-motion";

interface Dispute {
  title: string;
  [key: string]: any; // Allow for additional properties
}

interface EscalationControlsProps {
  dispute: Dispute;
}

const EscalationControls = ({ dispute }: EscalationControlsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState("");

  const handleAction = (actionType: string) => {
    setAction(actionType);
    setIsModalOpen(true);
  };

  const confirmAction = () => {
    console.log(`Action confirmed: ${action} for dispute ${dispute.title}`);
    setIsModalOpen(false);
  };

  return (
    <div className="escalation-controls">
      <button onClick={() => handleAction("send-followup")}>Send Follow-Up Letter</button>
      <button onClick={() => handleAction("escalate-cfpb")}>Escalate to CFPB</button>
      <button onClick={() => handleAction("mark-resolved")}>Mark as Resolved</button>

      {isModalOpen && (
        <motion.div
          className="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <p>Are you sure you want to {action}?</p>
          <button onClick={confirmAction}>Confirm</button>
          <button onClick={() => setIsModalOpen(false)}>Cancel</button>
        </motion.div>
      )}
    </div>
  );
};

export default EscalationControls;
