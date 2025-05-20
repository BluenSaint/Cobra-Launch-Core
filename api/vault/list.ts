import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Mock list of saved letters
  const mockLetters = [
    { name: 'Letter 1', type: 'pdf' },
    { name: 'Letter 2', type: 'jpg' },
  ];

  res.status(200).json(mockLetters);
} 