'use client';

import { useState } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { Header } from '@/components/layout/header';
import { IdeaDefinitionForm } from '@/components/idea-definition-form';
import { methodologies, type Methodology, type StartupData, type Note } from '@/lib/data';
import { WelcomeDashboard } from '@/components/welcome-dashboard';
import { ProcessView } from '@/components/process-view';
import { NotebookView } from '@/components/notebook-view';

export function DashboardContent() {
  const [startupData, setStartupData] = useState<StartupData | null>(null);
  const [activeMethodology, setActiveMethodology] = useState<Methodology['id']>('dashboard');
  const [notes, setNotes] = useState<Note[]>([]);

  const activeMethodologyDetails = methodologies.find(m => m.id === activeMethodology);
  const startupType = startupData?.industries?.[0] || 'SaaS'; // Default to SaaS for pre-selection

  const handleAddNote = (newNote: Omit<Note, 'id' | 'createdAt'>) => {
    const note: Note = {
      ...newNote,
      id: `note-${Date.now()}`,
      createdAt: new Date(),
    };
    setNotes(prev => [note, ...prev]);
  };
  
  const renderContent = () => {
    if (!startupData) {
      return <IdeaDefinitionForm onIdeaGenerated={setStartupData} />;
    }

    if (!activeMethodologyDetails) {
        // Handle case where methodology is not found, though it shouldn't happen with current setup
        return <div>Please select a methodology.</div>;
    }

    switch (activeMethodology) {
      case 'dashboard':
        return <WelcomeDashboard startupData={startupData} />;
      case 'notebook':
        return <NotebookView notes={notes} startupType={startupType} onAddNote={handleAddNote} />;
      default:
        return <ProcessView methodology={activeMethodologyDetails} startupType={startupType} onAddNote={handleAddNote} notes={notes} />;
    }
  };

  return (
    <SidebarProvider>
      <SidebarNav activeMethodology={activeMethodology} onSelectMethodology={setActiveMethodology} />
      <SidebarInset>
        <Header title={activeMethodologyDetails?.name || 'Dashboard'} />
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
