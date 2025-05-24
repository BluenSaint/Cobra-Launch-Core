import React, { useState } from "react";
import AICommanderPanel from "../components/AICommanderPanel";
import { getCommanderRecommendation } from "../lib/ai/commander";
import { toast } from "react-toastify";

interface Dispute {
  creditor: string;
  status: string;
}

interface History {
  // Define history properties as needed
}

interface CommanderAction {
  creditor: string;
  action: string;
  reason: string;
  timestamp?: string;
}

interface Recommendation {
  action: string;
  reason: string;
}

interface RecommendationWithCreditor {
  creditor: string;
  recommendation: Recommendation;
}

interface DashboardPageProps {
  disputes: Dispute[];
  history: History;
}

const DashboardPage = ({ disputes, history }: DashboardPageProps) => {
  const [timeline, setTimeline] = useState<CommanderAction[]>([]);

  const handleDeployAction = (action: CommanderAction) => {
    setTimeline([...timeline, action]);
    toast.success("Commander action deployed to timeline");
  };

  const recommendations = disputes
    .map((dispute) => {
      if (dispute.status !== "RESOLVED") {
        return {
          creditor: dispute.creditor,
          recommendation: getCommanderRecommendation(dispute, history),
        };
      }
      return null;
    })
    .filter((item): item is RecommendationWithCreditor => item !== null);

  const topRecommendations = recommendations
    .sort((a, b) => {
      const scoreA =
        a.recommendation.action === "Escalate"
          ? 80
          : a.recommendation.action === "Send Follow-up"
          ? 50
          : 20;
      const scoreB =
        b.recommendation.action === "Escalate"
          ? 80
          : b.recommendation.action === "Send Follow-up"
          ? 50
          : 20;
      return scoreB - scoreA;
    })
    .slice(0, 3);

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <div className="priority-recommendations">
        <h2>Priority Recommendations</h2>
        {topRecommendations.map((rec, index) => (
          <AICommanderPanel
            key={index}
            creditor={rec.creditor}
            recommendation={rec.recommendation}
            onDeploy={handleDeployAction}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
