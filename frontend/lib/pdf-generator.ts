import { jsPDF } from "jspdf";

export function generateLetterPDF(dispute) {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(12);
  doc.text(`User: ${dispute.userName}`, 10, 10);
  doc.text(`Address: ${dispute.userAddress}`, 10, 20);

  // Body
  doc.setFontSize(10);
  doc.text(`Creditor: ${dispute.creditorName}`, 10, 40);
  doc.text(`Reason: ${dispute.reason}`, 10, 50);
  doc.text(`Letter: ${dispute.letterText}`, 10, 60);

  // Footer
  doc.setFontSize(8);
  doc.text("Signed electronically via Project Cobra", 10, 280);

  return doc.output("blob");
}
