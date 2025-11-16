'use server';

/**
 * @fileOverview Generates qualitative and quantitative objectives for a startup based on a selected methodology.
 *
 * - generateObjectives - A function that generates objectives.
 * - GenerateObjectivesInput - The input type for the generateObjectives function.
 * - GenerateObjectivesOutput - The return type for the generateObjectives function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ObjectiveSchema = z.object({
  id: z.string().describe('A unique ID for the objective (e.g., "ls-1").'),
  title: z.string().describe('The title of the objective.'),
  description: z.string().describe('A detailed description of the objective.'),
  type: z.enum(['qualitative', 'quantitative']).describe('The type of objective.'),
});

const GenerateObjectivesInputSchema = z.object({
  startupData: z.object({
    ideaDescription: z.string(),
    refinedConcept: z.string(),
    targetMarkets: z.string(),
    keyFeatures: z.string(),
    industries: z.array(z.string()),
    businessModels: z.array(z.string()),
  }),
  methodology: z.object({
    id: z.string(),
    name: z.string(),
  }),
});
export type GenerateObjectivesInput = z.infer<typeof GenerateObjectivesInputSchema>;

const GenerateObjectivesOutputSchema = z.object({
  objectives: z.array(ObjectiveSchema),
});
export type GenerateObjectivesOutput = z.infer<typeof GenerateObjectivesOutputSchema>;

export async function generateObjectives(
  input: GenerateObjectivesInput
): Promise<GenerateObjectivesOutput> {
  return generateObjectivesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateObjectivesPrompt',
  input: {schema: GenerateObjectivesInputSchema},
  output: {schema: GenerateObjectivesOutputSchema},
  prompt: `You are a world-class startup mentor and business strategist. Your task is to generate a set of specific, actionable objectives for a startup based on their idea and a chosen strategic framework.

You need to create both qualitative (focused on understanding and quality) and quantitative (focused on measurable numbers) objectives.

**Startup Details:**
- **Idea:** {{{startupData.ideaDescription}}}
- **Refined Concept:** {{{startupData.refinedConcept}}}
- **Target Market:** {{{startupData.targetMarkets}}}
- **Key Features:** {{{startupData.keyFeatures}}}
- **Industry:** {{{startupData.industries}}}
- **Business Model:** {{{startupData.businessModels}}}

**Chosen Framework:**
- **Name:** {{methodology.name}} (ID: {{methodology.id}})

**Instructions:**
Generate 5-7 objectives tailored to this specific startup and framework.

{{#if (eq methodology.id "smart")}}
**IMPORTANT FOR SMART GOALS:** Do not create a single, large, vague goal. Instead, you must generate a series of smaller, sequential sub-goals. Each sub-goal must be a clear step forward that builds towards completing a larger strategic aim. The goals should be ordered chronologically to provide a clear path.
{{else}}
Ensure the objectives are logically sequenced if possible.
{{/if}}

For each objective, provide a unique ID, a clear title, a concise description, and specify whether it is 'qualitative' or 'quantitative'.

The output must be a JSON object with a single key "objectives", which is an array of objective objects.`,
});

const generateObjectivesFlow = ai.defineFlow(
  {
    name: 'generateObjectivesFlow',
    inputSchema: GenerateObjectivesInputSchema,
    outputSchema: GenerateObjectivesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
