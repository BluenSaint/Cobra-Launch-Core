export default function handler(req, res) {
  if (req.method === "POST") {
    // Simulate file upload handling
    res.status(200).json({ success: true, status: "Pending" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
