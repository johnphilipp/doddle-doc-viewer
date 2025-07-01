"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { FileText } from "lucide-react";

interface Document {
  file: string;
  label: string;
}

interface DocumentCardProps {
  document: Document;
  isSelected: boolean;
  onSelect: () => void;
}

function DocumentCard({ document, isSelected, onSelect }: DocumentCardProps) {
  return (
    <Card
      onClick={onSelect}
      className={cn(
        "cursor-pointer transition-colors hover:bg-muted/50 py-3 pb-2 border-input shadow-xs rounded-md",
        isSelected && "bg-primary/10 border-primary/20"
      )}
    >
      <CardHeader className="p-0">
        <div className="flex items-start gap-2 px-3">
          <FileText className="h-5 w-5 flex-shrink-0" />
          <div className="flex flex-col gap-1.5">
            <h3 className="text-sm font-medium break-words">{document.file}</h3>
            <Badge variant="outline" className="w-fit">
              {document.label}
            </Badge>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

interface DocumentsProps {
  documents: Document[];
  selectedPdf: string;
  onPdfChange: (pdf: string) => void;
}

export default function Documents({
  documents,
  selectedPdf,
  onPdfChange,
}: DocumentsProps) {
  return (
    <div className="flex flex-col gap-2">
      {documents.map((doc) => (
        <DocumentCard
          key={doc.file}
          document={doc}
          isSelected={`/pdfs/${doc.file}` === selectedPdf}
          onSelect={() => onPdfChange(`/pdfs/${doc.file}`)}
        />
      ))}
    </div>
  );
}
