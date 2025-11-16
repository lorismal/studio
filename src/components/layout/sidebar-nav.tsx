'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarMenuSub,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import { StartupCompassLogo } from '@/components/startup-compass-logo';
import { type Methodology } from '@/lib/data';
import { ArrowLeft, LayoutDashboard, Notebook, ChevronDown } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { useState } from 'react';

type SidebarNavProps = {
  selectedMethodology: Methodology | null;
  activeObjectiveId: string | null;
  onSelectObjective: (id: string | null) => void;
  onSelectMethodology: (methodology: Methodology | null) => void;
};

export function SidebarNav({ selectedMethodology, activeObjectiveId, onSelectObjective, onSelectMethodology }: SidebarNavProps) {
  const [openObjectives, setOpenObjectives] = useState<Set<string>>(() => new Set(selectedMethodology?.objectives.map(o => o.id)));

  if (!selectedMethodology) {
    return (
       <Sidebar>
        <SidebarHeader>
          <StartupCompassLogo />
        </SidebarHeader>
      </Sidebar>
    )
  }
  
  const activeParentObjective = selectedMethodology.objectives.find(obj => obj.id === activeObjectiveId || obj.subObjectives.some(sub => sub.id === activeObjectiveId));

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
          <Collapsible 
            asChild 
            key={objective.id}
            open={openObjectives.has(objective.id)}
            onOpenChange={(isOpen) => {
              setOpenObjectives(prev => {
                const newSet = new Set(prev);
                if (isOpen) newSet.add(objective.id);
                else newSet.delete(objective.id);
                return newSet;
              })
            }}
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  onClick={() => onSelectObjective(objective.id)}
                  isActive={activeParentObjective?.id === objective.id && activeObjectiveId === objective.id}
                  tooltip={objective.title}
                >
                  <div className="flex w-full justify-between items-center">
                    <span>{objective.title}</span>
                    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                  </div>
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent asChild>
                  <SidebarMenuSub>
                    {objective.subObjectives.map(sub => (
                       <SidebarMenuSubButton 
                          key={sub.id} 
                          onClick={() => onSelectObjective(sub.id)}
                          isActive={activeObjectiveId === sub.id}
                       >
                          <span>{sub.title}</span>
                          <Badge variant={sub.type === 'quantitative' ? 'default' : 'secondary'}>{sub.type.substring(0,1).toUpperCase()}</Badge>
                       </SidebarMenuSubButton>
                    ))}
                  </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
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
