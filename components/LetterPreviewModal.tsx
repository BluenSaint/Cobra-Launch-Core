import React from "react";
import { generateLetterPDF } from "../lib/pdf-generator";
import { saveAs } from "file-saver";
import { motion } from "framer-motion";

const LetterPreviewModal = ({ dispute, onClose }) => {
  const handleDownload = () => {
    const pdfBlob = generateLetterPDF(dispute);
    saveAs(pdfBlob, "dispute_letter.pdf");
  };

  return (
    <motion.div
      className="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2>Letter Preview</h2>
      <p>User: {dispute.userName}</p>
      <p>Address: {dispute.userAddress}</p>
      <p>Creditor: {dispute.creditorName}</p>
      <p>Reason: {dispute.reason}</p>
      <p>Letter: {dispute.letterText}</p>
      <button onClick={handleDownload}>Download PDF</button>
      <button onClick={onClose}>Close</button>
    </motion.div>
  );
};

export default LetterPreviewModal;
