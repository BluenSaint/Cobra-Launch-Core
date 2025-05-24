import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json([
    { type: "ID", status: "Verified", filename: "driver_license.pdf" },
    { type: "Utility Bill", status: "Pending", filename: "utility.pdf" },
  ]);
}
