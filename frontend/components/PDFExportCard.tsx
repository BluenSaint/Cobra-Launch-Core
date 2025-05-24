import React from "react";

interface PDFExportCardProps {
  exportType: string;
  lastGenerated: string;
  onDownload: () => void;
}

const PDFExportCard: React.FC<PDFExportCardProps> = ({ exportType, lastGenerated, onDownload }) => {
  return (
    <div className="pdf-export-card">
      <h3>{exportType}</h3>
      <p>Last generated: {lastGenerated}</p>
      <button onClick={onDownload}>Download PDF</button>
    </div>
  );
};

export default PDFExportCard;
