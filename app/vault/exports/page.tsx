import React from 'react';
import PDFExportCard from '../../../components/PDFExportCard';
import { getSession } from 'next-auth/react';

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

const ExportsPage = () => {
  const handleDownload = (exportType) => {
    // Call the API to download the PDF
    fetch('/api/exports/batch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ exportType }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Handle the PDF download
        console.log('PDF download link:', data.link);
      })
      .catch((error) => console.error('Error downloading PDF:', error));
  };

  return (
    <div className="exports-page">
      <h1>Export Center</h1>
      <PDFExportCard exportType="All Dispute Letters" lastGenerated="2023-10-01" onDownload={() => handleDownload('All Dispute Letters')} />
      <PDFExportCard exportType="Timeline Summary PDF" lastGenerated="2023-10-01" onDownload={() => handleDownload('Timeline Summary PDF')} />
      <PDFExportCard exportType="Full Audit Log" lastGenerated="2023-10-01" onDownload={() => handleDownload('Full Audit Log')} />
      <PDFExportCard exportType="Credit Report Snapshots" lastGenerated="2023-10-01" onDownload={() => handleDownload('Credit Report Snapshots')} />
    </div>
  );
};

export default ExportsPage; 