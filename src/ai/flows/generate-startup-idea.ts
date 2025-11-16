'use server';

/**
 * @fileOverview A startup idea generator AI agent.
 *
 * - generateStartupIdea - A function that generates a refined startup idea.
 * - GenerateStartupIdeaInput - The input type for the generateStartupIdea function.
 * - GenerateStartupIdeaOutput - The return type for the generateStartupIdea function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateStartupIdeaInputSchema = z.object({
  ideaDescription: z
    .string()
    .describe('A brief description of the startup idea.'),
});
export type GenerateStartupIdeaInput = z.infer<typeof GenerateStartupIdeaInputSchema>;

const GenerateStartupIdeaOutputSchema = z.object({
  refinedConcept: z.string().describe('A detailed and refined concept of the startup.'),
  targetMarkets: z.string().describe('Potential target markets for the startup.'),
  keyFeatures: z.string().describe('Key features of the startup.'),
});
export type GenerateStartupIdeaOutput = z.infer<typeof GenerateStartupIdeaOutputSchema>;

export async function generateStartupIdea(
  input: GenerateStartupIdeaInput
): Promise<GenerateStartupIdeaOutput> {
  return generateStartupIdeaFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStartupIdeaPrompt',
  input: {schema: GenerateStartupIdeaInputSchema},
  output: {schema: GenerateStartupIdeaOutputSchema},
  prompt: `You are a startup consultant specializing in refining startup ideas.

You will take a brief description of a startup idea and generate a more detailed and refined concept, including potential target markets and key features.

Description: {{{ideaDescription}}}

Refined Concept:
Target Markets:
Key Features: `,
});

const generateStartupIdeaFlow = ai.defineFlow(
  {
    name: 'generateStartupIdeaFlow',
    inputSchema: GenerateStartupIdeaInputSchema,
    outputSchema: GenerateStartupIdeaOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
