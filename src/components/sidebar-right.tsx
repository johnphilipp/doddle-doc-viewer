"use client"

import type * as React from "react"
import { Bot, ChevronDown, ExternalLink, User } from "lucide-react"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

const chatMessages = [
  {
    id: 1,
    type: "user",
    content: "What documents do I need for a property purchase?",
    timestamp: "10:30 AM",
  },
  {
    id: 2,
    type: "ai",
    content:
      "For a property purchase, you'll typically need the following key documents: proof of identity, proof of address, mortgage agreement in principle, survey report, and property searches. I can help you create a comprehensive checklist for your specific transaction.",
    timestamp: "10:31 AM",
    references: [
      {
        title: "Property Purchase Checklist - Law Society",
        url: "#",
      },
      {
        title: "Conveyancing Protocol 2019",
        url: "#",
      },
      {
        title: "HM Land Registry Practice Guide",
        url: "#",
      },
    ],
  },
  {
    id: 3,
    type: "user",
    content: "How long does the conveyancing process usually take?",
    timestamp: "10:35 AM",
  },
  {
    id: 4,
    type: "ai",
    content:
      "The conveyancing process typically takes 8-12 weeks from offer acceptance to completion, though this can vary based on the complexity of the transaction, chain length, and any issues that arise during searches or surveys.",
    timestamp: "10:36 AM",
    references: [
      {
        title: "Average Conveyancing Timescales - CQS",
        url: "#",
      },
      {
        title: "Factors Affecting Transaction Speed",
        url: "#",
      },
    ],
  },
  {
    id: 5,
    type: "user",
    content: "Can you help me draft a contract variation?",
    timestamp: "10:40 AM",
  },
  {
    id: 6,
    type: "ai",
    content:
      "I can certainly help you draft a contract variation. I'll need to know the specific terms you want to modify and the reason for the variation. Would you like me to provide a template or guide you through the key clauses that typically need attention?",
    timestamp: "10:41 AM",
    references: [
      {
        title: "Contract Variation Best Practices",
        url: "#",
      },
      {
        title: "Standard Conditions of Sale",
        url: "#",
      },
      {
        title: "Property Law Act 1925 - Variations",
        url: "#",
      },
    ],
  },
]

export function SidebarRight({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-sidebar-primary text-sidebar-primary-foreground">
            <Bot className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Doddle AI Assistant</span>
            <span className="text-xs text-sidebar-foreground/70">Online</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-0">
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-4 py-4">
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.type === "ai" && (
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-sidebar-primary text-sidebar-primary-foreground flex-shrink-0 mt-1">
                    <Bot className="w-3 h-3" />
                  </div>
                )}

                <div className={`max-w-[80%] ${message.type === "user" ? "order-2" : ""}`}>
                  <div
                    className={`rounded-lg px-3 py-2 text-sm ${
                      message.type === "user"
                        ? "bg-sidebar-primary text-sidebar-primary-foreground ml-auto"
                        : "bg-sidebar-accent text-sidebar-accent-foreground"
                    }`}
                  >
                    {message.content}
                  </div>

                  {message.type === "ai" && message.references && (
                    <div className="mt-2">
                      <Collapsible>
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2 text-xs text-sidebar-foreground/70 hover:text-sidebar-foreground"
                          >
                            References
                            <ChevronDown className="w-3 h-3 ml-1" />
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-1">
                          <div className="space-y-1 pl-2 border-l-2 border-sidebar-border">
                            {message.references.map((ref, index) => (
                              <a
                                key={index}
                                href={ref.url}
                                className="flex items-center gap-1 text-xs text-sidebar-foreground/70 hover:text-sidebar-foreground hover:underline"
                              >
                                <ExternalLink className="w-3 h-3" />
                                {ref.title}
                              </a>
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  )}

                  <div
                    className={`text-xs text-sidebar-foreground/50 mt-1 ${
                      message.type === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    {message.timestamp}
                  </div>
                </div>

                {message.type === "user" && (
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-sidebar-accent text-sidebar-accent-foreground flex-shrink-0 mt-1 order-1">
                    <User className="w-3 h-3" />
                  </div>
                )}
              </div>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              <div className="text-xs text-sidebar-foreground/50 px-1">Suggested prompts:</div>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start h-auto py-2 px-3 text-xs text-left whitespace-normal bg-transparent"
                >
                  Draft title report
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start h-auto py-2 px-3 text-xs text-left whitespace-normal bg-transparent"
                >
                  Identify key risks
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start h-auto py-2 px-3 text-xs text-left whitespace-normal bg-transparent"
                >
                  Raise enquiries
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <div className="flex gap-2">
          <Input placeholder="Ask Doddle AI anything..." className="flex-1 h-9 text-sm" />
          <Button size="sm" className="px-3">
            Send
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
