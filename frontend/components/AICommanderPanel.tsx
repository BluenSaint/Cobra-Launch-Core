import React from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

interface CommanderAction {
  creditor: string;
  action: string;
  reason: string;
  timestamp?: string;
}

interface AICommanderPanelProps {
  creditor: string;
  recommendation: { action: string; reason: string };
  onDeploy: (action: CommanderAction) => void;
}

const AICommanderPanel: React.FC<AICommanderPanelProps> = ({
  creditor,
  recommendation,
  onDeploy,
}) => {
  const getThreatScore = (action: string) => {
    switch (action) {
      case "Escalate":
        return 80;
      case "Send Follow-up":
        return 50;
      case "Monitor":
      default:
        return 20;
    }
  };

  const handleDeployAction = () => {
    const action: CommanderAction = {
      creditor,
      action: recommendation.action,
      reason: recommendation.reason,
      timestamp: new Date().toISOString(),
    };
    onDeploy(action);
    toast.success("Commander action deployed to timeline");
  };

  const threatScore = getThreatScore(recommendation.action);

  return (
    <motion.div
      className="ai-commander-panel"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h3>Creditor: {creditor}</h3>
      <p>Recommended Action: {recommendation.action}</p>
      <p>Reason: {recommendation.reason}</p>
      <div
        className="threat-score-bar"
        style={{
          width: `${threatScore}%`,
          backgroundColor: threatScore >= 80 ? "red" : threatScore >= 50 ? "yellow" : "green",
        }}
      >
        Threat Score: {threatScore}
      </div>
      <button onClick={handleDeployAction}>Deploy This Action</button>
    </motion.div>
  );
};

export default AICommanderPanel;
