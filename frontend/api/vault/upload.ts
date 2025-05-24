import { NextApiRequest, NextApiResponse } from "next";

// Define a type for the vault items
interface VaultItem {
  [key: string]: any;
}

const vaultStore: VaultItem[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        success: false,
        message: "Method not allowed",
        allowedMethods: ["POST"],
      });
    }

    // Validate request body
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Missing required document data",
      });
    }

    const letter: VaultItem = req.body;
    vaultStore.push(letter);

    console.log("Letter saved to vault:", letter);

    return res.status(200).json({
      success: true,
      message: "Document successfully saved to vault",
    });
  } catch (error) {
    console.error("Error in vault upload:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to save document to vault",
      error: process.env.NODE_ENV === "development" ? String(error) : undefined,
    });
  }
}
