interface Dispute {
  creditor: string;
  violationType: string;
  [key: string]: unknown;
}

import { letterTemplates } from "./templates/letter-templates";

export function generateLetter(dispute: Dispute) {
  const base =
    letterTemplates[dispute.violationType.toLowerCase()] || letterTemplates["inaccurate reporting"];
  return {
    to: dispute.creditor,
    body: base,
    footer: "Sincerely,\n[Client Name]\nFiled via Project Cobra",
  };
}
