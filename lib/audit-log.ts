const auditLogs = [];

export function logAction(actionType, userId, payload) {
  const timestamp = new Date().toISOString();
  const message = `${actionType} by user ${userId}`;
  auditLogs.push({ type: actionType, userId, timestamp, message, ...payload });
}

export function getAuditLogs() {
  return auditLogs.slice(-50); // Return the most recent 50 logs
}
