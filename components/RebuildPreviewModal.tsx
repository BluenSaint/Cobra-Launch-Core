import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { autoRebuildDisputes } from "../lib/rebuilder";
import { mockReportNew, mockReportOld } from "../lib/mocks/mock-report";

const RebuildPreviewModal = () => {
  const [actions, setActions] = useState([]);

  const handleGenerateActions = () => {
    const generatedActions = autoRebuildDisputes(mockReportOld, mockReportNew);
    setActions(generatedActions);
  };

  const handleDeployAction = (action) => {
    console.log("Action deployed:", action);
    toast.success("Action deployed to timeline");
  };

  return (
    <motion.div
      className="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="modal-content">
        <h2>Recommended Actions</h2>
        <button onClick={handleGenerateActions}>Generate Actions</button>
        <ul>
          {actions.map((action, index) => (
            <li key={index}>
              <strong>Creditor:</strong> {action.creditor}
              <br />
              <strong>Action Type:</strong> {action.type}
              <br />
              <strong>Reason:</strong> {action.message}
              <br />
              <button onClick={() => handleDeployAction(action)}>
                Deploy Action
              </button>
            </li>
          ))}
        </ul>
        <button onClick={() => console.log("Modal closed")}>Close</button>
      </div>
    </motion.div>
  );
};

export default RebuildPreviewModal;
