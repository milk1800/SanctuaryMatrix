"use client"

import type { ReactNode } from "react"
import { SidebarProvider, Sidebar } from "@/components/ui/sidebar"
import { AppSidebarContent } from './app-sidebar-content'
import { DashboardHeader } from './dashboard-header'

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen bg-background">
        <Sidebar collapsible="icon" className="border-r bg-sidebar text-sidebar-foreground hidden md:flex"> {/* Hidden on mobile, DashboardHeader has trigger */}
          <AppSidebarContent />
        </Sidebar>
         {/* Mobile sidebar is handled by Sheet in ui/sidebar.tsx, triggered by SidebarTrigger in DashboardHeader */}
        <div className="flex flex-1 flex-col">
          <DashboardHeader />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
