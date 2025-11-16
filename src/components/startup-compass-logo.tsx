import { Compass } from "lucide-react";

export function StartupCompassLogo() {
  return (
    <div className="flex items-center gap-2">
      <Compass className="h-6 w-6 text-primary" />
      <h1 className="font-headline text-xl font-semibold text-foreground">
        Startup Compass
      </h1>
    </div>
  );
}
