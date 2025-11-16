import type { StartupData } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function WelcomeDashboard({ startupData }: { startupData: StartupData }) {
  return (
    <div className="p-4 md:p-6 grid gap-6">
        <h2 className="text-2xl font-bold tracking-tight">Your Startup: {startupData.ideaDescription}</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader>
                    <CardTitle>Refined Concept</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{startupData.refinedConcept}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Target Markets</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{startupData.targetMarkets}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Key Features</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{startupData.keyFeatures}</p>
                </CardContent>
            </Card>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>AI Categorization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h3 className="font-semibold mb-2">Industries</h3>
                    <div className="flex flex-wrap gap-2">
                        {startupData.industries.map(industry => <Badge key={industry} variant="secondary">{industry}</Badge>)}
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">Business Models</h3>
                    <div className="flex flex-wrap gap-2">
                        {startupData.businessModels.map(model => <Badge key={model} variant="secondary">{model}</Badge>)}
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
