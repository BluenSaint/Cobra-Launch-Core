import { ParsedCreditReport } from "./ocr/credit-parser";

export function compareSnapshots(
  oldReport: ParsedCreditReport,
  newReport: ParsedCreditReport,
) {
  const changes: Array<{ type: string; item?: any; from?: any; to?: any }> = [];

  newReport.tradelines.forEach((item) => {
    const match = oldReport.tradelines.find(
      (t) => t.creditor === item.creditor,
    );
    if (!match) changes.push({ type: "new tradeline", item });
    else if (match.status !== item.status || match.balance !== item.balance)
      changes.push({ type: "updated tradeline", from: match, to: item });
  });

  return changes;
}
