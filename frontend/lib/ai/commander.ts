export function getCommanderRecommendation(dispute, history) {
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
