'use server';

/**
 * @fileOverview Generates qualitative and quantitative sub-objectives for a parent objective.
 *
 * - generateSubObjectives - A function that generates sub-objectives.
 * - GenerateSubObjectivesInput - The input type for the generateSubObjectives function.
 * - GenerateSubObjectivesOutput - The return type for the generateSubObjectives function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SubObjectiveSchema = z.object({
  id: z.string().describe('A unique ID for the sub-objective (e.g., "ls-build-1").'),
  title: z.string().describe('The title of the sub-objective.'),
  description: z.string().describe('A detailed description of the sub-objective.'),
  type: z.enum(['qualitative', 'quantitative']).describe('The type of objective.'),
});

const GenerateSubObjectivesInputSchema = z.object({
  startupData: z.object({
    ideaDescription: z.string(),
    refinedConcept: z.string(),
    targetMarkets: z.string(),
    keyFeatures: z.string(),
    industries: z.array(z.string()),
    businessModels: z.array(z.string()),
  }),
  parentObjective: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
  }),
});
export type GenerateSubObjectivesInput = z.infer<typeof GenerateSubObjectivesInputSchema>;

const GenerateSubObjectivesOutputSchema = z.object({
  subObjectives: z.array(SubObjectiveSchema),
});
export type GenerateSubObjectivesOutput = z.infer<typeof GenerateSubObjectivesOutputSchema>;

export async function generateSubObjectives(
  input: GenerateSubObjectivesInput
): Promise<GenerateSubObjectivesOutput> {
  return generateSubObjectivesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSubObjectivesPrompt',
  input: {schema: GenerateSubObjectivesInputSchema},
  output: {schema: GenerateSubObjectivesOutputSchema},
  prompt: `You are a world-class startup mentor and business strategist. Your task is to generate a set of specific, actionable SUB-OBJECTIVES for a given high-level (parent) objective, tailored to a specific startup idea.

You need to create 2-3 detailed sub-objectives. Each one must be a clear, actionable step towards achieving the parent objective. Create a mix of qualitative (focused on understanding and quality) and quantitative (focused on measurable numbers) sub-objectives.

**Startup Details:**
- **Idea:** {{{startupData.ideaDescription}}}
- **Refined Concept:** {{{startupData.refinedConcept}}}
- **Target Market:** {{{startupData.targetMarkets}}}
- **Key Features:** {{{startupData.keyFeatures}}}
- **Industry:** {{{startupData.industries}}}
- **Business Model:** {{{startupData.businessModels}}}

**Parent Objective to Break Down:**
- **Title:** {{parentObjective.title}}
- **Description:** {{parentObjective.description}}

**Instructions:**
Generate 2-3 sub-objectives for the parent objective above.
The sub-objectives must be ordered logically and chronologically if possible.
For each sub-objective, provide:
- A unique ID, prefixed with the parent objective's ID (e.g., if parent is "ls-build", sub-objective could be "ls-build-1").
- A clear, concise title.
- A detailed description of what needs to be done.
- The objective type ('qualitative' or 'quantitative').

The output must be a JSON object with a single key "subObjectives", which is an array of sub-objective objects.`,
});

const generateSubObjectivesFlow = ai.defineFlow(
  {
    name: 'generateSubObjectivesFlow',
    inputSchema: GenerateSubObjectivesInputSchema,
    outputSchema: GenerateSubObjectivesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
