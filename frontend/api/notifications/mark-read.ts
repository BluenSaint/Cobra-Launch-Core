import { markAllAsRead } from "../../lib/notifications";

export default function handler(req, res) {
  if (req.method === "POST") {
    markAllAsRead();
    res.status(200).json({ success: true });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
