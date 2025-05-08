"use client"

import { Pie, PieChart, Tooltip, Legend, Cell, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartTooltipContent, ChartContainer } from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"

const chartData = [
  { name: "Equities", value: 400, fill: "hsl(var(--chart-1))" },
  { name: "Bonds", value: 300, fill: "hsl(var(--chart-2))" },
  { name: "Real Estate", value: 200, fill: "hsl(var(--chart-3))" },
  { name: "Cash", value: 100, fill: "hsl(var(--chart-4))" },
];

const chartConfig = {
  value: { // General key for values if not specified per item
    label: "Value",
  },
  Equities: { label: "Equities", color: "hsl(var(--chart-1))" },
  Bonds: { label: "Bonds", color: "hsl(var(--chart-2))" },
  "Real Estate": { label: "Real Estate", color: "hsl(var(--chart-3))" },
  Cash: { label: "Cash", color: "hsl(var(--chart-4))" },
} satisfies ChartConfig

interface SamplePieChartProps {
  title: string;
  description?: string;
}

export function SamplePieChart({ title, description }: SamplePieChartProps) {
  return (
    <Card className="shadow-lg flex flex-col">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart accessibilityLayer>
            <Tooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
