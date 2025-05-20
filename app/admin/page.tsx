import React from 'react';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import AdminUserCard from '../../components/AdminUserCard';
import { fetchUsers } from '../../lib/admin-mock-data';

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session || session.user.email !== 'admin@bluecrest.com') {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

const AdminPage = () => {
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
};

export default AdminPage; 