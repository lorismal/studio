
import { methodologies, type Methodology } from '@/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from './ui/button';
import { Check } from 'lucide-react';

type MethodologySelectionProps = {
  startupType: string;
  onSelectMethodology: (methodology: Omit<Methodology, 'objectives'>) => void;
};

// Simple logic to recommend a methodology
const getRecommendedMethodology = (startupType: string) => {
  if (startupType.toLowerCase().includes('saas') || startupType.toLowerCase().includes('marketplace')) {
      return 'lean-startup';
  }
  if (startupType.toLowerCase().includes('fintech') || startupType.toLowerCase().includes('healthtech')) {
      return 'innovation-accounting';
  }
  return 'smart';
}

export function MethodologySelection({ startupType, onSelectMethodology }: MethodologySelectionProps) {
  const recommendedId = getRecommendedMethodology(startupType);

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-6">
        <div className="text-center">
            <h1 className="text-3xl font-bold">Choose Your Framework</h1>
            <p className="text-muted-foreground">Select a methodology to guide your startup process. Based on your startup type, we recommend the "{methodologies.find(m=>m.id === recommendedId)?.name}" framework.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {methodologies.map((methodology) => {
             const isRecommended = methodology.id === recommendedId;
            return (
              <Card key={methodology.id} className={`flex flex-col ${isRecommended ? 'border-primary ring-2 ring-primary' : ''}`}>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <methodology.icon className="w-8 h-8 text-primary" />
                        <CardTitle>{methodology.name}</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    {/* A real app might have a better description */}
                    A popular framework focusing on iterative development and validated learning.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => onSelectMethodology(methodology)} variant={isRecommended ? 'default' : 'outline'}>
                    {isRecommended && <Check className="mr-2" />}
                    Select {methodology.name}
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  );
}
