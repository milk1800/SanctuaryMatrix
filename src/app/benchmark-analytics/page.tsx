import { SampleLineChart } from "@/components/charts/sample-line-chart"
import { SampleDataTable } from "@/components/tables/sample-data-table"
import { SummaryCard } from "@/components/summaries/summary-card"
import { Target, Activity, Sigma } from "lucide-react"

export default function BenchmarkAnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Benchmark Analytics</h1>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard 
          title="Portfolio Alpha (vs S&P 500)" 
          value="1.25%" 
          icon={Target}
          trend="Improving from 0.95% last quarter"
          trendColor="text-green-600 dark:text-green-400"
        />
        <SummaryCard 
          title="Sharpe Ratio" 
          value="0.85" 
          icon={Activity}
          description="Risk-adjusted return"
        />
        <SummaryCard 
          title="Tracking Error" 
          value="3.2%" 
          icon={Sigma}
        />
        <SummaryCard 
          title="Information Ratio" 
          value="0.39" 
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SampleLineChart title="Portfolio vs. S&P 500" description="Comparative performance analysis." />
        <SampleLineChart title="Portfolio vs. Custom Benchmark X" description="Performance against a selected peer group." />
      </div>
      
      <SampleDataTable title="Benchmark Comparison Details" description="Detailed metrics against various benchmarks." />
    </div>
  )
}
