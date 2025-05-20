import React from 'react';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import UploadDocumentModal from '../../components/UploadDocumentModal';

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

const VaultPage = () => {
  const [documents, setDocuments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch documents from API
    fetch('/api/vault/list')
      .then((res) => res.json())
      .then((data) => setDocuments(data))
      .catch((error) => toast.error('Failed to load documents'));
  }, []);

  return (
    <div className="vault-page">
      <h1>Your Document Vault</h1>
      <button onClick={() => setIsModalOpen(true)}>Upload Document</button>
      <ul>
        {documents.map((doc, index) => (
          <li key={index}>{doc.name}</li>
        ))}
      </ul>
      {isModalOpen && <UploadDocumentModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default VaultPage; 