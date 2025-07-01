"use client"

import type React from "react"

import { ArrowUpRight, Link, MoreHorizontal, StarOff, Trash2 } from "lucide-react"
import { usePathname } from "next/navigation"
import NextLink from "next/link"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavActions({
  actions,
}: {
  actions: {
    name: string
    url: string
    icon: React.ElementType
  }[]
}) {
  const { isMobile } = useSidebar()
  const pathname = usePathname()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden px-2">
      <SidebarMenu className="gap-1">
        {actions.map((item) => {
          const isActive = pathname === item.url
          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                isActive={isActive}
                className="group/item h-9 px-3 rounded-lg transition-all duration-200 hover:bg-sidebar-accent/80 hover:shadow-sm data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground data-[active=true]:shadow-sm"
              >
                <NextLink href={item.url} title={item.name}>
                  <item.icon className="size-4 transition-transform duration-200 group-hover/item:scale-110" />
                  <span className="font-medium">{item.name}</span>
                </NextLink>
              </SidebarMenuButton>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction
                    showOnHover
                    className="opacity-0 group-hover/item:opacity-100 transition-opacity duration-200"
                  >
                    <MoreHorizontal className="size-4" />
                    <span className="sr-only">More options for {item.name}</span>
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
                    <span>Remove from Actions</span>
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
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
