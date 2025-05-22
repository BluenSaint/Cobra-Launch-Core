import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Simulate OCR and analysis with a delay
  setTimeout(() => {
    // Mocked violation data
    const mockData = {
      disputes: [
        { id: 1, summary: "Dispute item 1" },
        { id: 2, summary: "Dispute item 2" },
        { id: 3, summary: "Dispute item 3" },
      ],
    };

    console.log("File uploaded successfully:", mockData);
    res.status(200).json(mockData);
  }, 3000); // Simulate a 3-second delay
}
