import React, { useState } from "react";
import { toast } from "react-toastify";
import RebuildPreviewModal from "./RebuildPreviewModal";

const UploadSuccessModal = ({ onClose }) => {
  const [isRebuildModalOpen, setRebuildModalOpen] = useState(false);
  const [actions, setActions] = useState([]);

  const handleAutoRebuild = async () => {
    try {
      const response = await fetch("/api/rebuilder/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prev: {
            /* mock previous report */
          },
          current: {
            /* mock current report */
          },
        }),
      });

      const data = await response.json();
      setActions(data.actions);
      setRebuildModalOpen(true);
      toast.info(
        `${data.actions.length} auto-generated dispute actions ready for review`
      );
    } catch (error) {
      toast.error("Failed to auto rebuild disputes");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Upload Successful</h2>
        <button onClick={handleAutoRebuild}>Auto Rebuild Disputes</button>
        <button onClick={onClose}>Close</button>
        {isRebuildModalOpen && (
          <RebuildPreviewModal
            actions={actions}
            onClose={() => setRebuildModalOpen(false)}
            onAccept={() => {
              /* simulate storing actions */
            }}
          />
        )}
      </div>
    </div>
  );
};

export default UploadSuccessModal;
