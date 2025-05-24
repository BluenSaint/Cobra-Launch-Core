import React from "react";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="profile-layout">
      <header>
        <h1>Profile</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}
