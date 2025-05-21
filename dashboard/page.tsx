import React from 'react';
import AICommanderPanel from '../components/AICommanderPanel';
import { getCommanderRecommendation } from '../lib/ai/commander';

const DashboardPage = ({ disputes, history }) => {
  const recommendations = disputes.map(dispute => {
    if (dispute.status !== 'RESOLVED') {
      return {
        creditor: dispute.creditor,
        recommendation: getCommanderRecommendation(dispute, history),
      };
    }
    return null;
  }).filter(Boolean);

  const topRecommendations = recommendations.sort((a, b) => {
    const scoreA = a.recommendation.action === 'Escalate' ? 80 : a.recommendation.action === 'Send Follow-up' ? 50 : 20;
    const scoreB = b.recommendation.action === 'Escalate' ? 80 : b.recommendation.action === 'Send Follow-up' ? 50 : 20;
    return scoreB - scoreA;
  }).slice(0, 3);

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
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage; 