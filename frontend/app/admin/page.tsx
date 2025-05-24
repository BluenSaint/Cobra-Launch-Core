"use client";

import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../lib/auth";
import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { redirect } from "next/navigation";
import AdminUserCard from "../../components/AdminUserCard";
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

export default function AdminPage() {
  const [users, setUsers] = useState<
    {
      name: string;
      plan: string;
      disputes: { title: string; status: string }[];
      creditScore: number;
    }[]
  >([]);

  useEffect(() => {
    // Fetch users from mock data
    const usersData = fetchUsers();
    setUsers(usersData);
  }, []);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        // Using type assertion to resolve NextAuth type compatibility issues
        const session = (await getServerSession(authOptions as any)) as Session | null;
        if (session && session.user) {
          // Handle authenticated state
        } else {
          // Handle unauthenticated state
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };
    fetchSession();
  }, []);

  return (
    <div className="admin-page">
      <h1>Admin War Room</h1>
      <div className="user-list">
        {users.map((user, index) => (
          <AdminUserCard key={index} user={user} />
        ))}
      </div>
    </div>
  );
}
