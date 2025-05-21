"use client";

import React from "react";
import PDFExportCard from "../../../components/PDFExportCard";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

export default async function ExportsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const handleDownload = async (exportType) => {
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
