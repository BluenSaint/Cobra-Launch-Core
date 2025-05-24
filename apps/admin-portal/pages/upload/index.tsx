import React from "react";

export default function UploadPage() {
  return (
    <div className="upload-page">
      <h1>Upload Documents</h1>
      <div className="upload-container">
        <div className="upload-area">
          <input type="file" id="document-upload" className="file-input" />
          <label htmlFor="document-upload" className="upload-button">
            Select File
          </label>
        </div>
        <p className="upload-instructions">
          Upload your credit reports, dispute letters, or other relevant documents.
          Supported formats: PDF, JPG, PNG
        </p>
      </div>
    </div>
  );
}
