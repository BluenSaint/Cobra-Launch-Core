import { NextApiRequest, NextApiResponse } from 'next';
import { fetchUsers } from '../../lib/admin-mock-data';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const users = fetchUsers();
  res.status(200).json(users);
} 