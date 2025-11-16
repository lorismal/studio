'use server';

/**
 * @fileOverview Categorizes a startup idea into relevant industries and business models.
 *
 * - categorizeStartupIdea - A function that categorizes a startup idea.
 * - CategorizeStartupIdeaInput - The input type for the categorizeStartupIdea function.
 * - CategorizeStartupIdeaOutput - The return type for the categorizeStartupIdea function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CategorizeStartupIdeaInputSchema = z.object({
  idea: z.string().describe('The startup idea description.'),
});

export type CategorizeStartupIdeaInput = z.infer<typeof CategorizeStartupIdeaInputSchema>;

const CategorizeStartupIdeaOutputSchema = z.object({
  industries: z.array(z.string()).describe('Relevant industries for the startup idea.'),
  businessModels: z.array(z.string()).describe('Suitable business models for the startup idea.'),
});

export type CategorizeStartupIdeaOutput = z.infer<typeof CategorizeStartupIdeaOutputSchema>;

export async function categorizeStartupIdea(
  input: CategorizeStartupIdeaInput
): Promise<CategorizeStartupIdeaOutput> {
  return categorizeStartupIdeaFlow(input);
}

const prompt = ai.definePrompt({
  name: 'categorizeStartupIdeaPrompt',
  input: {schema: CategorizeStartupIdeaInputSchema},
  output: {schema: CategorizeStartupIdeaOutputSchema},
  prompt: `You are an expert startup advisor. Your task is to categorize a startup idea into relevant industries and business models.

  Consider the following startup idea:
  {{idea}}

  Provide a list of relevant industries and suitable business models.  The output must be a JSON object with "industries" and "businessModels" fields, each containing an array of strings.
  For example:
  {
    "industries": ["E-commerce", "Retail Tech"],
    "businessModels": ["Subscription", "Direct-to-consumer"]
  }`,
});

const categorizeStartupIdeaFlow = ai.defineFlow(
  {
    name: 'categorizeStartupIdeaFlow',
    inputSchema: CategorizeStartupIdeaInputSchema,
    outputSchema: CategorizeStartupIdeaOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
