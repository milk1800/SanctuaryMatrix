import { SampleLineChart } from "@/components/charts/sample-line-chart"
import { SampleBarChart } from "@/components/charts/sample-bar-chart"
import { SampleDataTable } from "@/components/tables/sample-data-table"
import { SummaryCard } from "@/components/summaries/summary-card"

export default function FinancialAnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Financial Analytics</h1>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard 
          title="Total Revenue (YTD)" 
          value="$1,250,000" 
          iconName="CreditCard"
          trend="+8.2% vs last year"
          trendColor="text-green-600 dark:text-green-400"
        />
        <SummaryCard 
          title="Total Expenses (YTD)" 
          value="$450,000" 
          iconName="TrendingDown"
          trend="+3.1% vs last year"
          trendColor="text-red-600 dark:text-red-400"
        />
        <SummaryCard 
          title="Net Profit Margin" 
          value="64%" 
          iconName="Percent"
        />
        <SummaryCard 
          title="Average Revenue per Client" 
          value="$5,252" 
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SampleLineChart title="Revenue & Expenses Over Time" description="Monthly trends for revenue and expenses." />
        <SampleBarChart title="Expense Breakdown by Category" description="Distribution of operational expenses." />
      </div>
      
      <SampleDataTable title="Profit & Loss Statement Summary" description="Key figures from the P&L statement." />
    </div>
  )
}
