
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
          <Briefcase className="h-7 w-7 text-primary" /> {/* Uses main primary color, Teal */}
          <h1 className="text-xl font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden"> {/* Uses sidebar-foreground (now light gray) */}
            Analytics AI
          </h1>
        </Link>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))}
                  tooltip={{children: item.label, className: "ml-2"}}
                  className={cn(
                    "justify-start",
                     pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                      ? "bg-sidebar-accent text-sidebar-accent-foreground dark:bg-primary/20 dark:text-primary" // Active: use sidebar-accent for bg, sidebar-accent-foreground for text in light mode
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" // Inactive: uses new sidebar-foreground, hover uses sidebar-accent and sidebar-accent-foreground
                  )}
                >
                  <a> {/* <a> tag needed when asChild is true for Link component */}
                    <item.icon className="h-5 w-5" />
                    <span className="group-data-[collapsible=icon]:hidden text-lg font-semibold">{item.label}</span> {/* Updated font size and weight */}
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  )
}

