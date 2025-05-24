import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { exportType } = req.body;

    // Mock response for PDF download
    const mockResponse = {
      link: `/mock-pdfs/${exportType.replace(/\s+/g, "-").toLowerCase()}-bundle.pdf`,
    };

    return res.status(200).json(mockResponse);
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
