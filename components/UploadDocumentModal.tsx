import React, { useState, ChangeEvent } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

interface UploadDocumentModalProps {
  onClose: () => void;
}

const UploadDocumentModal = ({ onClose }: UploadDocumentModalProps) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    // Simulate file metadata upload
    fetch("/api/vault/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: file.name, type: file.type }),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("File metadata uploaded successfully");
        onClose();
      })
      .catch(() => toast.error("Failed to upload file metadata"));
  };

  return (
    <motion.div
      className="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2>Upload Document</h2>
      <input type="file" accept=".pdf,.jpg,.png" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <button onClick={onClose}>Close</button>
    </motion.div>
  );
};

export default UploadDocumentModal;
