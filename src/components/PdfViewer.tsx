"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";

const PdfPage = ({ pdf, pageNumber }: { pdf: any; pageNumber: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [page, setPage] = useState<any>(null);

  useEffect(() => {
    if (pdf) {
      pdf.getPage(pageNumber).then((pdfPage: any) => {
        setPage(pdfPage);
      });
    }
    return () => {
      setPage(null);
    };
  }, [pdf, pageNumber]);

  useEffect(() => {
    let renderTask: any;
    if (page && canvasRef.current) {
      const canvas = canvasRef.current;
      const viewport = page.getViewport({ scale: 1.5 });
      const context = canvas.getContext("2d");

      if (context) {
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        renderTask = page.render({
          canvasContext: context,
          viewport: viewport,
        });

        renderTask.promise.catch((err: any) => {
          if (err.name !== "RenderingCancelledException") {
            console.error(`Error rendering page ${pageNumber}:`, err);
          }
        });
      }
    }
    return () => {
      if (renderTask) {
        renderTask.cancel();
      }
    };
  }, [page]);

  return <canvas ref={canvasRef} className="mb-4 shadow-lg" />;
};

interface PdfViewerProps {
  selectedPdf: string;
}

export default function PdfViewer({ selectedPdf }: PdfViewerProps) {
  const [pdf, setPdf] = useState<any>(null);
  const [numPages, setNumPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [pdfjsLib, setPdfjsLib] = useState<any>(null);
  const [visiblePage, setVisiblePage] = useState(1);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadPdfJs = async () => {
      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.mjs`;
        setPdfjsLib(pdfjs);
      } catch (error) {
        console.error("Error loading PDF.js:", error);
      }
    };
    loadPdfJs();
  }, []);

  useEffect(() => {
    setPdf(null);
    setNumPages(0);
    setVisiblePage(1);
    pageRefs.current = [];
    const loadPdf = async () => {
      if (selectedPdf && pdfjsLib) {
        setIsLoading(true);
        try {
          const loadingTask = pdfjsLib.getDocument(selectedPdf);
          const pdfDoc = await loadingTask.promise;
          setPdf(pdfDoc);
          setNumPages(pdfDoc.numPages);
          pageRefs.current = Array(pdfDoc.numPages).fill(null);
        } catch (error) {
          console.error("Error loading PDF:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    loadPdf();
  }, [selectedPdf, pdfjsLib]);

  useEffect(() => {
    if (isLoading || !viewerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (debounceTimer.current) clearTimeout(debounceTimer.current);

        debounceTimer.current = setTimeout(() => {
          const visibleEntries = entries.filter((e) => e.isIntersecting);

          if (visibleEntries.length > 0) {
            const topEntry = visibleEntries.reduce((max, entry) =>
              entry.intersectionRatio > max.intersectionRatio ? entry : max
            );
            const pageNum = parseInt(
              (topEntry.target as HTMLElement).dataset.pageNumber || "0"
            );
            if (pageNum) {
              setVisiblePage(pageNum);
            }
          }
        }, 100);
      },
      {
        root: viewerRef.current,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    pageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      pageRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [isLoading]);

  const goToPage = (pageNumber: number) => {
    const pageIndex = pageNumber - 1;
    if (pageRefs.current[pageIndex]) {
      pageRefs.current[pageIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const setPageRef = (el: HTMLDivElement | null, index: number) => {
    pageRefs.current[index] = el;
  };

  return (
    <section className="flex flex-col h-full bg-gray-50">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          Loading PDF...
        </div>
      ) : (
        <>
          <div className="flex-shrink-0 z-10 bg-white/80 backdrop-blur-sm p-2 flex items-center justify-center gap-4 border-b">
            <Button
              variant="outline"
              size="icon"
              onClick={() => goToPage(visiblePage - 1)}
              disabled={visiblePage <= 1}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
            <span>
              Page {visiblePage} of {numPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => goToPage(visiblePage + 1)}
              disabled={visiblePage >= numPages}
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
          </div>
          <div ref={viewerRef} className="flex-grow overflow-auto">
            {pdf &&
              Array.from(new Array(numPages), (el, index) => (
                <div
                  key={`page_wrapper_${index + 1}`}
                  ref={(r) => setPageRef(r, index)}
                  data-page-number={index + 1}
                  className="flex justify-center"
                >
                  <PdfPage pdf={pdf} pageNumber={index + 1} />
                </div>
              ))}
          </div>
        </>
      )}
    </section>
  );
}
