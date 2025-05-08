"use client";

import { useState } from 'react';
import { SampleBarChart } from "@/components/charts/sample-bar-chart";
import { SampleLineChart } from "@/components/charts/sample-line-chart";
import { SampleDataTable } from "@/components/tables/sample-data-table";
import { SummaryCard } from "@/components/summaries/summary-card";
import type { IconName } from "@/components/summaries/summary-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card } from '@/components/ui/card';

export default function AssetAnalyticsPage() {
  const [selectedAdvisor, setSelectedAdvisor] = useState<string>("bajorek");
  const [selectedCustodian, setSelectedCustodian] = useState<string>("pershing");

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Asset Analytics</h1>
      
      <Card className="p-4 shadow-lg">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="advisor-filter" className="block text-sm font-medium text-muted-foreground mb-2">
              Filter by Advisor
            </Label>
            <Select value={selectedAdvisor} onValueChange={setSelectedAdvisor}>
              <SelectTrigger id="advisor-filter" className="w-full">
                <SelectValue placeholder="Select an Advisor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bajorek">Bajorek Wealth Management</SelectItem>
                <SelectItem value="einstein">Einstein Asset Management</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="custodian-filter" className="block text-sm font-medium text-muted-foreground mb-2">
              Filter by Custodian
            </Label>
            <Select value={selectedCustodian} onValueChange={setSelectedCustodian}>
              <SelectTrigger id="custodian-filter" className="w-full">
                <SelectValue placeholder="Select a Custodian" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pershing">Pershing</SelectItem>
                <SelectItem value="schwab">Charles Schwab</SelectItem>
                <SelectItem value="fidelity">Fidelity</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard 
          title="Total Assets Under Management" 
          value="$12,345,678" 
          iconName={"DollarSign" as IconName}
          trend="+2.5% from last month"
          trendColor="text-green-600 dark:text-green-400"
        />
        <SummaryCard 
          title="YTD Return" 
          value="7.8%" 
          iconName={"TrendingUp" as IconName}
          trend="-0.5% from last quarter"
          trendColor="text-red-600 dark:text-red-400"
        />
        <SummaryCard 
          title="Number of Holdings" 
          value="128" 
          iconName={"Archive" as IconName}
        />
        <SummaryCard 
          title="Average Asset Age" 
          value="3.2 Years" 
          iconName={"Activity" as IconName}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SampleBarChart title="Asset Allocation by Type" description="Distribution of assets across different categories." />
        <SampleLineChart title="Portfolio Performance Over Time" description="Growth of a $10,000 investment." />
      </div>
      
      <SampleDataTable title="Top Performing Assets" description="Assets with the highest returns year-to-date." />
    </div>
  )
}