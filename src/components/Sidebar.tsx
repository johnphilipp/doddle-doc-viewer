"use client";

import { FileText } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SidebarProps {
  pdfFiles: string[];
  selectedPdf: string;
  onPdfChange: (pdf: string) => void;
}

export default function Sidebar({
  pdfFiles,
  selectedPdf,
  onPdfChange,
}: SidebarProps) {
  return (
    <aside className="w-full md:w-72 bg-muted/40 p-4 border-r flex flex-col gap-y-6">
      <div className="flex items-center gap-2">
        <FileText className="h-5 w-5" />
        <h2 className="text-lg font-semibold tracking-tight">Documents</h2>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Select a PDF</label>
        <Select onValueChange={onPdfChange} value={selectedPdf}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a document..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {pdfFiles.map((file) => (
                <SelectItem key={file} value={`/pdfs/${file}`}>
                  <span className="truncate">{file}</span>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </aside>
  );
}
