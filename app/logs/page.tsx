"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
// import AuditLogCard from "../../components/AuditLogCard";
// import { getAuditLogs } from "../../lib/audit-log";

const LogsPage = () => {
  // Use optional chaining to safely handle undefined session
  const session = useSession()?.data;
  const [logs, setLogs] = useState<
    {
      type: string;
      timestamp: string;
      context: string;
    }[]
  >([]);

  useEffect(() => {
    // Simulate fetching logs
    const mockLogs = [
      {
        type: "Dispute Deployed",
        timestamp: new Date().toISOString(),
        context: "Midland Credit",
      },
      {
        type: "Escalation Triggered",
        timestamp: new Date().toISOString(),
        context: "LVNV Funding",
      },
      {
        type: "PDF Exported",
        timestamp: new Date().toISOString(),
        context: "All Dispute Letters",
      },
    ];
    setLogs(mockLogs);
  }, []);

  if (!session) {
    return <p>Access Denied</p>;
  }

  return (
    <motion.div
      className="logs-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1>Logs</h1>
      <ul>
        {logs.map((log, index) => (
          <li key={index} className="log-entry">
            <p>Action: {log.type}</p>
            <p>Timestamp: {log.timestamp}</p>
            <p>Context: {log.context}</p>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default LogsPage;
