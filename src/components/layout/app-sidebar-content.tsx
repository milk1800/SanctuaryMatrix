"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Briefcase, BarChartBig, Users, TrendingUp, ClipboardList, Filter, FileText } from "lucide-react"
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/asset-analytics", label: "Asset Analytics", icon: BarChartBig },
  { href: "/client-analytics", label: "Client Analytics", icon: Users },
  { href: "/financial-analytics", label: "Financial Analytics", icon: TrendingUp },
  { href: "/benchmark-analytics", label: "Benchmark Analytics", icon: ClipboardList },
  { href: "/pipeline-prospects", label: "Pipeline & Prospects", icon: Filter },
  { href: "/live-reports", label: "LiveReports", icon: FileText },
]

export function AppSidebarContent() {
  const pathname = usePathname()

  return (
    <>
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-2">
          <Briefcase className="h-7 w-7 text-primary icon-glow-primary" /> 
          <h1 className="text-xl font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden"> 
            Sanctuary Matrix
          </h1>
        </Link>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={{children: item.label, className: "ml-2"}}
                    className={cn(
                      "justify-start text-sidebar-foreground",
                       isActive
                        ? "bg-gradient-to-r from-gradient-1 via-gradient-2 to-gradient-3 text-primary-foreground" 
                        : "hover:bg-gradient-to-r hover:from-gradient-1/70 hover:via-gradient-2/70 hover:to-gradient-3/70 hover:text-primary-foreground"
                    )}
                  >
                    <a> 
                      <item.icon className={cn("h-5 w-5", isActive ? "text-primary-foreground" : "text-primary icon-glow-primary")} />
                      <span className={cn(
                        "group-data-[collapsible=icon]:hidden text-lg font-semibold",
                        isActive ? "text-primary-foreground" : "text-sidebar-foreground"
                      )}>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            )}
          )}
        </SidebarMenu>
      </SidebarContent>
    </>
  )
}
