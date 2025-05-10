
import { SummaryCard } from "@/components/summaries/summary-card";
import { SampleDataTable } from "@/components/tables/sample-data-table";
import type { IconName } from "@/components/summaries/summary-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

export default function PortfolioMatrixPage() {
  return (
    <div className="space-y-6">
      <Card className="p-4 shadow-lg backdrop-blur-sm bg-card/80">
        <CardHeader>
          <CardTitle className="text-gradient text-glow-primary">Portfolio Filters & Search</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <Label htmlFor="search-portfolio" className="block font-medium text-muted-foreground mb-2">
                Search Portfolios
              </Label>
              <div className="relative">
                <Input id="search-portfolio" placeholder="Search by name, ID, or client..." className="pr-10" />
                <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
            <div>
              <Label htmlFor="risk-profile-filter" className="block font-medium text-muted-foreground mb-2">
                Filter by Risk Profile
              </Label>
              <Select>
                <SelectTrigger id="risk-profile-filter">
                  <SelectValue placeholder="All Risk Profiles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conservative">Conservative</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="aggressive">Aggressive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="md:self-end">
              <Filter className="mr-2 h-4 w-4" /> Apply Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <SummaryCard
          title="Total Portfolios"
          value="75"
          iconName={"LayoutGrid" as IconName}
          description="Number of distinct portfolios managed"
        />
        <SummaryCard
          title="Avg. Holdings per Portfolio"
          value="22"
          iconName={"List" as IconName}
        />
        <SummaryCard
          title="Overall Model Adherence"
          value="88%"
          iconName={"Target" as IconName} 
        />
      </div>
      
      <SampleDataTable 
        title="Portfolio Matrix Overview" 
        description="Detailed view of all managed portfolios, their compositions, and performance metrics." 
      />

      <Card className="p-4 shadow-lg backdrop-blur-sm bg-card/80">
        <CardHeader>
          <CardTitle className="text-gradient text-glow-primary">Portfolio Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex space-x-4">
            <Button variant="outline">Rebalance Selected</Button>
            <Button>Create New Model</Button>
            <Button variant="destructive">Archive Inactive</Button>
        </CardContent>
      </Card>
    </div>
  );
}
