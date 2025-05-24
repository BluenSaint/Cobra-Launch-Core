import React from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-layout">
      <header>
        <h1>Admin</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}
