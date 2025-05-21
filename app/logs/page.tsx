import { useSession } from "next-auth/react";
import AuditLogCard from "../../components/AuditLogCard";
import { getAuditLogs } from "../../lib/audit-log";

export default function LogsPage() {
  const { data: session } = useSession();

  if (!session) {
    return <p>Access Denied</p>;
  }

  const logs = getAuditLogs(); // Mocked data

  return (
    <div>
      <h1>Audit Logs</h1>
      {logs.map((log, index) => (
        <AuditLogCard key={index} log={log} />
      ))}
    </div>
  );
}
