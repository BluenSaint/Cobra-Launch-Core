import { ParsedCreditReport } from "./ocr/credit-parser";

export function compareSnapshots(oldReport, newReport) {
  const changes = [];

  newReport.tradelines.forEach(newTradeline => {
    const oldTradeline = oldReport.tradelines.find(t => t.creditor === newTradeline.creditor);
    if (!oldTradeline || oldTradeline.status !== newTradeline.status) {
      changes.push({
        creditor: newTradeline.creditor,
        oldStatus: oldTradeline ? oldTradeline.status : 'none',
        newStatus: newTradeline.status,
      });
    }
  });

  return changes;
}
