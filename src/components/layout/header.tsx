import { SidebarTrigger } from "@/components/ui/sidebar";
import { StartupCompassLogo } from "@/components/startup-compass-logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header({ title }: { title: string }) {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
      <div className="flex items-center gap-2 md:hidden">
        <SidebarTrigger />
        <StartupCompassLogo />
      </div>
      <div className="w-full flex-1">
         <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
      </div>
      <Avatar>
        <AvatarImage src="https://picsum.photos/seed/user/40/40" data-ai-hint="person avatar" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    </header>
  );
}
