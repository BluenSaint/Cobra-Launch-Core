"use client";

import React from "react";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UploadDocumentModal from "../../components/UploadDocumentModal";
import VaultLayout from "./layout";

const VaultPage = () => {
  const [documents, setDocuments] = useState<DocumentType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Define DocumentType
  interface DocumentType {
    id: number;
    title: string;
    status: string;
    name?: string; // Add 'name' as an optional property if needed
  }

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      if (!session) {
        // Handle unauthenticated state, e.g., redirect to sign-in
        window.location.href = "/api/auth/signin";
      }
    };
    fetchSession();
  }, []);

  useEffect(() => {
    // Fetch documents from API
    fetch("/api/vault/list")
      .then((res) => res.json())
      .then((data) => setDocuments(data))
      .catch((error) => toast.error("Failed to load documents"));
  }, []);

  return (
    <VaultLayout>
      <div className="vault-page">
        <h1>Your Document Vault</h1>
        <button onClick={() => setIsModalOpen(true)}>Upload Document</button>
        <ul>
          {documents.map((doc, index) => (
            <li key={index}>{doc.name}</li>
          ))}
        </ul>
        {isModalOpen && (
          <UploadDocumentModal onClose={() => setIsModalOpen(false)} />
        )}
      </div>
    </VaultLayout>
  );
};

export default VaultPage;
