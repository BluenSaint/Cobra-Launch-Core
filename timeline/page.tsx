import React, { useState } from 'react';
import AICommanderPanel from '../components/AICommanderPanel';
import { getCommanderRecommendation } from '../lib/ai/commander';
import { toast } from 'react-toastify';

const TimelinePage = ({ disputes, history }) => {
  const [timeline, setTimeline] = useState([]);

  const handleDeployAction = (action) => {
    setTimeline([...timeline, action]);
    toast.success('Commander action deployed to timeline');
  };

  return (
    <div className="timeline-page">
      <h1>Timeline</h1>
      {timeline.map((action, index) => (
        <div key={index} className="timeline-entry">
          <p>Action: {action.type} for {action.creditor}</p>
        </div>
      ))}
      {disputes.map((dispute, index) => {
        if (dispute.status !== 'RESOLVED') {
          const recommendation = getCommanderRecommendation(dispute, history);
          return (
            <div key={index} className="dispute-card">
              <h2>{dispute.creditor}</h2>
              {/* Other dispute details */}
              <AICommanderPanel
                creditor={dispute.creditor}
                recommendation={recommendation}
                onDeploy={handleDeployAction}
              />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default TimelinePage; 