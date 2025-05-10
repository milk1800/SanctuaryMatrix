
"use client"

import { usePathname } from "next/navigation"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

const pageTitles: Record<string, string> = {
  "/asset-analytics": "Asset Analytics",
  "/client-analytics": "Client Analytics",
  "/financial-analytics": "Financial Analytics",
  "/benchmark-analytics": "Benchmark Analytics",
  "/pipeline-prospects": "Pipeline & Prospects",
  "/live-reports": "LiveReports",
  "/portfolio-matrix": "Portfolio Matrix",
  "/": "Dashboard" // Fallback or default title
};

export function DashboardHeader() {
  const pathname = usePathname()
  const currentTitle = pageTitles[pathname] || "Sanctuary Matrix" // Default title if path not found

  return (
    <header className={cn(
      "sticky top-0 z-10 flex items-center justify-between border-b bg-background/80 px-4 backdrop-blur sm:px-6",
      "h-20" // Consistent header height for all pages
    )}>
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <h1 className={cn(
          "font-bold text-gradient text-glow-primary",
          "text-4xl" // Consistent large font size for all page titles
        )}>{currentTitle}</h1>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        {/* User avatar/menu can be added here later */}
      </div>
    </header>
  )
}

