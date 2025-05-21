import { NextApiRequest, NextApiResponse } from "next";

const vaultStore = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const letter = req.body;
  vaultStore.push(letter);

  console.log("Letter saved to vault:", letter);
  res.status(200).json({ success: true });
}
