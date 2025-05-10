
'use server';
/**
 * @fileOverview A Genkit flow for the Matrix AI assistant.
 *
 * - matrixAiChat - A function that handles chat interactions for Matrix AI.
 * - MatrixAiChatInput - The input type for the matrixAiChat function.
 * - MatrixAiChatOutput - The return type for the matrixAiChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod'; // Changed from 'genkit/zod'

const MatrixAiChatInputSchema = z.object({
  query: z.string().describe('The user query.'),
  currentTab: z.string().describe('The current tab the user is viewing in the dashboard.'),
  chatHistory: z.array(z.object({
    role: z.enum(['user', 'model']),
    parts: z.array(z.object({text: z.string()})),
  })).optional().describe('The history of the conversation.'),
});
export type MatrixAiChatInput = z.infer<typeof MatrixAiChatInputSchema>;

const MatrixAiChatOutputSchema = z.object({
  response: z.string().describe('The AI assistant response.'),
});
export type MatrixAiChatOutput = z.infer<typeof MatrixAiChatOutputSchema>;

export async function matrixAiChat(input: MatrixAiChatInput): Promise<MatrixAiChatOutput> {
  return matrixAiFlow(input);
}

const matrixAiFlowPrompt = ai.definePrompt({
  name: 'matrixAiFlowPrompt',
  input: { schema: MatrixAiChatInputSchema },
  output: { schema: MatrixAiChatOutputSchema },
  prompt: `You are Matrix AI, an intelligent assistant embedded within the Sanctuary Matrix financial analytics dashboard.
The user is currently viewing the "{{currentTab}}" section of the dashboard.
Your role is to help them understand their financial data by answering their questions.
{{#if chatHistory}}
Conversation History:
{{#each chatHistory}}
  {{#if (eq role "user") }}User: {{parts.0.text}}{{/if}}
  {{#if (eq role "model") }}AI: {{parts.0.text}}{{/if}}
{{/each}}
{{/if}}

Current Tab Context: {{currentTab}}
User's Query: {{{query}}}

Important: You are an AI assistant and do not have access to the user's live, real-time financial data.
Your responses should be based on general financial knowledge, typical scenarios relevant to the '{{currentTab}}' section, and the information provided in the user's query.
Do not invent specific numbers or data. Instead, explain concepts, suggest what data points the user should look for on the dashboard, or how to interpret common metrics.

Guidelines for your response:
- Provide concise and clear answers.
- If the query is about specific data (e.g., "What was my AUM change?"), explain what factors generally contribute to AUM changes and where on the '{{currentTab}}' page they might find relevant information. For example: "AUM can change due to market movements, net inflows/outflows, and fee assessments. On the {{currentTab}} page, you'd typically find AUM figures, performance charts, and flow data that can help you analyze this."
- If the query is ambiguous or lacks necessary details (like a timeframe for a trend), politely ask for clarification. For example, if asked "How are my clients doing?", you might respond, "That's a broad question! Could you specify what aspect of client analytics you're interested in? For instance, are you looking at client AUM, retention, or segmentation? The {{currentTab}} page provides various metrics."
- When appropriate, structure your response with bullet points or short summaries.
- For now, you will provide text-based answers. If a query would best be answered with a chart or visual, state that a visual representation would be helpful and describe what kind of chart they might look for on the dashboard.
- Keep your tone professional and helpful.`,
});


const matrixAiFlow = ai.defineFlow(
  {
    name: 'matrixAiFlow',
    inputSchema: MatrixAiChatInputSchema,
    outputSchema: MatrixAiChatOutputSchema,
  },
  async (input) => {
    // Prepare history for the model if it exists
    const history = input.chatHistory?.map(item => ({
      role: item.role,
      parts: item.parts.map(part => ({text: part.text})),
    }));

    const { output } = await matrixAiFlowPrompt(input, {history});
    if (!output) {
      // Fallback or error handling if output is undefined
      return { response: "I'm sorry, I couldn't generate a response at this moment." };
    }
    return output;
  }
);

