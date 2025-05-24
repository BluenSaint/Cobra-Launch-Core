export default function DebugLayout({ children }) {
  return (
    <div className="debug-layout">
      <header>
        <h1>Debug</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}
