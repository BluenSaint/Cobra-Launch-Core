import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // Mock data for the most recent prior report
    const mockReport = {
      tradelines: [
        { creditor: "Creditor A", status: "disputed" },
        { creditor: "Creditor B", status: "verified" },
      ],
    };

    return res.status(200).json({ report: mockReport });
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
