"use client";

import type * as React from "react";
import {
  Blocks,
  Home,
  Inbox,
  MessageCircleQuestion,
  Settings2,
  User,
  HelpCircle,
  Search,
  FileText,
  ScrollText,
  MessageSquare,
  BarChart3,
} from "lucide-react";

import { NavActions } from "@/components/nav-actions";
import { NavDocuments } from "@/components/nav-documents";
import { NavSecondary } from "@/components/nav-secondary";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Cases",
      url: "/cases",
      icon: User,
    },
    {
      title: "Inbox",
      url: "/inbox",
      icon: Inbox,
      badge: "10",
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
    },
    {
      title: "Templates",
      url: "/templates",
      icon: Blocks,
    },
    {
      title: "Help",
      url: "/help",
      icon: MessageCircleQuestion,
    },
  ],
  actions: [
    {
      name: "Overview",
      url: "/overview",
      icon: BarChart3,
    },
    {
      name: "Messages",
      url: "/messages",
      icon: MessageSquare,
    },
    {
      name: "Enquiries",
      url: "/enquiries",
      icon: HelpCircle,
    },
    {
      name: "Searches",
      url: "/searches",
      icon: Search,
    },
    {
      name: "Title Report",
      url: "/title-report",
      icon: ScrollText,
    },
  ],
  documents: [
    {
      name: "Search Report-ELB2025051213063995.pdf",
      url: "/documents/search-report",
      pdfPath: "/pdfs/Search Report-ELB2025051213063995.pdf",
      icon: FileText,
    },
    {
      name: "LEASE CONTRACT REPORT-JLC20250514182245057.pdf",
      url: "/documents/lease-contract",
      pdfPath: "/pdfs/LEASE CONTRACT REPORT-JLC20250514182245057.pdf",
      icon: FileText,
    },
    {
      name: "LPE1 NEW -  7 Blake St-JLC2025051418224568.pdf",
      url: "/documents/lpe1",
      pdfPath: "/pdfs/LPE1 NEW -  7 Blake St-JLC2025051418224568.pdf",
      icon: FileText,
    },
    {
      name: "1708.08021v2.pdf",
      url: "/documents/1708.08021v2",
      pdfPath: "/pdfs/1708.08021v2.pdf",
      icon: FileText,
    },
  ],
};

function CaseHeader() {
  return (
    <div className="px-4 py-4 border-b border-sidebar-border/50">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider">
          Active Case
        </span>
      </div>
      <div className="space-y-1">
        <h2 className="text-base font-bold text-sidebar-foreground leading-tight">
          7 Blake Street
        </h2>
        <p className="text-sm text-sidebar-foreground/70">Buckinghamshire</p>
        <div className="flex items-center gap-2 mt-2">
          <div className="h-1.5 bg-sidebar-border rounded-full flex-1 overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full w-3/4 transition-all duration-500" />
          </div>
          <span className="text-xs text-sidebar-foreground/60 font-medium">
            75%
          </span>
        </div>
      </div>
    </div>
  );
}

export function SidebarLeft({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0 z-40" {...props}>
      <SidebarHeader className="p-3 border-b border-sidebar-border/50">
        <TeamSwitcher navMain={data.navMain} />
      </SidebarHeader>
      <SidebarContent className="px-0">
        <CaseHeader />
        <div className="flex-1 py-4">
          <NavActions actions={data.actions} />
          <NavDocuments documents={data.documents} />
        </div>
        <div className="border-t border-sidebar-border/50 p-2">
          <NavSecondary items={data.navSecondary} />
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
