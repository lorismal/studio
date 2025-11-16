'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { StartupCompassLogo } from '@/components/startup-compass-logo';
import { methodologies, type Methodology } from '@/lib/data';

type SidebarNavProps = {
  activeMethodology: Methodology['id'];
  onSelectMethodology: (id: Methodology['id']) => void;
};

export function SidebarNav({ activeMethodology, onSelectMethodology }: SidebarNavProps) {
  return (
    <Sidebar>
      <SidebarHeader>
        <StartupCompassLogo />
      </SidebarHeader>
      <SidebarMenu className="flex-1">
        {methodologies.map((methodology) => (
          <SidebarMenuItem key={methodology.id}>
            <SidebarMenuButton
              onClick={() => onSelectMethodology(methodology.id)}
              isActive={activeMethodology === methodology.id}
              tooltip={methodology.name}
            >
              <methodology.icon />
              <span>{methodology.name}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      <SidebarFooter>
        {/* Placeholder for footer content, e.g., settings, profile */}
      </SidebarFooter>
    </Sidebar>
  );
}
