import { SampleBarChart } from "@/components/charts/sample-bar-chart"
import { SampleLineChart } from "@/components/charts/sample-line-chart"
import { SampleDataTable } from "@/components/tables/sample-data-table"
import { SummaryCard } from "@/components/summaries/summary-card"

export default function AssetAnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Asset Analytics</h1>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard 
          title="Total Assets Under Management" 
          value="$12,345,678" 
          iconName="DollarSign"
          trend="+2.5% from last month"
          trendColor="text-green-600 dark:text-green-400"
        />
        <SummaryCard 
          title="YTD Return" 
          value="7.8%" 
          iconName="TrendingUp"
          trend="-0.5% from last quarter"
          trendColor="text-red-600 dark:text-red-400"
        />
        <SummaryCard 
          title="Number of Holdings" 
          value="128" 
        />
        <SummaryCard 
          title="Average Asset Age" 
          value="3.2 Years" 
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SampleBarChart title="Asset Allocation by Type" description="Distribution of assets across different categories." />
        <SampleLineChart title="Portfolio Performance Over Time" description="Growth of a $10,000 investment." />
      </div>
      
      <SampleDataTable title="Top Performing Assets" description="Assets with the highest returns year-to-date." />
    </div>
  )
}
