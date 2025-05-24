interface Tradeline {
  creditor: string;
  status: string;
}

interface CreditReport {
  tradelines: Tradeline[];
}

interface DisputeAction {
  creditor: string;
  type: string;
  message: string;
  state?: string;
}

import { autoRebuildDisputes } from "../rebuilder";

export function processDisputeActions(
  prevReport: CreditReport,
  currentReport: CreditReport
): DisputeAction[] {
  const actions: DisputeAction[] = autoRebuildDisputes(prevReport, currentReport);

  actions.forEach((action) => {
    if (action.type === "Send-Followup") {
      action.state = "follow-up ready";
    }

    if (action.type === "Escalate") {
      action.state = "stalled";
    }
  });

  return actions;
}

// Hook into RebuildPreviewModal
export function integrateWithRebuildPreview(actions: DisputeAction[], onAccept: () => void): void {
  // Logic to integrate actions with the RebuildPreviewModal
  // This is a placeholder for actual integration logic
  console.log("Integrating with RebuildPreviewModal", actions);
  onAccept();
}
