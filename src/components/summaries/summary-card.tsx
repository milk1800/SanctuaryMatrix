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
  List, // Added List icon
  ArrowDownCircle, // Added ArrowDownCircle icon
  ArrowUpCircle,   // Added ArrowUpCircle icon
  type LucideIcon 
} from "lucide-react"

// Map icon names (strings) to actual Lucide icon components
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
};

export type IconName = keyof typeof iconComponentsMap;

interface SummaryCardProps {
  title: string
  value: string
  iconName?: IconName
  description?: string
  trend?: string
  trendColor?: "text-green-600 dark:text-green-400" | "text-red-600 dark:text-red-400"
}

export function SummaryCard({ title, value, iconName, description, trend, trendColor }: SummaryCardProps) {
  const IconComponent = iconName ? iconComponentsMap[iconName] : null;

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {IconComponent && <IconComponent className="h-5 w-5 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground">{value}</div>
        {description && <p className="text-xs text-muted-foreground pt-1">{description}</p>}
        {trend && <p className={`text-xs ${trendColor || 'text-muted-foreground'} pt-1`}>{trend}</p>}
      </CardContent>
    </Card>
  )
}
