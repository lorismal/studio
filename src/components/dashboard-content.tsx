'use client';

import { useState } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { Header } from '@/components/layout/header';
import { IdeaDefinitionForm } from '@/components/idea-definition-form';
import { methodologies, methodologyObjectives, type Methodology, type StartupData, type Note, type Objective } from '@/lib/data';
import { WelcomeDashboard } from '@/components/welcome-dashboard';
import { ProcessView } from '@/components/process-view';
import { NotebookView } from '@/components/notebook-view';
import { MethodologySelection } from '@/components/methodology-selection';
import { getAIObjectives } from '@/app/actions';

export function DashboardContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Generating objectives...');
  const [startupData, setStartupData] = useState<StartupData | null>(null);
  const [selectedMethodology, setSelectedMethodology] = useState<Methodology | null>(null);
  const [activeObjectiveId, setActiveObjectiveId] = useState<string | null>('dashboard');
  const [notes, setNotes] = useState<Note[]>([]);

  const startupType = startupData?.industries?.[0] || 'SaaS';

  const handleAddNote = (newNote: Omit<Note, 'id' | 'createdAt'>) => {
    const note: Note = {
      ...newNote,
      id: `note-${Date.now()}`,
      createdAt: new Date(),
    };
    setNotes(prev => [note, ...prev]);
  };
  
  const handleSelectMethodology = async (methodology: Omit<Methodology, 'objectives'>) => {
    if (!startupData) return;
    
    setIsLoading(true);
    const parentObjectives = methodologyObjectives[methodology.id];
    const generatedObjectives: Objective[] = [];

    for (const [index, parentObj] of parentObjectives.entries()) {
      setLoadingMessage(`Generating objectives for "${parentObj.title}"... (${index + 1}/${parentObjectives.length})`);
      const { success, subObjectives } = await getAIObjectives(startupData, parentObj);
      if (success) {
        generatedObjectives.push({ ...parentObj, subObjectives });
      } else {
        // Handle failure for a single objective - maybe add it with an empty sub-objective list
        generatedObjectives.push({ ...parentObj, subObjectives: [] });
      }
    }

    const methodologyWithAIObjectives: Methodology = {
      ...methodology,
      objectives: generatedObjectives,
    }
    setSelectedMethodology(methodologyWithAIObjectives);
    setActiveObjectiveId('dashboard');
    setIsLoading(false);
  };


  const handleSelectObjective = (objectiveId: string | null) => {
    setActiveObjectiveId(objectiveId);
  }
  
  const handleBackToMethodologySelection = () => {
    setSelectedMethodology(null);
    setActiveObjectiveId('dashboard');
  }

  const renderContent = () => {
    if (isLoading) {
      return <div className="flex-1 flex items-center justify-center p-4">{loadingMessage}</div>
    }

    if (!startupData) {
      return <IdeaDefinitionForm onIdeaGenerated={setStartupData} />;
    }

    if (!selectedMethodology) {
      return <MethodologySelection startupType={startupType} onSelectMethodology={handleSelectMethodology} />;
    }
    
    const activeObjective = selectedMethodology.objectives.find(o => o.id === activeObjectiveId);

    switch (activeObjectiveId) {
      case 'dashboard':
        return <WelcomeDashboard startupData={startupData} />;
      case 'notebook':
        return <NotebookView notes={notes} startupType={startupType} onAddNote={handleAddNote} />;
      default:
        // This will handle both a specific objective view and the full process view
        return <ProcessView methodology={selectedMethodology} startupType={startupType} onAddNote={handleAddNote} notes={notes} activeObjectiveId={activeObjectiveId} onSelectObjective={handleSelectObjective} />;
    }
  };

  const getHeaderTitle = () => {
    if (!selectedMethodology) return "Select a Methodology";
    if (activeObjectiveId === 'dashboard') return 'Dashboard';
    if (activeObjectiveId === 'notebook') return 'Notebook';
    if (activeObjectiveId === null && selectedMethodology) return selectedMethodology.name;
    const objective = selectedMethodology?.objectives.find(o => o.id === activeObjectiveId);
    return objective?.title || selectedMethodology?.name || "";
  }

  return (
    <SidebarProvider>
      <SidebarNav 
        selectedMethodology={selectedMethodology}
        activeObjectiveId={activeObjectiveId}
        onSelectObjective={handleSelectObjective}
        onSelectMethodology={handleBackToMethodologySelection}
      />
      <SidebarInset>
        <Header title={getHeaderTitle()} />
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
