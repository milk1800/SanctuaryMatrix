
import { SampleDataTable } from "@/components/tables/sample-data-table"
import { SummaryCard } from "@/components/summaries/summary-card"
import { SampleBarChart } from "@/components/charts/sample-bar-chart"

export default function PipelineProspectsPage() {
  return (
    <div className="space-y-6">
      {/* <h1 className="text-3xl font-bold tracking-tight text-foreground">Pipeline & Prospects</h1> */}
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard 
          title="Total Prospects" 
          value="78" 
          iconName="Users"
          trend="+12 this quarter"
          trendColor="text-green-600 dark:text-green-400"
        />
        <SummaryCard 
          title="Pipeline Value" 
          value="$2,500,000" 
          iconName="DollarSign"
          description="Estimated AUM"
        />
        <SummaryCard 
          title="Conversion Rate (QTD)" 
          value="15%" 
          iconName="Percent"
        />
         <SummaryCard 
          title="Avg. Time in Pipeline" 
          value="45 Days"
          iconName="Activity"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SampleBarChart title="Prospects by Stage" description="Distribution of prospects in the sales funnel." />
        <SampleBarChart title="Lead Sources" description="Effectiveness of different lead generation channels." />
      </div>
      
      <SampleDataTable title="Active Prospects List" description="Detailed information about current prospects." />
    </div>
  )
}
