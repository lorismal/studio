'use server';

import { categorizeStartupIdea } from '@/ai/flows/categorize-startup-idea';
import { generateStartupIdea } from '@/ai/flows/generate-startup-idea';
import { generateSubObjectives } from '@/ai/flows/generate-sub-objectives';
import type { StartupData, Objective } from '@/lib/data';
import { z } from 'zod';

const formSchema = z.object({
  ideaDescription: z.string().min(10, {
    message: "Please provide a more detailed description of your startup idea (at least 10 characters).",
  }),
});

export async function processStartupIdea(
  prevState: any,
  formData: FormData
): Promise<{ message: string; data: StartupData | null; errors: any }> {
  const validatedFields = formSchema.safeParse({
    ideaDescription: formData.get('ideaDescription'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Validation failed',
      data: null,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const ideaDescription = validatedFields.data.ideaDescription;

  try {
    const [refinedIdea, categorization] = await Promise.all([
      generateStartupIdea({ ideaDescription }),
      categorizeStartupIdea({ idea: ideaDescription }),
    ]);

    const startupData: StartupData = {
      ideaDescription,
      ...refinedIdea,
      ...categorization,
    };

    return { message: 'success', data: startupData, errors: null };
  } catch (error) {
    console.error('AI processing failed:', error);
    return {
      message: 'An error occurred while processing your idea. Please try again.',
      data: null,
      errors: null,
    };
  }
}


export async function getAIObjectives(startupData: StartupData, parentObjective: Pick<Objective, 'id' | 'title' | 'description'>) {
  try {
    const result = await generateSubObjectives({ startupData, parentObjective });
    return { success: true, subObjectives: result.subObjectives };
  } catch (error) {
    console.error('Failed to generate sub-objectives:', error);
    return { success: false, subObjectives: [] };
  }
}
