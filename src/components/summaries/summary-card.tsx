"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DollarSign,
  TrendingUp,
  Target,
  Activity,
  Sigma,
  Users,
  UserPlus,
  UserMinus,
  CreditCard,
  TrendingDown,
  Percent,
  Archive,
  FileText,
  List, 
  ArrowDownCircle, 
  ArrowUpCircle,
  PieChart, 
  Layers, 
  type LucideIcon 
} from "lucide-react"
import { cn } from "@/lib/utils";


const iconComponentsMap: Record<string, LucideIcon> = {
  DollarSign,
  TrendingUp,
  Target,
  Activity,
  Sigma,
  Users,
  UserPlus,
  UserMinus,
  CreditCard,
  TrendingDown,
  Percent,
  Archive,
  FileText,
  List,
  ArrowDownCircle,
  ArrowUpCircle,
  PieChart,
  Layers, 
};

export type IconName = keyof typeof iconComponentsMap;

interface SummaryCardProps {
  title: string
  value: string
  iconName?: IconName
  description?: string
  trend?: string
  trendColor?: "text-green-500" | "text-red-500" // Adjusted for better visibility on dark bg
}

export function SummaryCard({ title, value, iconName, description, trend, trendColor }: SummaryCardProps) {
  const IconComponent = iconName ? iconComponentsMap[iconName] : null;

  return (
    <Card className="shadow-lg backdrop-blur-sm bg-card/80">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium text-muted-foreground"> {/* Changed from text-sm to text-lg */}
          {title}
        </CardTitle>
        {IconComponent && <IconComponent className={cn("h-5 w-5 text-primary icon-glow-primary")} />}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground">{value}</div>
        {description && <p className="text-sm text-muted-foreground pt-1">{description}</p>} {/* Changed from text-xs to text-sm */}
        {trend && <p className={`text-sm ${trendColor || 'text-muted-foreground'} pt-1`}>{trend}</p>} {/* Changed from text-xs to text-sm */}
      </CardContent>
    </Card>
  )
}
