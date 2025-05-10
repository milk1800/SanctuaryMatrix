
"use client";

import type { PortfolioPosition } from '@/ai/flows/analyze-portfolio-flow';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  Newspaper,
  TrendingUp,
  TrendingDown,
  ShieldAlert,
  Target,
  Lightbulb,
  MessageSquareText, // Using MessageSquareText for AI Summary
  BarChartHorizontalBig, // Using BarChartHorizontalBig for Analyst Sentiment
  DollarSign,
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PositionAnalysisCardProps {
  position: PortfolioPosition;
}

const getRiskColor = (riskLevel: PortfolioPosition['riskLevel']) => {
  switch (riskLevel) {
    case 'Low': return 'bg-green-500/20 text-green-400 border-green-500/50';
    case 'Medium':
    case 'Moderate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
    case 'High': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
    case 'Very High': return 'bg-red-500/20 text-red-400 border-red-500/50';
    default: return 'bg-muted text-muted-foreground border-border';
  }
};

const getSentimentColor = (sentiment: PortfolioPosition['analystSentiment']) => {
  switch (sentiment) {
    case 'Strong Buy':
    case 'Buy':
    case 'Outperform':
      return 'bg-green-500/20 text-green-400 border-green-500/50';
    case 'Hold':
    case 'Neutral':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
    case 'Sell':
    case 'Underperform':
      return 'bg-red-500/20 text-red-400 border-red-500/50';
    default: return 'bg-muted text-muted-foreground border-border';
  }
};


export function PositionAnalysisCard({ position }: PositionAnalysisCardProps) {
  return (
    <Card className="shadow-md backdrop-blur-sm bg-card/90 border border-border/50 overflow-hidden">
      <CardHeader className="border-b border-border/30 pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl text-gradient text-glow-primary">
              {position.ticker} - {position.companyName}
            </CardTitle>
            <CardDescription className="text-lg">
              Value: <span className="font-semibold text-foreground">{position.currentValue}</span> ({position.quantity} shares @ {position.currentPrice})
            </CardDescription>
          </div>
          <Badge className={cn("text-sm px-3 py-1", getRiskColor(position.riskLevel))}>
            <ShieldAlert className="mr-2 h-4 w-4" /> {position.riskLevel} Risk
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-muted-foreground mb-1 flex items-center"><Target className="mr-2 h-5 w-5 text-primary" /> Analyst Sentiment & Targets</h4>
            <Badge className={cn("text-sm mb-2", getSentimentColor(position.analystSentiment))}>
                <BarChartHorizontalBig className="mr-2 h-4 w-4" />{position.analystSentiment}
            </Badge>
            <p className="text-sm">Price Targets: Low <span className="font-semibold text-foreground">{position.priceTargets.low}</span> | Avg <span className="font-semibold text-foreground">{position.priceTargets.average}</span> | High <span className="font-semibold text-foreground">{position.priceTargets.high}</span></p>
          </div>
          <div>
            <h4 className="font-semibold text-muted-foreground mb-1 flex items-center">
              {position.performanceVsBenchmark.performanceDifference.startsWith('-') ? <TrendingDown className="mr-2 h-5 w-5 text-red-400" /> : <TrendingUp className="mr-2 h-5 w-5 text-green-400" />}
              Performance
            </h4>
            <p className="text-sm">vs {position.performanceVsBenchmark.benchmarkName} ({position.performanceVsBenchmark.period}): <span className="font-semibold text-foreground">{position.performanceVsBenchmark.performanceDifference}</span></p>
            <p className="text-sm">Volatility: <span className="font-semibold text-foreground">{position.volatilityScore}</span></p>
          </div>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="news">
            <AccordionTrigger className="text-lg hover:no-underline">
                <div className="flex items-center text-primary text-glow-primary">
                    <Newspaper className="mr-2 h-5 w-5" /> Recent News ({position.recentNews.length})
                </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-3 pt-2">
              {position.recentNews.map((newsItem, index) => (
                <div key={index} className="p-3 bg-muted/50 rounded-md border border-border/30">
                  <h5 className="font-semibold text-foreground">{newsItem.headline}</h5>
                  <p className="text-xs text-muted-foreground mb-1">{newsItem.source} - {newsItem.date}</p>
                  <p className="text-sm text-foreground/80">{newsItem.summary}</p>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          {position.suggestedSimilarAssets && position.suggestedSimilarAssets.length > 0 && (
            <AccordionItem value="suggestions">
              <AccordionTrigger className="text-lg hover:no-underline">
                <div className="flex items-center text-primary text-glow-primary">
                    <Lightbulb className="mr-2 h-5 w-5" /> Suggested Similar Assets ({position.suggestedSimilarAssets.length})
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-3 pt-2">
                {position.suggestedSimilarAssets.map((suggestion, index) => (
                  <div key={index} className="p-3 bg-muted/50 rounded-md border border-border/30">
                    <h5 className="font-semibold text-foreground">{suggestion.ticker} - {suggestion.companyName}</h5>
                    <p className="text-sm text-foreground/80">{suggestion.reason}</p>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          )}

          <AccordionItem value="ai-summary">
            <AccordionTrigger className="text-lg hover:no-underline">
                <div className="flex items-center text-primary text-glow-primary">
                    <MessageSquareText className="mr-2 h-5 w-5" /> AI Summary & Outlook
                </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">AI Confidence Score:</span>
                <span className="text-sm font-semibold text-foreground">{position.aiConfidenceScore}%</span>
              </div>
              <Progress value={position.aiConfidenceScore} className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-gradient-1 [&>div]:via-gradient-2 [&>div]:to-gradient-3" />
              <p className="text-sm text-foreground/90 pt-2">{position.aiSummary}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
