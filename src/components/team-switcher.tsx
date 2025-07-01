"use client"

import type * as React from "react"
import { ChevronDown } from "lucide-react"
import { Home } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

export function TeamSwitcher({
  navMain,
}: {
  navMain: {
    title: string
    url: string
    icon: React.ElementType
    isActive?: boolean
    badge?: string
  }[]
}) {
  const pathname = usePathname()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="w-full px-3 py-2 h-12 hover:bg-sidebar-accent/80 transition-all duration-200 group">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground shadow-sm group-hover:shadow-md transition-shadow duration-200">
                <Home className="size-4" />
              </div>
              <div className="flex flex-col items-start flex-1 min-w-0">
                <span className="truncate font-semibold text-sidebar-foreground">Doddle AI</span>
                <span className="text-xs text-sidebar-foreground/60">Conveyancing Assistant</span>
              </div>
              <ChevronDown className="size-4 opacity-60 group-hover:opacity-100 transition-opacity duration-200" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-64 rounded-lg shadow-lg border-sidebar-border"
            align="start"
            side="bottom"
            sideOffset={4}
            style={{ zIndex: 9999 }}
            avoidCollisions={true}
            collisionPadding={8}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground font-medium">Navigation</DropdownMenuLabel>
            {navMain.map((item) => {
              const isActive = pathname === item.url
              return (
                <DropdownMenuItem
                  key={item.title}
                  className={`gap-3 p-3 transition-colors duration-200 ${
                    isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
                  }`}
                  asChild
                >
                  <Link href={item.url} className="flex items-center gap-3 w-full">
                    <div
                      className={`flex size-8 items-center justify-center rounded-lg border transition-all duration-200 ${
                        isActive
                          ? "bg-sidebar-primary text-sidebar-primary-foreground border-sidebar-primary shadow-sm"
                          : "border-sidebar-border hover:border-sidebar-primary/20"
                      }`}
                    >
                      <item.icon className="size-4 shrink-0" />
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className={`font-medium truncate ${isActive ? "text-sidebar-accent-foreground" : ""}`}>
                        {item.title}
                      </span>
                      {item.badge && <span className="text-xs text-sidebar-foreground/60">{item.badge} items</span>}
                    </div>
                    {isActive && <div className="w-2 h-2 rounded-full bg-sidebar-primary flex-shrink-0" />}
                  </Link>
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
