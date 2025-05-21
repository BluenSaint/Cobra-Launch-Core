export default function AuditLogCard({ log }) {
  return (
    <div className="audit-log-card">
      <span className="icon">🔍</span>{" "}
      {/* Replace with dynamic icon based on log type */}
      <div className="details">
        <p>{log.timestamp}</p>
        <p>{log.message}</p>
        {log.link && <a href={log.link}>View Details</a>}
      </div>
    </div>
  );
}
