"use client";

import { useState } from "react";
import SidebarLeft from "@/components/sidebar-left/SidebarLeft";
import PdfViewer from "@/components/pdfViewer/PdfViewer";
import SidebarRight from "@/components/sidebar-right/SidebarRight";
import { Button } from "@/components/ui/button";
import { House, LogOut } from "lucide-react";

export default function Home() {
  const [selectedPdf, setSelectedPdf] = useState(
    "/pdfs/Search Report-ELB2025051213063995.pdf"
  );

  const documents = [
    {
      file: "Search Report-ELB2025051213063995.pdf",
      label: "Search Report",
    },
    {
      file: "LEASE CONTRACT REPORT-JLC20250514182245057.pdf",
      label: "Lease Contract Report",
    },
    {
      file: "LPE1 NEW -  7 Blake St-JLC2025051418224568.pdf",
      label: "Enquiries",
    },
  ];

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <House className="h-5 w-5" />
          <h1 className="text-lg font-semibold tracking-tight">Doddle AI</h1>
        </div>
        <Button variant="outline" size="sm">
          <LogOut className="h-4 w-4 mr-2" />
          Log Out
        </Button>
      </header>
      <main className="flex flex-1 overflow-hidden">
        <SidebarLeft
          documents={documents}
          selectedPdf={selectedPdf}
          onPdfChange={setSelectedPdf}
        />
        <PdfViewer selectedPdf={selectedPdf} />
        <SidebarRight />
      </main>
      <footer className="p-4 border-t">
        <p className="text-sm text-center text-muted-foreground">
          &copy; {new Date().getFullYear()} Doddle AI. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
