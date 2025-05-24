import React from "react";

export default function CreditUpload() {
  return (
    <div className="credit-upload-container">
      <h3>Upload Credit Report</h3>
      <p>Upload your credit report to analyze and track your credit score.</p>
      <div className="upload-area">
        <input type="file" id="credit-upload" className="file-input" />
        <label htmlFor="credit-upload" className="upload-button">
          Select File
        </label>
      </div>
    </div>
  );
}
