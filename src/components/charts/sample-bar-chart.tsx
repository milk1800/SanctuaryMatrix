"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartTooltipContent, ChartContainer } from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"

const chartData = [
  {
    category: "Allocation", 
    Equity: 400000,
    "Fixed Income": 300000,
    Alternatives: 200000,
    Cash: 100000,
  },
];

const chartConfig = {
  Equity: {
    label: "Equity",
    color: "hsl(var(--chart-1))", // Teal
  },
  "Fixed Income": {
    label: "Fixed Income",
    color: "hsl(var(--chart-2))", // Blue
  },
  Alternatives: {
    label: "Alternatives",
    color: "hsl(var(--chart-3))", // Violet
  },
  Cash: {
    label: "Cash",
    color: "hsl(var(--chart-4))", // Lighter Teal
  },
} satisfies ChartConfig;

interface SampleBarChartProps {
  title: string;
  description?: string;
}

export function SampleBarChart({ title, description }: SampleBarChartProps) {
  return (
    <Card className="shadow-lg backdrop-blur-sm bg-card/80">
      <CardHeader>
        <CardTitle className="text-gradient text-glow-primary">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={chartData} accessibilityLayer>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
            <XAxis
              dataKey="category" 
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip content={<ChartTooltipContent />} cursor={{ fill: 'hsl(var(--accent) / 0.1)' }} />
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
