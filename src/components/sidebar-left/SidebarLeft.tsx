"use client";

import { House } from "lucide-react";
import Documents from "./Documents";

interface Document {
  file: string;
  label: string;
}
interface SidebarLeftProps {
  documents: Document[];
  selectedPdf: string;
  onPdfChange: (pdf: string) => void;
}

export default function SidebarLeft({
  documents,
  selectedPdf,
  onPdfChange,
}: SidebarLeftProps) {
  return (
    <aside className="w-72 bg-muted p-4 border-r flex flex-col gap-y-6 flex-shrink-0">
      <div className="flex items-center gap-2">
        <House className="h-5 w-5" />
        <h2 className="text-lg font-semibold tracking-tight">Doddle AI</h2>
      </div>

      <section aria-label="PDF Selection" className="flex flex-col gap-2">
        <label className="text-sm font-medium">Documents</label>
        <Documents
          documents={documents}
          selectedPdf={selectedPdf}
          onPdfChange={onPdfChange}
        />
      </section>
    </aside>
  );
}
