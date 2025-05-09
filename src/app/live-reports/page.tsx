
import { SampleDataTable } from "@/components/tables/sample-data-table"
import { SummaryCard } from "@/components/summaries/summary-card"
import { Button } from "@/components/ui/button"
import { DownloadCloud, RefreshCw } from "lucide-react"

export default function LiveReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start space-y-2 sm:flex-row sm:items-center sm:justify-end sm:space-y-0 sm:space-x-2">
        {/* Title moved to DashboardHeader */}
        {/* Buttons moved to the right */}
        <Button variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Data
        </Button>
        <Button>
          <DownloadCloud className="mr-2 h-4 w-4" />
          Export All
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <SummaryCard 
          title="Generated Reports Today" 
          value="12" 
          iconName="FileText"
          trend="+3 since yesterday"
          trendColor="text-green-600 dark:text-green-400"
        />
        <SummaryCard 
          title="Pending Reports" 
          value="2" 
          iconName="Activity"
          description="Reports currently being generated"
        />
        <SummaryCard 
          title="Total Stored Reports" 
          value="458" 
          iconName="Archive"
        />
      </div>
      
      {/* Placeholder for report generation options or filters */}
      <div className="p-6 bg-card border rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-card-foreground">Generate New Report</h2>
        <p className="text-sm text-muted-foreground">
          Select report type and parameters to generate a new live report. 
          This section can be expanded with form elements for report generation.
        </p>
        <Button className="mt-4">Configure Report</Button>
      </div>

      <SampleDataTable title="Recent Live Reports" description="List of recently generated or accessed reports." />
    </div>
  )
}

// Add 'Archive' and 'FileText' to the icon map if they don't exist
// Note: This would typically be done in summary-card.tsx, but for brevity in this response:
// Assuming 'Archive' and 'FileText' are valid IconName values or added to the map.
// IconName="Archive"
// IconName="FileText"
// If not, you would need to add them like:
// import { Archive, FileText, /* other icons */ } from "lucide-react"
// const iconComponentsMap: Record<string, LucideIcon> = {
//   ...,
//   Archive,
//   FileText,
// };
// export type IconName = keyof typeof iconComponentsMap;
