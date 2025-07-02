"use client";

import type React from "react";
import { useState } from "react";

import {
  ArrowUpRight,
  Link,
  MoreHorizontal,
  Plus,
  StarOff,
  Trash2,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import PdfViewer from "@/components/pdfViewer/PdfViewer";

export function NavDocuments({
  documents,
}: {
  documents: {
    name: string;
    url: string;
    pdfPath: string;
    icon: React.ElementType;
  }[];
}) {
  const { isMobile } = useSidebar();
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDocumentClick = (pdfPath: string) => {
    setSelectedPdf(pdfPath);
    setIsDialogOpen(true);
  };

  return (
    <>
      <SidebarGroup className="group-data-[collapsible=icon]:hidden px-2 mt-6">
        <div className="flex items-center justify-between px-1 mb-3">
          <SidebarGroupLabel className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider">
            Documents
          </SidebarGroupLabel>
          <SidebarGroupAction
            title="Add Document"
            className="size-6 rounded-md hover:bg-sidebar-accent transition-colors duration-200"
          >
            <Plus className="size-3.5" />
            <span className="sr-only">Add Document</span>
          </SidebarGroupAction>
        </div>
        <SidebarMenu className="gap-0.5">
          {documents.map((item) => {
            return (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  onClick={() => handleDocumentClick(item.pdfPath)}
                  className="group/item h-8 px-3 rounded-md transition-all duration-200 hover:bg-sidebar-accent/60 cursor-pointer"
                >
                  <item.icon className="size-3.5 text-sidebar-foreground/60 transition-colors duration-200 group-hover/item:text-sidebar-foreground" />
                  <span className="text-sm text-sidebar-foreground/80 truncate group-hover/item:text-sidebar-foreground transition-colors duration-200">
                    {item.name}
                  </span>
                </SidebarMenuButton>
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuAction
                      showOnHover
                      className="opacity-0 group-hover/item:opacity-100 transition-opacity duration-200"
                    >
                      <MoreHorizontal className="size-3.5" />
                      <span className="sr-only">
                        More options for {item.name}
                      </span>
                    </SidebarMenuAction>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-56 rounded-lg shadow-lg border-sidebar-border"
                    side={isMobile ? "bottom" : "right"}
                    align={isMobile ? "end" : "start"}
                    style={{ zIndex: 9999 }}
                    avoidCollisions={true}
                    collisionPadding={8}
                  >
                    <DropdownMenuItem className="gap-2">
                      <StarOff className="size-4 text-muted-foreground" />
                      <span>Remove from Documents</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="gap-2">
                      <Link className="size-4 text-muted-foreground" />
                      <span>Copy Link</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                      <ArrowUpRight className="size-4 text-muted-foreground" />
                      <span>Open in New Tab</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                      <Trash2 className="size-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            );
          })}
          <SidebarMenuItem>
            <SidebarMenuButton className="h-8 px-3 text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent/40 transition-all duration-200">
              <MoreHorizontal className="size-3.5" />
              <span className="text-sm">More</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-6xl w-[90vw] h-[90vh] grid grid-rows-[auto_1fr] p-0">
          <DialogHeader className="p-3 border-b">
            <DialogTitle className="text-lg font-semibold text-black">
              {selectedPdf &&
                documents.find((doc) => doc.pdfPath === selectedPdf)?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="overflow-hidden">
            {selectedPdf && <PdfViewer selectedPdf={selectedPdf} />}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
