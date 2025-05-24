import React from "react";

interface User {
  name: string;
  plan: string;
  disputes: any[];
  creditScore: number;
}

interface AdminUserCardProps {
  user: User;
}

const AdminUserCard = ({ user }: AdminUserCardProps) => {
  return (
    <div className="admin-user-card">
      <h2>{user.name}</h2>
      <p>Plan: {user.plan}</p>
      <p>Disputes: {user.disputes.length}</p>
      <p>Credit Score: {user.creditScore}</p>
    </div>
  );
};

export default AdminUserCard;
