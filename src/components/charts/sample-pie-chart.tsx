"use client"

import { Pie, PieChart, Tooltip, Legend, Cell } from "recharts" // ResponsiveContainer removed, Cell added
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartTooltipContent, ChartContainer } from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"

const chartData = [
  { name: "Equities", value: 400, fill: "hsl(var(--chart-1))" }, // Cyan
  { name: "Bonds", value: 300, fill: "hsl(var(--chart-2))" },    // Purple
  { name: "Real Estate", value: 200, fill: "hsl(var(--chart-3))" }, // Pink
  { name: "Cash", value: 100, fill: "hsl(var(--chart-4))" },    // Lighter Cyan
];

const chartConfig = {
  value: { 
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
    <Card className="shadow-lg flex flex-col backdrop-blur-sm bg-card/80">
      <CardHeader>
        <CardTitle className="text-gradient text-glow-primary">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart accessibilityLayer>
            <Tooltip content={<ChartTooltipContent hideLabel />} cursor={{ fill: 'hsl(var(--accent) / 0.1)' }}/>
            <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} labelLine={false} label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
              const RADIAN = Math.PI / 180;
              const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);
              return (
                <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize="12px">
                  {`${(percent * 100).toFixed(0)}%`}
                </text>
              );
            }}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} stroke={entry.fill} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}