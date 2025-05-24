import { NextApiRequest, NextApiResponse } from "next";
import { fetchUsers } from "../../lib/admin-mock-data";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({
        success: false,
        message: "Method not allowed",
        allowedMethods: ["GET"],
      });
    }

    const { userId } = req.query;

    if (!userId || Array.isArray(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID provided",
      });
    }

    const users = fetchUsers();
    const user = users.find((u) => u.name === userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        userId: userId,
      });
    }

    res.status(200).json({
      success: true,
      data: user.disputes,
    });
  } catch (error) {
    console.error("Error in disputes API:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error processing dispute data",
      error: process.env.NODE_ENV === "development" ? String(error) : undefined,
    });
  }
}
