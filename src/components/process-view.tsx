'use client';

import { useState } from 'react';
import type { Methodology, Note, Objective } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { NoteEditor } from './note-editor';
import { Button } from './ui/button';
import { PlusCircle } from 'lucide-react';
import { NoteCard } from './note-card';

type ObjectiveCardProps = {
    objective: Objective;
    startupType: string;
    notes: Note[];
    selectedObjectives: Set<string>;
    onSelectObjective: (id: string, selected: boolean) => void;
    onAddNote: (note: Omit<Note, 'id' | 'createdAt'>) => void;
    onSetActiveObjective: (id: string) => void;
}

function ObjectiveCard({ objective, startupType, notes, selectedObjectives, onSelectObjective, onAddNote, onSetActiveObjective }: ObjectiveCardProps) {
  const [addingNoteTo, setAddingNoteTo] = useState<string | null>(null);

  const handleSaveNote = (title: string, content: string, tags: string[]) => {
    if (addingNoteTo) {
      onAddNote({ title, content, tags, attachedTo: addingNoteTo });
      setAddingNoteTo(null);
    }
  }

  const attachedNotes = notes.filter(note => note.attachedTo === objective.id);

  return (
    <div className="p-4 border rounded-lg" id={`objective-${objective.id}`}>
      <div className="flex items-start gap-4">
        <Checkbox
          id={objective.id}
          checked={selectedObjectives.has(objective.id)}
          onCheckedChange={(checked) => onSelectObjective(objective.id, !!checked)}
          className="mt-1"
        />
        <div className="flex-1 grid gap-1 cursor-pointer" onClick={() => onSetActiveObjective(objective.id)}>
          <Label htmlFor={objective.id} className="text-base font-medium cursor-pointer">
            {objective.title}
          </Label>
          <p className="text-muted-foreground">{objective.description}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setAddingNoteTo(objective.id)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Note
        </Button>
      </div>
      {addingNoteTo === objective.id && (
        <div className="mt-4">
          <NoteEditor onSave={handleSaveNote} onCancel={() => setAddingNoteTo(null)} startupType={startupType} />
        </div>
      )}
      {attachedNotes.length > 0 && (
        <div className="mt-4 space-y-2 pl-8">
          {attachedNotes.map(note => <NoteCard key={note.id} note={note} />)}
        </div>
      )}
    </div>
  )
}


type ProcessViewProps = {
  methodology: Methodology;
  startupType: string;
  onAddNote: (note: Omit<Note, 'id' | 'createdAt'>) => void;
  notes: Note[];
  activeObjectiveId: string | null;
  onSelectObjective: (id: string | null) => void;
};

export function ProcessView({ methodology, startupType, onAddNote, notes, activeObjectiveId, onSelectObjective: onSetActiveObjective }: ProcessViewProps) {
  const [selectedObjectives, setSelectedObjectives] = useState<Set<string>>(() => {
    const preselected = new Set<string>();
    methodology.objectives.forEach(obj => {
      if (obj.preselectedFor?.includes(startupType)) {
        preselected.add(obj.id);
      }
    });
    return preselected;
  });

  const handleSelectObjective = (objectiveId: string, isSelected: boolean) => {
    setSelectedObjectives(prev => {
      const newSet = new Set(prev);
      if (isSelected) {
        newSet.add(objectiveId);
      } else {
        newSet.delete(objectiveId);
      }
      return newSet;
    });
  };

  const activeObjective = methodology.objectives.find(o => o.id === activeObjectiveId);

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{activeObjective ? `Objective: ${activeObjective.title}` : `Process for ${methodology.name}`}</CardTitle>
          <CardDescription>{activeObjective ? activeObjective.description : 'Select the objectives applicable to your current stage. Some are pre-selected based on your startup type.'}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeObjective ? (
                 <ObjectiveCard 
                    key={activeObjective.id}
                    objective={activeObjective} 
                    startupType={startupType}
                    notes={notes}
                    selectedObjectives={selectedObjectives}
                    onSelectObjective={handleSelectObjective}
                    onAddNote={onAddNote}
                    onSetActiveObjective={() => onSetActiveObjective(activeObjective.id)}
                  />
            ) : (
                methodology.objectives.map(obj => (
                  <ObjectiveCard 
                    key={obj.id}
                    objective={obj} 
                    startupType={startupType}
                    notes={notes}
                    selectedObjectives={selectedObjectives}
                    onSelectObjective={handleSelectObjective}
                    onAddNote={onAddNote}
                    onSetActiveObjective={() => onSetActiveObjective(obj.id)}
                  />
                ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
