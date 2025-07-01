"use client";

import { useEffect, useRef, useState } from "react";

const PdfPage = ({
  pdf,
  pageNumber,
  width,
}: {
  pdf: any;
  pageNumber: number;
  width: number;
}) => {
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
    if (page && canvasRef.current && width > 0) {
      const canvas = canvasRef.current;
      const viewport = page.getViewport({ scale: 1.0 });
      const scale = width / viewport.width;
      const scaledViewport = page.getViewport({ scale });

      const context = canvas.getContext("2d");

      if (context) {
        canvas.height = scaledViewport.height;
        canvas.width = scaledViewport.width;

        renderTask = page.render({
          canvasContext: context,
          viewport: scaledViewport,
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
  }, [page, width]);

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
  const viewerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const element = viewerRef.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    resizeObserver.observe(element);
    return () => resizeObserver.disconnect();
  }, [isLoading]);

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
    const loadPdf = async () => {
      if (selectedPdf && pdfjsLib) {
        setIsLoading(true);
        try {
          const loadingTask = pdfjsLib.getDocument(selectedPdf);
          const pdfDoc = await loadingTask.promise;
          setPdf(pdfDoc);
          setNumPages(pdfDoc.numPages);
        } catch (error) {
          console.error("Error loading PDF:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    loadPdf();
  }, [selectedPdf, pdfjsLib]);

  return (
    <section className="h-full flex flex-col bg-muted/50">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          Loading PDF...
        </div>
      ) : (
        <>
          <div ref={viewerRef} className="flex-1 overflow-auto p-4 min-h-0">
            {pdf &&
              containerWidth > 0 &&
              Array.from(new Array(numPages), (el, index) => (
                <div
                  key={`page_wrapper_${index + 1}`}
                  data-page-number={index + 1}
                  className="flex justify-center"
                >
                  <PdfPage
                    pdf={pdf}
                    pageNumber={index + 1}
                    width={containerWidth}
                  />
                </div>
              ))}
          </div>
        </>
      )}
    </section>
  );
}
