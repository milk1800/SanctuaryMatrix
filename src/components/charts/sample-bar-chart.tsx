
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Defs, LinearGradient, Stop } from "recharts"
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
    color: "hsl(var(--chart-1))", // Teal - Used for legend/tooltip
  },
  "Fixed Income": {
    label: "Fixed Income",
    color: "hsl(var(--chart-2))", // Blue - Used for legend/tooltip
  },
  Alternatives: {
    label: "Alternatives",
    color: "hsl(var(--chart-3))", // Violet - Used for legend/tooltip
  },
  Cash: {
    label: "Cash",
    color: "hsl(var(--chart-4))", // Lighter Teal - Used for legend/tooltip
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
            <defs>
              <linearGradient id="barFillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00F5D4" /> {/* Teal */}
                <stop offset="50%" stopColor="#3A86FF" /> {/* Blue */}
                <stop offset="100%" stopColor="#8338EC" /> {/* Purple */}
              </linearGradient>
            </defs>
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
            <Bar dataKey="Equity" fill="url(#barFillGradient)" radius={4} />
            <Bar dataKey="Fixed Income" fill="url(#barFillGradient)" radius={4} />
            <Bar dataKey="Alternatives" fill="url(#barFillGradient)" radius={4} />
            <Bar dataKey="Cash" fill="url(#barFillGradient)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

