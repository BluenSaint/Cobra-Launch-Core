import React from 'react';
import PDFExportCard from '../../../components/PDFExportCard';
import { getSession } from 'next-auth/react';
import { toast } from 'react-toastify';

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
  const handleDownload = async (exportType) => {
    try {
      const response = await fetch('/api/exports/batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ exportType }),
      });

      const data = await response.json();
      console.log('PDF download link:', data.link);
      toast.success('Export prepared. Download starting…');
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast.error('Failed to prepare export');
    }
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