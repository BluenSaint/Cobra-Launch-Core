"use client";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminUserCard from "../../components/AdminUserCard";
import { fetchUsers } from "../../lib/admin-mock-data";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.email !== "admin@bluecrest.com") {
    redirect("/dashboard");
  }

  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from mock data
    const usersData = fetchUsers();
    setUsers(usersData);
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
