import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuditLogs } from "../../lib/audit-log";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const logs = getAuditLogs();
  res.status(200).json(logs);
}
