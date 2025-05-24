import { letterTemplates } from "./templates/letter-templates";

export function generateLetter(dispute) {
  const base =
    letterTemplates[dispute.violationType.toLowerCase()] || letterTemplates["inaccurate reporting"];
  return {
    to: dispute.creditor,
    body: base,
    footer: "Sincerely,\n[Client Name]\nFiled via Project Cobra",
  };
}
