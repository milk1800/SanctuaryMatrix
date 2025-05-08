
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartTooltipContent, ChartContainer } from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"

const chartData = [
  {
    category: "Allocation", // Represents a single group of bars for asset allocation
    Equity: 400000,
    "Fixed Income": 300000,
    Alternatives: 200000,
    Cash: 100000,
  },
  // Add more objects here if you want to compare allocations, e.g., for different time periods or portfolios
  // Example: { category: "Benchmark", Equity: 500000, "Fixed Income": 250000, Alternatives: 150000, Cash: 100000 }
];

const chartConfig = {
  Equity: {
    label: "Equity",
    color: "hsl(var(--chart-1))",
  },
  "Fixed Income": {
    label: "Fixed Income",
    color: "hsl(var(--chart-2))",
  },
  Alternatives: {
    label: "Alternatives",
    color: "hsl(var(--chart-3))",
  },
  Cash: {
    label: "Cash",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

interface SampleBarChartProps {
  title: string;
  description?: string;
}

export function SampleBarChart({ title, description }: SampleBarChartProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={chartData} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category" // Changed from "month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              // Tick formatter can be simple if "category" is descriptive enough
              // tickFormatter={(value) => value.slice(0, 3)} // Remove or adjust if category names are short
            />
            <YAxis />
            <Tooltip content={<ChartTooltipContent />} />
            <Legend />
            <Bar dataKey="Equity" fill="var(--color-Equity)" radius={4} />
            <Bar dataKey="Fixed Income" fill="var(--color-Fixed Income)" radius={4} />
            <Bar dataKey="Alternatives" fill="var(--color-Alternatives)" radius={4} />
            <Bar dataKey="Cash" fill="var(--color-Cash)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
