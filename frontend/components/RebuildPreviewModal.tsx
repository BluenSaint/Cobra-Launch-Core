import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { autoRebuildDisputes } from "../lib/rebuilder";
import { mockReportNew, mockReportOld } from "../lib/mocks/mock-report";

export interface RebuildAction {
  creditor: string;
  type: string;
  message: string;
}

interface RebuildPreviewModalProps {
  actions?: RebuildAction[];
  onClose?: () => void;
  onAccept?: () => void;
}

const RebuildPreviewModal = ({
  actions: initialActions,
  onClose,
  onAccept,
}: RebuildPreviewModalProps) => {
  const [actions, setActions] = useState<RebuildAction[]>(initialActions || []);

  const handleGenerateActions = () => {
    const generatedActions = autoRebuildDisputes(mockReportOld, mockReportNew);
    setActions(generatedActions);
  };

  const handleDeployAction = (action: RebuildAction) => {
    console.log("Action deployed:", action);
    toast.success("Action deployed to timeline");
  };

  const handleAccept = () => {
    if (onAccept) {
      onAccept();
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      console.log("Modal closed");
    }
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
        {!initialActions && <button onClick={handleGenerateActions}>Generate Actions</button>}
        <ul>
          {actions.map((action, index) => (
            <li key={index}>
              <strong>Creditor:</strong> {action.creditor}
              <br />
              <strong>Action Type:</strong> {action.type}
              <br />
              <strong>Reason:</strong> {action.message}
              <br />
              <button onClick={() => handleDeployAction(action)}>Deploy Action</button>
            </li>
          ))}
        </ul>
        {onAccept && <button onClick={handleAccept}>Accept All</button>}
        <button onClick={handleClose}>Close</button>
      </div>
    </motion.div>
  );
};

export default RebuildPreviewModal;
