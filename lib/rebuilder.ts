export function autoRebuildDisputes(prev, current) {
  const newActions = [];

  current.tradelines.forEach((item) => {
    const old = prev.tradelines.find((t) => t.creditor === item.creditor);
    if (old && old.status === item.status) {
      newActions.push({
        creditor: item.creditor,
        type: "Send-Followup",
        message: "No update after 30+ days — recommend follow-up letter.",
      });
    }

    if (old && item.status === "verified" && old.status === "disputed") {
      newActions.push({
        creditor: item.creditor,
        type: "Escalate",
        message:
          "Creditor verified item without investigation — escalate to AG or CFPB.",
      });
    }
  });

  return newActions;
}
