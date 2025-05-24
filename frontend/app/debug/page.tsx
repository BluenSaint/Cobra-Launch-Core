"use client";

import React from "react";
import { getServerSession } from "next-auth/next";
import { fetchUsers } from "../../lib/admin-mock-data";

interface Session {
  user?: {
    name?: string;
    email?: string;
    image?: string;
    id?: string;
    role?: string;
  };
}

interface Dispute {
  title: string;
  status: string;
  [key: string]: unknown;
}

export default function DebugPage() {
  const [session, setSession] = React.useState<Session | null>(null);
  const [userDisputes, setUserDisputes] = React.useState<Dispute[]>([]);

  React.useEffect(() => {
    async function fetchSession() {
      try {
        // Using a more specific type cast for NextAuth compatibility
        const sessionData = await getServerSession();
        setSession(sessionData as Session | null);

        const disputes =
          fetchUsers().find((u) => u.name === sessionData?.user?.name)?.disputes || [];
        setUserDisputes(disputes);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    }

    fetchSession();
  }, []);

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
      <h2>User Disputes</h2>
      <pre>{JSON.stringify(userDisputes, null, 2)}</pre>
    </div>
  );
}
