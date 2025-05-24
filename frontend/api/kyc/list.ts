export default function handler(req, res) {
  res.status(200).json([
    { type: "ID", status: "Verified", filename: "driver_license.pdf" },
    { type: "Utility Bill", status: "Pending", filename: "utility.pdf" },
  ]);
}
