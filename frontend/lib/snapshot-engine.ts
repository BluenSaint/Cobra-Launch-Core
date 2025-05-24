interface SnapshotChange {
  creditor: string;
  oldStatus: string;
  newStatus: string;
}

export function compareSnapshots(oldReport: any, newReport: any): SnapshotChange[] {
  const changes: SnapshotChange[] = [];

  newReport.tradelines.forEach((newTradeline: any) => {
    const oldTradeline = oldReport.tradelines.find(
      (t: any) => t.creditor === newTradeline.creditor
    );
    if (!oldTradeline || oldTradeline.status !== newTradeline.status) {
      changes.push({
        creditor: newTradeline.creditor,
        oldStatus: oldTradeline ? oldTradeline.status : "none",
        newStatus: newTradeline.status,
      });
    }
  });

  return changes;
}
