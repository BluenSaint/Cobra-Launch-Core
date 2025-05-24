import React from "react";

export default function DebugLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="debug-layout">
      <header>
        <h1>Debug</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}
