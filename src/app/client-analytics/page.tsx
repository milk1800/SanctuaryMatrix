
import { SamplePieChart } from "@/components/charts/sample-pie-chart"
import { SampleBarChart } from "@/components/charts/sample-bar-chart"
import { SampleDataTable } from "@/components/tables/sample-data-table"
import { SummaryCard } from "@/components/summaries/summary-card"

export default function ClientAnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* <h1 className="text-3xl font-bold tracking-tight text-foreground">Client Analytics</h1> */}
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard 
          title="Total Active Clients" 
          value="238" 
          iconName="Users"
          trend="+5 new clients this month"
          trendColor="text-green-600 dark:text-green-400"
        />
        <SummaryCard 
          title="Average AUM per Client" 
          value="$51,872" 
          iconName="UserPlus"
        />
        <SummaryCard 
          title="Client Retention Rate" 
          value="92%" 
          description="Over the last 12 months"
        />
         <SummaryCard 
          title="New vs. Lost Clients (QTD)" 
          value="15 / 3"
          iconName="UserMinus" 
          description="New clients / Lost clients"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SamplePieChart title="Client Segmentation by AUM" description="Distribution of clients by their asset size." />
        <SampleBarChart title="Client Acquisition Channels" description="Effectiveness of different channels in acquiring new clients." />
      </div>
      
      <SampleDataTable title="Key Client Metrics" description="Overview of important client data points." />
    </div>
  )
}
