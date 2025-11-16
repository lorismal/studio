'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { processStartupIdea } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Wand2 } from 'lucide-react';
import type { StartupData } from '@/lib/data';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Analyzing...' : 'Generate Insights'}
      {!pending && <Wand2 className="ml-2 h-4 w-4" />}
    </Button>
  );
}

type IdeaDefinitionFormProps = {
    onIdeaGenerated: (data: StartupData) => void;
}

export function IdeaDefinitionForm({ onIdeaGenerated }: IdeaDefinitionFormProps) {
  const initialState = { message: '', data: null, errors: null };
  const [state, dispatch] = useActionState(processStartupIdea, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message === 'success' && state.data) {
      onIdeaGenerated(state.data);
      toast({
        title: 'Analysis Complete!',
        description: 'Your startup idea has been refined and categorized.',
      });
    } else if (state.message && state.message !== 'success' && !state.errors) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: state.message,
      });
    }
  }, [state, toast, onIdeaGenerated]);

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Define Your Startup Idea</CardTitle>
          <CardDescription>
            Describe your initial concept, and our AI will help you refine it, identify target markets, and suggest key features.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={dispatch} className="space-y-4">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="ideaDescription">Your Startup Idea</Label>
              <Textarea
                id="ideaDescription"
                name="ideaDescription"
                placeholder="e.g., A subscription service for eco-friendly pet toys."
                rows={4}
              />
              {state.errors?.ideaDescription && (
                <p className="text-sm font-medium text-destructive">
                  {state.errors.ideaDescription[0]}
                </p>
              )}
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
