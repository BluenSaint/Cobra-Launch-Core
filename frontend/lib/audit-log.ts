interface AuditLogEntry {
  type: string;
  userId: string;
  timestamp: string;
  message: string;
  [key: string]: any; // For additional payload properties
}

const auditLogs: AuditLogEntry[] = [];

export function logAction(actionType: string, userId: string, payload: Record<string, any> = {}) {
  const timestamp = new Date().toISOString();
  const message = `${actionType} by user ${userId}`;
  auditLogs.push({ type: actionType, userId, timestamp, message, ...payload });
}

export function getAuditLogs(): AuditLogEntry[] {
  return auditLogs.slice(-50); // Return the most recent 50 logs
}
