export function generatePDFBatch(exportType) {
  console.log(`Generating ${exportType} into 1 PDF...`);
  // Simulate PDF generation
  return `/mock-pdfs/${exportType
    .replace(/\s+/g, "-")
    .toLowerCase()}-bundle.pdf`;
}
