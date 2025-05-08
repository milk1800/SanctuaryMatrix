"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartTooltipContent, ChartContainer } from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"

const chartData = [
  { date: "2024-01", value1: 50, value2: 70 },
  { date: "2024-02", value1: 60, value2: 80 },
  { date: "2024-03", value1: 75, value2: 65 },
  { date: "2024-04", value1: 90, value2: 100 },
  { date: "2024-05", value1: 85, value2: 95 },
  { date: "2024-06", value1: 100, value2: 110 },
];

const chartConfig = {
  value1: {
    label: "Series A",
    color: "hsl(var(--chart-1))",
  },
  value2: {
    label: "Series B",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface SampleLineChartProps {
  title: string;
  description?: string;
}

export function SampleLineChart({ title, description }: SampleLineChartProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart data={chartData} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => new Date(value + '-01').toLocaleDateString('en-US', { month: 'short' })}
            />
            <YAxis />
            <Tooltip content={<ChartTooltipContent />} />
            <Legend />
            <Line type="monotone" dataKey="value1" stroke="var(--color-value1)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="value2" stroke="var(--color-value2)" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
