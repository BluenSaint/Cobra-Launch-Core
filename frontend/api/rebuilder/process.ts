import { autoRebuildDisputes } from "../../lib/rebuilder";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { prev, current } = req.body;

    if (!prev || !current) {
      return res.status(400).json({ error: "Previous and current reports are required." });
    }

    const actions = autoRebuildDisputes(prev, current);
    return res.status(200).json({ actions });
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
