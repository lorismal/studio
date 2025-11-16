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
import { ArrowLeft, LayoutDashboard, Notebook } from 'lucide-react';

type SidebarNavProps = {
  selectedMethodology: Methodology | null;
  activeObjectiveId: string | null;
  onSelectObjective: (id: string | null) => void;
  onSelectMethodology: (methodology: Methodology | null) => void;
};

export function SidebarNav({ selectedMethodology, activeObjectiveId, onSelectObjective, onSelectMethodology }: SidebarNavProps) {
  if (!selectedMethodology) {
    // Before a methodology is selected, we can show a minimal sidebar
    // or the methodology list. Let's keep it minimal for now.
    return (
       <Sidebar>
        <SidebarHeader>
          <StartupCompassLogo />
        </SidebarHeader>
      </Sidebar>
    )
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <StartupCompassLogo />
      </SidebarHeader>
      <SidebarMenu className="flex-1">
        <SidebarMenuItem>
            <SidebarMenuButton
                onClick={() => onSelectMethodology(null)}
                variant="ghost"
                className="text-muted-foreground"
            >
                <ArrowLeft />
                <span>Change Methodology</span>
            </SidebarMenuButton>
        </SidebarMenuItem>
        
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={() => onSelectObjective('dashboard')}
            isActive={activeObjectiveId === 'dashboard'}
            tooltip="Dashboard"
          >
            <LayoutDashboard />
            <span>Dashboard</span>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={() => onSelectObjective(null)}
            isActive={activeObjectiveId === null}
            tooltip={selectedMethodology.name}
          >
            <selectedMethodology.icon />
            <span>{selectedMethodology.name}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>

        {selectedMethodology.objectives.map((objective) => (
          <SidebarMenuItem key={objective.id}>
            <SidebarMenuButton
              onClick={() => onSelectObjective(objective.id)}
              isActive={activeObjectiveId === objective.id}
              tooltip={objective.title}
            >
              <div className="w-4 h-4" /> 
              <span>{objective.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}

        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={() => onSelectObjective('notebook')}
            isActive={activeObjectiveId === 'notebook'}
            tooltip="Notebook"
          >
            <Notebook />
            <span>Notebook</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
      <SidebarFooter>
        {/* Placeholder for footer content, e.g., settings, profile */}
      </SidebarFooter>
    </Sidebar>
  );
}
