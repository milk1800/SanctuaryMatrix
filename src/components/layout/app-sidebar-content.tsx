"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Briefcase, BarChartBig, Users, TrendingUp, ClipboardList } from "lucide-react"
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
]

export function AppSidebarContent() {
  const pathname = usePathname()

  return (
    <>
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-2">
          <Briefcase className="h-7 w-7 text-primary" />
          <h1 className="text-xl font-semibold text-foreground group-data-[collapsible=icon]:hidden">
            AdviseAI
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
                      ? "bg-primary/10 text-primary dark:bg-primary/20" 
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <a> {/* <a> tag needed when asChild is true for Link component */}
                    <item.icon className="h-5 w-5" />
                    <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
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
