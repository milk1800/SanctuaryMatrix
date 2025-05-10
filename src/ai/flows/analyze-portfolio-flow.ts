
'use server';
/**
 * @fileOverview A Genkit flow for analyzing client portfolios.
 *
 * - analyzePortfolioByAccountNumber - A function that takes an account number and returns an AI-generated analysis of the portfolio.
 * - AnalyzePortfolioInput - The input type for the analyzePortfolioByAccountNumber function.
 * - AnalyzePortfolioOutput - The return type for the analyzePortfolioByAccountNumber function.
 * - PortfolioPosition - The type for a single position within the portfolio analysis.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const AnalyzePortfolioInputSchema = z.object({
  accountNumber: z.string().describe('The client account number for which to analyze the portfolio.'),
});
export type AnalyzePortfolioInput = z.infer<typeof AnalyzePortfolioInputSchema>;

const PortfolioPositionSchema = z.object({
  ticker: z.string().describe("Stock ticker symbol (e.g., 'AAPL', 'MSFT')."),
  companyName: z.string().describe("Full company name (e.g., 'Apple Inc.', 'Microsoft Corporation')."),
  currentValue: z.string().describe("Current market value of the holding, formatted as a currency string (e.g., '$10,500.75')."),
  quantity: z.number().int().positive().describe("Number of shares/units held (e.g., 100)."),
  currentPrice: z.string().describe("Current price per share/unit, formatted as a currency string (e.g., '$150.25')."),
  recentNews: z.array(
    z.object({
      headline: z.string().describe("A concise news headline relevant to the asset. Should be illustrative and plausible."),
      source: z.string().describe("Illustrative source of the news (e.g., 'MarketWatch', 'Bloomberg Terminal', 'Reuters')."),
      summary: z.string().min(50).describe("A brief summary of the news item (at least 50 characters). Should be illustrative and plausible."),
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).describe("Illustrative date of the news in YYYY-MM-DD format (e.g., '2024-07-15').")
    })
  ).min(1).max(3).describe("One to three recent, illustrative news items relevant to the asset. These should be plausible financial news snippets."),
  analystSentiment: z.enum(['Buy', 'Sell', 'Hold', 'Strong Buy', 'Underperform', 'Neutral', 'Outperform']).describe("Overall analyst sentiment for the asset. Choose a common sentiment descriptor."),
  priceTargets: z.object({
    low: z.string().describe("Low-end analyst price target, formatted as a currency string (e.g., '$130.00')."),
    average: z.string().describe("Average analyst price target, formatted as a currency string (e.g., '$165.00')."),
    high: z.string().describe("High-end analyst price target, formatted as a currency string (e.g., '$190.00')."),
  }).describe("Illustrative analyst price targets (low, average, high)."),
  riskLevel: z.enum(['Low', 'Medium', 'High', 'Very High', 'Moderate']).describe("Assessed risk level of the asset. Choose a common risk descriptor."),
  volatilityScore: z.string().describe("A textual description of the asset's volatility (e.g., 'Moderate Volatility', 'Beta: 0.85', 'High Historical Volatility')."),
  performanceVsBenchmark: z.object({
    benchmarkName: z.string().describe("Name of the benchmark used for comparison (e.g., 'S&P 500', 'NASDAQ 100', 'Relevant Sector ETF')."),
    period: z.string().describe("Period of comparison (e.g., 'YTD', 'Last 12 Months', 'Since Inception')."),
    performanceDifference: z.string().describe("Performance difference against the benchmark, including direction (e.g., '+2.5% vs S&P 500', '-1.0% underperforming benchmark')."),
  }).describe("Illustrative performance compared to a relevant benchmark."),
  suggestedSimilarAssets: z.array(
    z.object({
      ticker: z.string().describe("Ticker symbol of the suggested similar asset."),
      companyName: z.string().describe("Company name of the suggested asset."),
      reason: z.string().min(30).describe("Brief reason for the suggestion, highlighting a potential advantage (e.g., 'Lower expense ratio with similar exposure', 'Stronger recent earnings growth in the same sector', 'Offers diversification with higher dividend yield'). At least 30 characters.")
    })
  ).min(0).max(2).describe("Zero to two suggested similar assets, each with a clear justification."),
  aiConfidenceScore: z.number().min(0).max(100).int().describe("AI's confidence in this specific position's outlook, as an integer percentage (0-100%)."),
  aiSummary: z.string().min(100).describe("A concise AI-generated summary (at least 100 characters) of the position’s outlook, key strengths, and potential weaknesses or risks. This should be an actionable insight.")
});
export type PortfolioPosition = z.infer<typeof PortfolioPositionSchema>;

const AnalyzePortfolioOutputSchema = z.object({
  accountNumber: z.string().describe("The account number that was analyzed."),
  portfolioSummary: z.string().min(150).describe("A brief AI-generated overview (at least 150 characters) of the entire portfolio's health, key characteristics, diversification, and overall risk assessment based on the analyzed positions."),
  positions: z.array(PortfolioPositionSchema)
    .min(3)
    .max(5)
    .describe("Detailed analysis for each position in the portfolio. Generate 3 to 5 illustrative positions for the given account number, as if you are fetching and analyzing live portfolio data. Each position must be distinct.")
});
export type AnalyzePortfolioOutput = z.infer<typeof AnalyzePortfolioOutputSchema>;


export async function analyzePortfolioByAccountNumber(input: AnalyzePortfolioInput): Promise<AnalyzePortfolioOutput> {
  return analyzePortfolioFlow(input);
}

const analyzePortfolioPrompt = ai.definePrompt({
  name: 'analyzePortfolioPrompt',
  input: { schema: AnalyzePortfolioInputSchema },
  output: { schema: AnalyzePortfolioOutputSchema },
  prompt: `You are Matrix AI, an expert financial analyst AI. You are tasked with providing a detailed portfolio analysis for a client based on their account number.
Since you cannot access live brokerage data, you will generate an illustrative portfolio analysis for the account number: {{{accountNumber}}}.

The analysis should include a portfolio summary and details for 3 to 5 distinct, plausible positions that might be found in a typical investment portfolio. For each position, provide the requested financial details, news, and AI-driven insights.

Output Format Instructions:
Strictly adhere to the JSON schema provided for the output. Ensure all string fields, especially summaries and reasons, are sufficiently detailed as per schema descriptions.
All currency values (currentValue, currentPrice, priceTargets) MUST be formatted as strings with a dollar sign and two decimal places (e.g., "$123.45").
Dates must be in "YYYY-MM-DD" format.
AI Confidence Score must be an integer between 0 and 100.
News items and suggested assets should be plausible and relevant to common stock types (e.g., tech, healthcare, consumer staples).
The portfolio summary should give an overall picture based on the illustrative positions you generate.

Generate the analysis for account number: {{{accountNumber}}}
`,
});

const analyzePortfolioFlow = ai.defineFlow(
  {
    name: 'analyzePortfolioFlow',
    inputSchema: AnalyzePortfolioInputSchema,
    outputSchema: AnalyzePortfolioOutputSchema,
  },
  async (input) => {
    const { output } = await analyzePortfolioPrompt(input);
    if (!output) {
      throw new Error("AI failed to generate portfolio analysis.");
    }
    // Validate that the output structure, especially nested arrays, is as expected.
    // For example, ensure 'positions' is an array and has the correct number of items.
    // Add more specific validation if needed.
    if (!output.positions || !Array.isArray(output.positions) || output.positions.length < 3 || output.positions.length > 5) {
        console.warn("AI generated an unexpected number of positions. Expected 3-5.", output.positions?.length);
        // Potentially, try to regenerate or return a structured error. For now, we'll let it pass if schema validation passes.
    }
    output.positions.forEach(p => {
        if(!p.recentNews || !Array.isArray(p.recentNews) || p.recentNews.length < 1 || p.recentNews.length > 3) {
            console.warn(`Position ${p.ticker} has an unexpected number of news items. Expected 1-3.`, p.recentNews?.length);
        }
    });


    return output;
  }
);
