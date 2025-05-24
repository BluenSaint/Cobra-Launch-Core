interface Dispute {
  sentDate: string | Date;
  status: string;
  [key: string]: any; // Allow for additional properties
}

interface RecommendedAction {
  action: string;
  reason: string;
}

export function getRecommendedAction(dispute: Dispute): RecommendedAction {
  const daysSinceSent = Math.floor(
    (new Date().getTime() - new Date(dispute.sentDate).getTime()) / (1000 * 60 * 60 * 24)
  );

  if (dispute.status === "NO RESPONSE" && daysSinceSent > 30) {
    return { action: "send-followup", reason: "30 days expired" };
  }
  if (dispute.status === "REMOVED") {
    return { action: "do-nothing", reason: "Dispute resolved" };
  }
  return { action: "wait", reason: "Within legal waiting period" };
}
