export const mockReportNew = {
  name: "Test User",
  score: 615,
  tradelines: [
    { creditor: "Midland Credit", status: "collection", balance: 240 },
    { creditor: "LVNV Funding", status: "collection", balance: 390 },
    { creditor: "Capital One", status: "inaccurate", balance: 0 },
  ],
  inquiries: ["Navy Federal"],
  reportDate: "2025-05-20",
};

export const mockReportOld = {
  name: "Test User",
  score: 622,
  tradelines: [{ creditor: "Midland Credit", status: "collection", balance: 240 }],
  inquiries: [],
  reportDate: "2025-04-01",
};
