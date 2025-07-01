"use client"

import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

// Route configuration for breadcrumbs
const routeConfig: Record<string, { title: string; parent?: string }> = {
  "/": { title: "Dashboard" },
  "/dashboard": { title: "Dashboard" },
  "/overview": { title: "Overview" },
  "/messages": { title: "Messages" },
  "/enquiries": { title: "Enquiries" },
  "/cases": { title: "Cases" },
  "/inbox": { title: "Inbox" },
  "/settings": { title: "Settings" },
  "/templates": { title: "Templates" },
  "/help": { title: "Help" },
  "/searches": { title: "Searches" },
  "/title-report": { title: "Title Report" },
}

function generateBreadcrumbs(pathname: string) {
  const breadcrumbs = [{ title: "7 Blake Street, Buckinghamshire", href: "/" }]

  const route = routeConfig[pathname]
  if (route && pathname !== "/") {
    breadcrumbs.push({ title: route.title, href: pathname })
  }

  return breadcrumbs
}

export function AppHeader() {
  const pathname = usePathname()
  const breadcrumbs = generateBreadcrumbs(pathname)

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.href} className="flex items-center">
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1">{crumb.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <SidebarTrigger className="-mr-1 ml-auto rotate-180" />
    </header>
  )
}
