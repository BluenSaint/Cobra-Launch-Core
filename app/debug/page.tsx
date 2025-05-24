"use client";

import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../lib/auth";
import { validateEnv } from "../../utils/validateEnv";
import { fetchUsers } from "../../lib/admin-mock-data";

export default async function DebugPage() {
  const session = await getServerSession(authOptions);

  const envValidation = validateEnv();
  const userDisputes = fetchUsers().find((u) => u.name === session?.user?.name)?.disputes || [];

  return (
    <div className="debug-page">
      <h1>Debug Information</h1>
      <h2>Session</h2>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <h2>Environment Variables</h2>
      <ul>
        <li>NEXTAUTH_SECRET: {process.env.NEXTAUTH_SECRET ? "Set" : "Not Set"}</li>
        <li>NEXTAUTH_URL: {process.env.NEXTAUTH_URL ? "Set" : "Not Set"}</li>
        <li>MONGODB_URI: {process.env.MONGODB_URI ? "Set" : "Not Set"}</li>
        <li>ADMIN_EMAIL: {process.env.ADMIN_EMAIL ? "Set" : "Not Set"}</li>
      </ul>
      <h2>Environment Validation</h2>
      <p>{envValidation}</p>
      <h2>User Disputes</h2>
      <pre>{JSON.stringify(userDisputes, null, 2)}</pre>
    </div>
  );
}
