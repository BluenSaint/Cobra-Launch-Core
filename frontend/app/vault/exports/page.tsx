"use client";

import React from "react";
import PDFExportCard from "../../../components/PDFExportCard";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

interface Session {
  user?: {
    name?: string;
    email?: string;
    image?: string;
    id?: string;
    role?: string;
  };
}

export default function ExportsPage() {
  const [session, setSession] = React.useState<Session | null>(null);

  React.useEffect(() => {
    async function checkSession() {
      try {
        const sessionData = await getServerSession();
        setSession(sessionData as Session | null);

        if (!sessionData) {
          redirect("/api/auth/signin");
        }
      } catch (error) {
        console.error("Error checking session:", error);
      }
    }

    checkSession();
  }, []);

  const handleDownload = async (exportType: string) => {
    try {
      const response = await fetch("/api/exports/batch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ exportType }),
      });

      const data = await response.json();
      console.log("PDF download link:", data.link);
      toast.success("Export prepared. Download starting…");
    } catch (error) {
      console.error("Error downloading PDF:", error);
      toast.error("Failed to prepare export");
    }
  };

  return (
    <div className="exports-page">
      <h1>Export Center</h1>
      <PDFExportCard
        exportType="All Dispute Letters"
        lastGenerated="2023-10-01"
        onDownload={() => handleDownload("All Dispute Letters")}
      />
      <PDFExportCard
        exportType="Timeline Summary PDF"
        lastGenerated="2023-10-01"
        onDownload={() => handleDownload("Timeline Summary PDF")}
      />
      <PDFExportCard
        exportType="Full Audit Log"
        lastGenerated="2023-10-01"
        onDownload={() => handleDownload("Full Audit Log")}
      />
      <PDFExportCard
        exportType="Credit Report Snapshots"
        lastGenerated="2023-10-01"
        onDownload={() => handleDownload("Credit Report Snapshots")}
      />
    </div>
  );
}
