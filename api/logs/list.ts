import { getAuditLogs } from "../../lib/audit-log";

export default function handler(req, res) {
  const logs = getAuditLogs();
  res.status(200).json(logs);
}
