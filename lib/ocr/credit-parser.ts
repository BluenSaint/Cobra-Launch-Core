export type ParsedCreditReport = {
  name: string;
  score: number;
  tradelines: { creditor: string; status: string; balance: number }[];
  inquiries: string[];
  reportDate: string;
};

export function parseCreditReport(file: File): Promise<ParsedCreditReport> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "John Doe",
        score: 612,
        tradelines: [
          { creditor: "Midland Credit", status: "collection", balance: 189 },
          { creditor: "Capital One", status: "paid", balance: 0 },
        ],
        inquiries: ["Ally Bank", "Navy Federal"],
        reportDate: "2025-05-20",
      });
    }, 1500);
  });
}
