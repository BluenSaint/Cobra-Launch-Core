import { NextApiRequest, NextApiResponse } from 'next';
import { fetchUsers } from '../../lib/admin-mock-data';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId } = req.query;
  const user = fetchUsers().find((u) => u.name === userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json(user.disputes);
} 