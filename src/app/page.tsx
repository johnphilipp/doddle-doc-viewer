"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import PdfViewer from "@/components/PdfViewer";

export default function Home() {
  const [selectedPdf, setSelectedPdf] = useState(
    "/pdfs/Search Report-ELB2025051213063995.pdf"
  );

  const pdfFiles = [
    "Search Report-ELB2025051213063995.pdf",
    "LEASE CONTRACT REPORT-JLC20250514182245057.pdf",
    "LPE1 NEW -  7 Blake St-JLC2025051418224568.pdf",
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      <Sidebar
        pdfFiles={pdfFiles}
        selectedPdf={selectedPdf}
        onPdfChange={setSelectedPdf}
      />
      <main className="flex-1 flex flex-col">
        <PdfViewer selectedPdf={selectedPdf} />
      </main>
    </div>
  );
}
