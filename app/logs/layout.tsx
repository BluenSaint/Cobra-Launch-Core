export default function LogsLayout({ children }) {
  return (
    <div className="logs-layout">
      <header>
        <h1>Logs</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}
