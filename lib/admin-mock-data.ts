export const fetchUsers = () => [
  {
    name: 'John Doe',
    plan: 'Premium',
    disputes: [
      { title: 'Dispute 1', status: 'Pending' },
      { title: 'Dispute 2', status: 'Resolved' },
    ],
    creditScore: 720,
  },
  {
    name: 'Jane Smith',
    plan: 'Basic',
    disputes: [
      { title: 'Dispute 3', status: 'In Progress' },
    ],
    creditScore: 680,
  },
]; 