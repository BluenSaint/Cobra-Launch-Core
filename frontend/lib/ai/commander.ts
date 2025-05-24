interface Dispute {
  status: string;
  daysSinceFiled: number;
  creditor: string;
  verifiedWithoutInvestigation?: boolean;
  [key: string]: any; // Allow for additional properties
}

interface DisputeHistory {
  creditor: string;
  [key: string]: any; // Allow for additional properties
}

interface CommanderRecommendation {
  action: string;
  reason: string;
}

export function getCommanderRecommendation(
  dispute: Dispute,
  history: DisputeHistory[]
): CommanderRecommendation {
  if (dispute.status === "DISPUTED" && dispute.daysSinceFiled > 30) {
    return { action: "Send Follow-up", reason: "No response in 30+ days" };
  }

  const sameCreditorCount = history.filter((h) => h.creditor === dispute.creditor).length;
  if (sameCreditorCount >= 2) {
    return {
      action: "Escalate",
      reason: "Multiple unresolved disputes with this creditor",
    };
  }

  if (dispute.status === "VERIFIED" && dispute.verifiedWithoutInvestigation) {
    return {
      action: "Escalate to CFPB/AG",
      reason: "Verified without investigation",
    };
  }

  return { action: "Monitor", reason: "No aggressive flags detected" };
}
