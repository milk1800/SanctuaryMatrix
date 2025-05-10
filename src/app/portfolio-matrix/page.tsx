
"use client";

import React, { useState } from 'react';
import { SummaryCard } from "@/components/summaries/summary-card";
import { SampleDataTable } from "@/components/tables/sample-data-table";
import type { IconName } from "@/components/summaries/summary-card";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Filter, Loader2, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { analyzePortfolioByAccountNumber, type AnalyzePortfolioOutput, type PortfolioPosition } from '@/ai/flows/analyze-portfolio-flow';
import { PositionAnalysisCard } from '@/components/portfolio/position-analysis-card';

export default function PortfolioMatrixPage() {
  const [accountNumber, setAccountNumber] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalyzePortfolioOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyzePortfolio = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountNumber.trim()) {
      setError("Please enter an account number.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzePortfolioByAccountNumber({ accountNumber });
      setAnalysisResult(result);
    } catch (err) {
      console.error("Error analyzing portfolio:", err);
      setError("Failed to analyze portfolio. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-4 shadow-lg backdrop-blur-sm bg-card/80">
        <CardHeader>
          <CardTitle className="text-gradient text-glow-primary">Portfolio Analysis Engine</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleAnalyzePortfolio} className="space-y-4">
            <div>
              <Label htmlFor="account-number" className="block font-medium text-muted-foreground mb-2">
                Enter Client Account Number
              </Label>
              <div className="flex gap-2">
                <Input
                  id="account-number"
                  placeholder="e.g., ACC123456789"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="flex-grow"
                  disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Analyze Portfolio"
                  )}
                </Button>
              </div>
            </div>
          </form>
          {error && (
            <Alert variant="destructive" className="mt-4">
              <Info className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex justify-center items-center p-8">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="ml-4 text-lg text-muted-foreground">AI is analyzing the portfolio, please wait...</p>
        </div>
      )}

      {analysisResult && (
        <Card className="shadow-lg backdrop-blur-sm bg-card/80">
          <CardHeader>
            <CardTitle className="text-gradient text-glow-primary">
              Portfolio Analysis for Account: {analysisResult.accountNumber}
            </CardTitle>
            <CardDescription>{analysisResult.portfolioSummary}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {analysisResult.positions.map((position, index) => (
              <PositionAnalysisCard key={index} position={position} />
            ))}
          </CardContent>
        </Card>
      )}

      {!isLoading && !analysisResult && (
         <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <SummaryCard
              title="Total Portfolios"
              value="75"
              iconName={"LayoutGrid" as IconName}
              description="Number of distinct portfolios managed"
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
            idColumnHeader="Ticker" // Pass "Ticker" as the header for the ID column
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
        </>
      )}
    </div>
  );
}

