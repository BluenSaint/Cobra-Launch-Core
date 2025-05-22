import { NextApiRequest, NextApiResponse } from "next";

type Letter = {
  content: string;
  date: string;
};

const vaultStore: Letter[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const letter: Letter = req.body;
    vaultStore.push(letter);

    console.log("Letter saved to vault:", letter);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error saving letter to vault:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
